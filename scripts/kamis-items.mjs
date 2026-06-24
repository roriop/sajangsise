// 우리 50개 품목 ↔ KAMIS 매칭 정의 (collect/resolve 공용).
// source of truth(이름): src/lib/data/items.ts

// [code, KAMIS item_name 기본 후보]. 기본 매칭: item_name === name.
export const OUR_ITEMS = [
  ['veg-001', '배추'], ['veg-002', '무'], ['veg-003', '양파'], ['veg-004', '대파'],
  ['veg-005', '마늘'], ['veg-006', '생강'], ['veg-007', '당근'], ['veg-008', '감자'],
  ['veg-009', '청양고추'], ['veg-010', '풋고추'], ['veg-011', '호박'], ['veg-012', '오이'],
  ['veg-013', '상추'], ['veg-014', '깻잎'], ['veg-015', '시금치'],
  ['meat-001', '삼겹살'], ['meat-002', '목살'], ['meat-003', '소국거리'], ['meat-004', '소구이용'],
  ['meat-005', '닭(통닭)'], ['meat-006', '닭다리'], ['meat-007', '계란'], ['meat-008', '우유'],
  ['meat-009', '오리'],
  ['fish-001', '고등어'], ['fish-002', '갈치'], ['fish-003', '오징어'], ['fish-004', '명태'],
  ['fish-005', '조기'], ['fish-006', '새우'], ['fish-007', '멸치'], ['fish-008', '김'],
  ['grain-001', '쌀'], ['grain-002', '콩'], ['grain-003', '두부'], ['grain-004', '면'],
  ['grain-005', '떡'], ['grain-006', '콩나물'], ['grain-007', '숙주'],
  ['season-001', '고춧가루'], ['season-002', '된장'], ['season-003', '고추장'],
  ['season-004', '간장'], ['season-005', '식용유'],
  ['fruit-001', '사과'], ['fruit-002', '배'], ['fruit-003', '바나나'], ['fruit-004', '토마토'],
  ['fruit-005', '딸기'], ['fruit-006', '감귤'],
];

// KAMIS item_name/kind_name 이 우리와 다르거나, 여러 품종을 하나로 고정해야 하는 경우.
// { item, kind?, rank? } — 2026-06-23 dailyPriceByCategoryList 실응답으로 검증.
export const OVERRIDE = {
  'veg-002': { item: '무', kind: '봄' },
  'veg-004': { item: '파', kind: '대파' },
  'veg-005': { item: '깐마늘(국산)' },
  'veg-009': { item: '풋고추', kind: '청양고추' },
  'veg-010': { item: '풋고추', kind: '녹광' },
  'veg-011': { item: '호박', kind: '애호박' },
  'veg-012': { item: '오이', kind: '다다기' },
  'veg-013': { item: '상추', kind: '청' },
  'meat-001': { item: '돼지', kind: '삼겹살' },
  'meat-002': { item: '돼지', kind: '목심' },
  'meat-003': { item: '소', kind: '양지' },
  'meat-004': { item: '소', kind: '등심' },
  'meat-005': { item: '닭', kind: '육계' },
  'meat-006': { item: '닭', kind: '절단육' },
  'meat-007': { item: '계란', kind: '특란30구' },
  'fish-001': { item: '고등어', kind: '신선' },
  'fish-002': { item: '갈치', kind: '냉장' },
  'fish-003': { item: '물오징어', kind: '냉동' },
  'fish-004': { item: '명태', kind: '냉동(원양' },
  'fish-005': { item: '조기', kind: '참조기' },
  'fish-007': { item: '마른멸치' },
  'fish-008': { item: '김', kind: '마른김' },
  'grain-001': { item: '쌀', kind: '20kg' },
  'season-001': { item: '고춧가루', kind: '국산' },
  'fruit-001': { item: '사과', kind: '후지' },
  'fruit-002': { item: '배', kind: '신고' },
  'fruit-003': { item: '바나나', kind: '수입' },
  'fruit-006': { item: '감귤' },
};

// KAMIS 일별 도소매 미수록 (가공식품·일별없음·제철) — 매칭 실패가 정상.
export const KAMIS_ABSENT = new Set([
  'meat-009', 'grain-003', 'grain-004', 'grain-005', 'grain-006', 'grain-007',
  'season-002', 'season-003', 'season-004', 'season-005',
]);

export const KAMIS_CATEGORIES = ['100', '200', '300', '400', '500', '600'];

export function parsePrice(v) {
  if (v == null) return null;
  const n = Number(String(v).replace(/[, ]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function rankScore(rank) {
  const s = String(rank ?? '');
  if (s.includes('상')) return 0;
  if (s.includes('중')) return 1;
  return 2;
}
