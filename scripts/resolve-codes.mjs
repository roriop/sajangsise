#!/usr/bin/env node
// 우리 50개 품목 → KAMIS 코드(부류/품목/품종/등급) 해석 → data/kamis-codes.json
//
// dailyPriceByCategoryList(부류별) 응답에 item_code/kind_code/rank_code 가 들어있으므로,
// 품목명 매칭으로 코드를 뽑아낸다. 이 코드는 periodProductList(품목별 1년치)에 사용.
//
// 사용법: node scripts/resolve-codes.mjs [regday] [--force]   (default 어제 KST)
//   기존 data/kamis-codes.json 의 매핑은 보존하고 미해석 품목만 새로 해석한다.
//   (재해석하면 계절 품종이 바뀌어 시계열 정체성이 흔들림) --force 로 전체 재해석.

import { readFileSync, writeFileSync } from 'node:fs';
import { OUR_ITEMS, OVERRIDE, KAMIS_CATEGORIES, rankScore } from './kamis-items.mjs';

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
if (!KEY || !ID) { console.error('✗ KAMIS 자격증명 누락'); process.exit(1); }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isoKST = (off = 1) => new Date(Date.now() + 9 * 3600000 - off * 86400000).toISOString().slice(0, 10);
const cliArgs = process.argv.slice(2);
const force = cliArgs.includes('--force');
const regday = cliArgs.find((a) => !a.startsWith('--')) ?? isoKST(1);

// 기존 매핑 보존 (--force 시 무시)
const OUT_PATH = new URL('../data/kamis-codes.json', import.meta.url);
let existing = {};
if (!force) {
  try { existing = JSON.parse(readFileSync(OUT_PATH, 'utf8')); } catch {}
}

// item_name → [{cat, row}]
const index = new Map();
for (const cat of KAMIS_CATEGORIES) {
  const url =
    'https://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList' +
    `&p_product_cls_code=01&p_item_category_code=${cat}&p_regday=${regday}` +
    `&p_convert_kg_yn=N&p_country_code=&p_cert_key=${encodeURIComponent(KEY)}` +
    `&p_cert_id=${encodeURIComponent(ID)}&p_returntype=json`;
  try {
    const j = JSON.parse(await (await fetch(url, { signal: AbortSignal.timeout(30000) })).text());
    if (j?.data?.error_code !== '000') continue;
    for (const r of j.data.item ?? []) {
      const name = String(r.item_name ?? '').trim();
      if (!name) continue;
      const list = index.get(name) ?? [];
      list.push({ cat, row: r });
      index.set(name, list);
    }
  } catch (e) {
    console.warn(`  ! cat=${cat} 실패: ${e.message}`);
  }
  await sleep(250);
}

const codes = {};
const unmatched = [];
let kept = 0;
for (const [code, name] of OUR_ITEMS) {
  if (existing[code]) { codes[code] = existing[code]; kept += 1; continue; }
  const o = OVERRIDE[code] ?? {};
  const itemname = o.item ?? name;
  let cands = index.get(itemname);
  if (!cands?.length) { unmatched.push([code, name]); continue; }
  if (o.kind) {
    const k = cands.filter((c) => String(c.row.kind_name ?? '').includes(o.kind));
    if (k.length) cands = k;
  }
  if (o.rank) {
    const r = cands.filter((c) => String(c.row.rank ?? '').includes(o.rank));
    if (r.length) cands = r;
  }
  cands = [...cands].sort((a, b) => rankScore(a.row.rank) - rankScore(b.row.rank));
  const { cat, row } = cands[0];
  codes[code] = {
    cat,
    item: String(row.item_code),
    kind: String(row.kind_code),
    rank: String(row.rank_code),
    kamis: `${row.item_name} · ${row.kind_name} · ${row.rank}`,
    unit: row.unit,
  };
}

writeFileSync(OUT_PATH, JSON.stringify(codes, null, 2) + '\n');
console.log(
  `✓ ${Object.keys(codes).length}/${OUR_ITEMS.length} 품목 코드 해석(기존 유지 ${kept}) → data/kamis-codes.json`,
);
for (const [code, c] of Object.entries(codes)) {
  const mark = existing[code] ? '=' : '+';
  console.log(`  ${mark} ${code.padEnd(11)} ${c.cat}/${c.item}/${c.kind}/${c.rank}  ${c.kamis}  [${c.unit}]`);
}
if (unmatched.length) {
  console.log(`\n미해석(${unmatched.length}) — KAMIS 일별 미수록 또는 제철:`);
  console.log('  ' + unmatched.map(([c, n]) => `${n}(${c})`).join(', '));
}
