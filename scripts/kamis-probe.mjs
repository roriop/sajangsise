#!/usr/bin/env node
// KAMIS Open API 프로브 — 실제 응답 구조 확인용 (1회성).
//
// 사용법 (프로젝트 루트에서):
//   node scripts/kamis-probe.mjs              # 어제 날짜, 채소류(200), 소매
//   node scripts/kamis-probe.mjs 2026-06-23 200 01
//
// 인자: [regday] [category] [product_cls_code]
//   category: 100 식량작물 200 채소류 300 특용작물 400 과일류 500 축산물 600 수산물
//   product_cls_code: 01 소매 / 02 도매
//
// .env 의 KAMIS_API_KEY / KAMIS_API_ID 를 자동으로 읽는다 (커밋되지 않는 파일).

import { readFileSync } from 'node:fs';

function loadEnv() {
  try {
    const raw = readFileSync(new URL('../.env', import.meta.url), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
    }
  } catch {
    /* .env 없으면 실제 환경변수 사용 */
  }
}
loadEnv();

const [regday = isoYesterday(), category = '200', cls = '01'] = process.argv.slice(2);
const KEY = process.env.KAMIS_API_KEY;
const ID = process.env.KAMIS_API_ID;

if (!KEY || !ID) {
  console.error('✗ KAMIS_API_KEY / KAMIS_API_ID 가 .env 또는 환경변수에 없습니다.');
  process.exit(1);
}

function isoYesterday() {
  const d = new Date(Date.now() - 86400000);
  return d.toISOString().slice(0, 10);
}

const url =
  'https://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList' +
  `&p_product_cls_code=${cls}` +
  `&p_item_category_code=${category}` +
  `&p_regday=${regday}` +
  '&p_convert_kg_yn=N' +
  '&p_country_code=' +
  `&p_cert_key=${encodeURIComponent(KEY)}` +
  `&p_cert_id=${encodeURIComponent(ID)}` +
  '&p_returntype=json';

console.log(`→ regday=${regday} category=${category} cls=${cls === '01' ? '소매' : '도매'}`);

const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
const text = await res.text();

let json;
try {
  json = JSON.parse(text);
} catch {
  console.log('✗ JSON 파싱 실패. 원문 앞부분:\n', text.slice(0, 1000));
  process.exit(1);
}

// KAMIS 응답: { data: { error_code, item: [...] } } 또는 변형. 구조를 그대로 덤프.
console.log('\n=== 원문 구조 ===');
console.log(JSON.stringify(json, null, 2).slice(0, 2500));

const items = json?.data?.item ?? json?.price ?? [];
if (Array.isArray(items) && items.length) {
  console.log(`\n=== ${items.length}개 행 요약 (itemname / kindname / rank / price) ===`);
  for (const r of items.slice(0, 40)) {
    console.log(
      [r.itemname, r.kindname, r.rank ?? r.productrankname, r.price ?? r.dpr1]
        .map((x) => String(x ?? '').padEnd(12))
        .join(' | '),
    );
  }
}
