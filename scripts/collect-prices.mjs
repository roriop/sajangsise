#!/usr/bin/env node
// KAMIS 일별 품목별 도·소매 가격 수집기 → data/prices.jsonl append.
//
// periodProductList(#16/#17 (신)일별 품목별 도/소매, 최대 1년) 사용.
// 품목별 호출이라 단위가 일관되고(도매·소매 같은 단위), 1년치를 한 번에 받는다.
// 코드는 data/kamis-codes.json (scripts/resolve-codes.mjs 로 생성).
//
// 사용법 (프로젝트 루트):
//   node scripts/collect-prices.mjs                  # 최근 10일치(공백 메움)
//   node scripts/collect-prices.mjs --backfill 365   # 과거 1년 일괄(1회성)
//   node scripts/collect-prices.mjs --start 2026-01-01 --end 2026-06-23
//
// 같은 (date, code) 행이 있으면 건너뛴다(멱등). .env 자동 로드.

import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { parsePrice } from './kamis-items.mjs';

const PRICES = new URL('../data/prices.jsonl', import.meta.url);
const CODES = new URL('../data/kamis-codes.json', import.meta.url);
const RATE_MS = 250; // 초당 4회 (<5회 정책)

function loadEnv() {
  try {
    const raw = readFileSync(new URL('../.env', import.meta.url), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
    }
  } catch {}
}
loadEnv();
const KEY = process.env.KAMIS_API_KEY, ID = process.env.KAMIS_API_ID;
if (!KEY || !ID) { console.error('✗ KAMIS_API_KEY / KAMIS_API_ID 누락'); process.exit(1); }
if (!existsSync(CODES)) {
  console.error('✗ data/kamis-codes.json 없음 — 먼저 `node scripts/resolve-codes.mjs` 실행');
  process.exit(1);
}
const codes = JSON.parse(readFileSync(CODES, 'utf8'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isoKST = (off = 0) => new Date(Date.now() + 9 * 3600000 - off * 86400000).toISOString().slice(0, 10);

// 인자 → [start, end]
const args = process.argv.slice(2);
const arg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
let start, end = isoKST(1); // 어제(KST)까지
if (args.includes('--backfill')) start = isoKST(Number(arg('--backfill') ?? 365));
else if (arg('--start')) { start = arg('--start'); end = arg('--end') ?? end; }
else start = isoKST(10); // 기본: 최근 10일(공백 메움)

// periodProductList 1회 → Map<isoDate, price>
async function fetchSeries(cls, c) {
  const url =
    'https://www.kamis.or.kr/service/price/xml.do?action=periodProductList' +
    `&p_productclscode=${cls}&p_startday=${start}&p_endday=${end}` +
    `&p_itemcategorycode=${c.cat}&p_itemcode=${c.item}&p_kindcode=${c.kind}` +
    `&p_productrankcode=${c.rank}&p_countrycode=&p_convert_kg_yn=N` +
    `&p_cert_key=${encodeURIComponent(KEY)}&p_cert_id=${encodeURIComponent(ID)}&p_returntype=json`;
  const out = new Map();
  let json;
  try {
    json = JSON.parse(await (await fetch(url, { signal: AbortSignal.timeout(30000) })).text());
  } catch (e) {
    console.warn(`  ! cls=${cls} ${c.cat}/${c.item} 실패: ${e.message}`);
    return out;
  }
  if (json?.data?.error_code !== '000') return out;
  const rows = json.data.item ?? [];
  for (const r of Array.isArray(rows) ? rows : [rows]) {
    if (r.countyname && !String(r.countyname).includes('평균')) continue; // 전국평균만
    const price = parsePrice(r.price);
    const md = String(r.regday ?? '').replace('/', '-'); // MM-DD
    const yyyy = String(r.yyyy ?? '').trim();
    if (price == null || !yyyy || !/^\d\d-\d\d$/.test(md)) continue;
    out.set(`${yyyy}-${md}`, price);
  }
  return out;
}

function loadExistingKeys() {
  const keys = new Set();
  if (!existsSync(PRICES)) return keys;
  for (const line of readFileSync(PRICES, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t) continue;
    try { const r = JSON.parse(t); if (r.date && r.code) keys.add(`${r.date} ${r.code}`); } catch {}
  }
  return keys;
}

// ── main ──
console.log(`수집 범위: ${start} ~ ${end} · ${Object.keys(codes).length}개 품목`);
const existing = loadExistingKeys();
let nReq = 0, nRows = 0;

function writeRows(code, datePrice) {
  const rows = [];
  for (const date of [...datePrice.keys()].sort()) {
    const key = `${date} ${code}`;
    if (existing.has(key)) continue;
    rows.push(JSON.stringify({ date, code, retail: datePrice.get(date) }));
    existing.add(key);
  }
  if (rows.length) appendFileSync(PRICES, rows.join('\n') + '\n');
  nRows += rows.length;
  return rows.length;
}

// 1차: periodProductList(소매)로 1년치 — 채소·수산·과일·곡물(축평원 외).
// 도매·소매는 단위 체계가 달라 소매(cls=01)만 수집(소매 단독 결정).
const missing = []; // periodProductList 무응답(축산물 등) → 부류별 폴백
for (const [code, c] of Object.entries(codes)) {
  const retail = await fetchSeries('01', c); await sleep(RATE_MS);
  nReq += 1;
  if (retail.size === 0) { missing.push([code, c]); console.log(`  ${code.padEnd(11)} (period 무응답 → 폴백)`); continue; }
  console.log(`  ${code.padEnd(11)} +${writeRows(code, retail)}일`);
}

// 2차 폴백: 축산물(축평원)은 periodProductList가 001 → dailyPriceByCategoryList 의
// dpr1~6(당일/1일·1주·2주·1개월·1년 전)로 시드. 이후 매일 cron이 dpr1 누적.
if (missing.length) {
  const dOff = (iso, n) => { const d = new Date(iso); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
  const dMon = (iso) => { const d = new Date(iso); d.setMonth(d.getMonth() - 1); return d.toISOString().slice(0, 10); };
  const dYr = (iso) => { const d = new Date(iso); d.setFullYear(d.getFullYear() - 1); return d.toISOString().slice(0, 10); };
  const dprDate = { dpr1: (e) => e, dpr2: (e) => dOff(e, 1), dpr3: (e) => dOff(e, 7), dpr4: (e) => dOff(e, 14), dpr5: dMon, dpr6: dYr };
  const cats = [...new Set(missing.map(([, c]) => c.cat))];
  const byCat = new Map(); // cat → rows
  for (const cat of cats) {
    const url =
      'https://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList' +
      `&p_product_cls_code=01&p_item_category_code=${cat}&p_regday=${end}` +
      `&p_convert_kg_yn=N&p_country_code=&p_cert_key=${encodeURIComponent(KEY)}` +
      `&p_cert_id=${encodeURIComponent(ID)}&p_returntype=json`;
    nReq += 1;
    try {
      const j = JSON.parse(await (await fetch(url, { signal: AbortSignal.timeout(30000) })).text());
      byCat.set(cat, j?.data?.error_code === '000' ? (j.data.item ?? []) : []);
    } catch (e) { console.warn(`  ! 폴백 cat=${cat} 실패: ${e.message}`); byCat.set(cat, []); }
    await sleep(RATE_MS);
  }
  for (const [code, c] of missing) {
    const row = (byCat.get(c.cat) ?? []).find(
      (r) => String(r.item_code) === c.item && String(r.kind_code) === c.kind && String(r.rank_code) === c.rank,
    );
    if (!row) { console.log(`  ${code.padEnd(11)} 폴백 매칭 실패`); continue; }
    const dp = new Map();
    for (const [k, fn] of Object.entries(dprDate)) {
      const price = parsePrice(row[k]);
      if (price != null) dp.set(fn(end), price);
    }
    console.log(`  ${code.padEnd(11)} +${writeRows(code, dp)}일 (폴백 시드)`);
  }
}
console.log(`\n✓ ${nReq}회 호출 → ${nRows}개 행 기록 → data/prices.jsonl`);
