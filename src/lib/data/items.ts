export type Category = 'veg' | 'meat' | 'fish' | 'grain' | 'season' | 'fruit';

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'veg', label: '채소' },
  { value: 'meat', label: '축산' },
  { value: 'fish', label: '수산' },
  { value: 'grain', label: '곡물·가공' },
  { value: 'season', label: '조미료' },
  { value: 'fruit', label: '과일' },
];

export const CATEGORY_LABEL: Record<Category, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label]),
) as Record<Category, string>;

export type Item = {
  code: string;
  name: string;
  category: Category;
  unit: string;
  wholesaleBase: number;
  retailBase: number;
  /** 가격이 가장 높은 월 (1-12). 시즌성 코사인의 최댓값 위치. */
  peakMonth: number;
  /** 시즌성 진폭 (0-1). base 가격 기준 ±비율. */
  amplitude: number;
  /** 일별 노이즈 (0-0.2). */
  noise: number;
};

export type PricePoint = {
  date: string;
  wholesale: number;
  retail: number;
};

export type ItemPriceSeries = {
  code: string;
  series: PricePoint[];
};

export const ITEMS: Item[] = [
  // 채소 15
  { code: 'veg-001', name: '배추',     category: 'veg', unit: '1포기',       wholesaleBase: 2000,  retailBase: 4000,  peakMonth: 11, amplitude: 0.45, noise: 0.06 },
  { code: 'veg-002', name: '무',       category: 'veg', unit: '1개',         wholesaleBase: 1200,  retailBase: 2200,  peakMonth: 7,  amplitude: 0.30, noise: 0.06 },
  { code: 'veg-003', name: '양파',     category: 'veg', unit: '1kg',         wholesaleBase: 1500,  retailBase: 2500,  peakMonth: 12, amplitude: 0.40, noise: 0.07 },
  { code: 'veg-004', name: '대파',     category: 'veg', unit: '1kg',         wholesaleBase: 2500,  retailBase: 4500,  peakMonth: 7,  amplitude: 0.35, noise: 0.09 },
  { code: 'veg-005', name: '마늘',     category: 'veg', unit: '1kg',         wholesaleBase: 6500,  retailBase: 9500,  peakMonth: 12, amplitude: 0.20, noise: 0.05 },
  { code: 'veg-006', name: '생강',     category: 'veg', unit: '1kg',         wholesaleBase: 7000,  retailBase: 10500, peakMonth: 4,  amplitude: 0.18, noise: 0.06 },
  { code: 'veg-007', name: '당근',     category: 'veg', unit: '1kg',         wholesaleBase: 2000,  retailBase: 3500,  peakMonth: 6,  amplitude: 0.22, noise: 0.06 },
  { code: 'veg-008', name: '감자',     category: 'veg', unit: '1kg',         wholesaleBase: 2200,  retailBase: 3800,  peakMonth: 5,  amplitude: 0.25, noise: 0.06 },
  { code: 'veg-009', name: '청양고추', category: 'veg', unit: '1kg',         wholesaleBase: 8000,  retailBase: 12000, peakMonth: 2,  amplitude: 0.45, noise: 0.10 },
  { code: 'veg-010', name: '풋고추',   category: 'veg', unit: '1kg',         wholesaleBase: 5000,  retailBase: 8000,  peakMonth: 2,  amplitude: 0.40, noise: 0.09 },
  { code: 'veg-011', name: '호박',     category: 'veg', unit: '1개',         wholesaleBase: 1500,  retailBase: 2500,  peakMonth: 3,  amplitude: 0.30, noise: 0.08 },
  { code: 'veg-012', name: '오이',     category: 'veg', unit: '1개',         wholesaleBase: 700,   retailBase: 1200,  peakMonth: 1,  amplitude: 0.35, noise: 0.08 },
  { code: 'veg-013', name: '상추',     category: 'veg', unit: '1kg',         wholesaleBase: 5000,  retailBase: 9000,  peakMonth: 1,  amplitude: 0.45, noise: 0.10 },
  { code: 'veg-014', name: '깻잎',     category: 'veg', unit: '1팩(200g)',   wholesaleBase: 1500,  retailBase: 2500,  peakMonth: 12, amplitude: 0.30, noise: 0.07 },
  { code: 'veg-015', name: '시금치',   category: 'veg', unit: '1kg',         wholesaleBase: 3500,  retailBase: 6000,  peakMonth: 8,  amplitude: 0.40, noise: 0.09 },
  // 채소 확장 (2026-07 KAMIS 수록 전체, retailBase = 실측 소매가)
  { code: 'veg-016', name: '양배추',     category: 'veg', unit: '1포기',      wholesaleBase: 1900,  retailBase: 3000,  peakMonth: 8,  amplitude: 0.30, noise: 0.07 },
  { code: 'veg-017', name: '알배기배추', category: 'veg', unit: '1포기',      wholesaleBase: 1500,  retailBase: 2300,  peakMonth: 8,  amplitude: 0.30, noise: 0.07 },
  { code: 'veg-018', name: '얼갈이배추', category: 'veg', unit: '1kg',        wholesaleBase: 1300,  retailBase: 2100,  peakMonth: 8,  amplitude: 0.30, noise: 0.08 },
  { code: 'veg-019', name: '열무',       category: 'veg', unit: '1kg',        wholesaleBase: 1500,  retailBase: 2300,  peakMonth: 7,  amplitude: 0.30, noise: 0.08 },
  { code: 'veg-020', name: '붉은고추',   category: 'veg', unit: '100g',       wholesaleBase: 1400,  retailBase: 2100,  peakMonth: 2,  amplitude: 0.35, noise: 0.09 },
  { code: 'veg-021', name: '미나리',     category: 'veg', unit: '100g',       wholesaleBase: 780,   retailBase: 1200,  peakMonth: 12, amplitude: 0.25, noise: 0.07 },
  { code: 'veg-022', name: '피망',       category: 'veg', unit: '100g',       wholesaleBase: 850,   retailBase: 1300,  peakMonth: 1,  amplitude: 0.25, noise: 0.07 },
  { code: 'veg-023', name: '파프리카',   category: 'veg', unit: '200g',       wholesaleBase: 780,   retailBase: 1200,  peakMonth: 1,  amplitude: 0.25, noise: 0.07 },
  { code: 'veg-024', name: '브로콜리',   category: 'veg', unit: '1개',        wholesaleBase: 1200,  retailBase: 1800,  peakMonth: 8,  amplitude: 0.25, noise: 0.07 },
  { code: 'veg-025', name: '고구마',     category: 'veg', unit: '1kg',        wholesaleBase: 3300,  retailBase: 5100,  peakMonth: 7,  amplitude: 0.20, noise: 0.05 },
  { code: 'veg-026', name: '느타리버섯', category: 'veg', unit: '100g',       wholesaleBase: 650,   retailBase: 1000,  peakMonth: 12, amplitude: 0.10, noise: 0.05 },
  { code: 'veg-027', name: '팽이버섯',   category: 'veg', unit: '150g',       wholesaleBase: 330,   retailBase: 500,   peakMonth: 12, amplitude: 0.08, noise: 0.04 },
  { code: 'veg-028', name: '새송이버섯', category: 'veg', unit: '100g',       wholesaleBase: 300,   retailBase: 450,   peakMonth: 12, amplitude: 0.08, noise: 0.04 },

  // 축산 9
  { code: 'meat-001', name: '삼겹살',   category: 'meat', unit: '1kg',        wholesaleBase: 18000, retailBase: 27000, peakMonth: 6,  amplitude: 0.15, noise: 0.04 },
  { code: 'meat-002', name: '목살',     category: 'meat', unit: '1kg',        wholesaleBase: 14000, retailBase: 22000, peakMonth: 6,  amplitude: 0.12, noise: 0.04 },
  { code: 'meat-003', name: '소국거리', category: 'meat', unit: '1kg',        wholesaleBase: 18000, retailBase: 28000, peakMonth: 10, amplitude: 0.08, noise: 0.03 },
  { code: 'meat-004', name: '소구이용', category: 'meat', unit: '1kg',        wholesaleBase: 50000, retailBase: 80000, peakMonth: 10, amplitude: 0.10, noise: 0.03 },
  { code: 'meat-005', name: '닭(통닭)', category: 'meat', unit: '1마리',      wholesaleBase: 4000,  retailBase: 7000,  peakMonth: 7,  amplitude: 0.20, noise: 0.05 },
  { code: 'meat-006', name: '닭다리',   category: 'meat', unit: '1kg',        wholesaleBase: 6000,  retailBase: 9000,  peakMonth: 7,  amplitude: 0.15, noise: 0.05 },
  { code: 'meat-007', name: '계란',     category: 'meat', unit: '30개',       wholesaleBase: 5500,  retailBase: 8000,  peakMonth: 11, amplitude: 0.12, noise: 0.04 },
  { code: 'meat-008', name: '우유',     category: 'meat', unit: '1L',         wholesaleBase: 1800,  retailBase: 2900,  peakMonth: 1,  amplitude: 0.03, noise: 0.02 },
  { code: 'meat-009', name: '오리',     category: 'meat', unit: '1kg',        wholesaleBase: 10000, retailBase: 16000, peakMonth: 7,  amplitude: 0.15, noise: 0.04 },
  // 축산 확장
  { code: 'meat-010', name: '수입삼겹살', category: 'meat', unit: '100g',     wholesaleBase: 1000,  retailBase: 1550,  peakMonth: 6,  amplitude: 0.10, noise: 0.04 },
  { code: 'meat-011', name: '수입소갈비', category: 'meat', unit: '100g',     wholesaleBase: 2900,  retailBase: 4500,  peakMonth: 10, amplitude: 0.08, noise: 0.03 },

  // 수산 8
  { code: 'fish-001', name: '고등어',   category: 'fish', unit: '1kg',        wholesaleBase: 7000,  retailBase: 12000, peakMonth: 5,  amplitude: 0.20, noise: 0.06 },
  { code: 'fish-002', name: '갈치',     category: 'fish', unit: '1kg',        wholesaleBase: 18000, retailBase: 28000, peakMonth: 4,  amplitude: 0.25, noise: 0.07 },
  { code: 'fish-003', name: '오징어',   category: 'fish', unit: '1kg',        wholesaleBase: 12000, retailBase: 20000, peakMonth: 3,  amplitude: 0.30, noise: 0.08 },
  { code: 'fish-004', name: '명태',     category: 'fish', unit: '1kg',        wholesaleBase: 6000,  retailBase: 10000, peakMonth: 7,  amplitude: 0.18, noise: 0.06 },
  { code: 'fish-005', name: '조기',     category: 'fish', unit: '1kg',        wholesaleBase: 15000, retailBase: 25000, peakMonth: 7,  amplitude: 0.20, noise: 0.07 },
  { code: 'fish-006', name: '새우',     category: 'fish', unit: '1kg',        wholesaleBase: 20000, retailBase: 35000, peakMonth: 8,  amplitude: 0.18, noise: 0.07 },
  { code: 'fish-007', name: '멸치',     category: 'fish', unit: '1kg',        wholesaleBase: 25000, retailBase: 40000, peakMonth: 12, amplitude: 0.10, noise: 0.04 },
  { code: 'fish-008', name: '김',       category: 'fish', unit: '1속(100장)', wholesaleBase: 8000,  retailBase: 13000, peakMonth: 9,  amplitude: 0.15, noise: 0.05 },
  // 수산 확장
  { code: 'fish-009', name: '삼치',       category: 'fish', unit: '1마리',    wholesaleBase: 7500,  retailBase: 11500, peakMonth: 11, amplitude: 0.20, noise: 0.06 },
  { code: 'fish-010', name: '꽁치',       category: 'fish', unit: '5마리',    wholesaleBase: 4600,  retailBase: 7000,  peakMonth: 10, amplitude: 0.15, noise: 0.05 },
  { code: 'fish-011', name: '꽃게',       category: 'fish', unit: '1kg',      wholesaleBase: 10000, retailBase: 16000, peakMonth: 5,  amplitude: 0.30, noise: 0.08 },
  { code: 'fish-012', name: '낙지',       category: 'fish', unit: '100g',     wholesaleBase: 1400,  retailBase: 2200,  peakMonth: 10, amplitude: 0.20, noise: 0.06 },
  { code: 'fish-013', name: '전복',       category: 'fish', unit: '5마리',    wholesaleBase: 6700,  retailBase: 10300, peakMonth: 1,  amplitude: 0.15, noise: 0.05 },
  { code: 'fish-014', name: '바지락',     category: 'fish', unit: '1kg',      wholesaleBase: 6400,  retailBase: 9900,  peakMonth: 3,  amplitude: 0.15, noise: 0.05 },
  { code: 'fish-015', name: '홍합',       category: 'fish', unit: '100g',     wholesaleBase: 1900,  retailBase: 2900,  peakMonth: 1,  amplitude: 0.15, noise: 0.05 },
  { code: 'fish-016', name: '꼬막',       category: 'fish', unit: '1kg',      wholesaleBase: 5100,  retailBase: 7900,  peakMonth: 1,  amplitude: 0.20, noise: 0.06 },
  { code: 'fish-017', name: '마른오징어', category: 'fish', unit: '10마리',   wholesaleBase: 49000, retailBase: 75000, peakMonth: 12, amplitude: 0.08, noise: 0.03 },
  { code: 'fish-018', name: '마른미역',   category: 'fish', unit: '100g',     wholesaleBase: 1900,  retailBase: 2900,  peakMonth: 2,  amplitude: 0.08, noise: 0.03 },
  { code: 'fish-019', name: '건다시마',   category: 'fish', unit: '100g',     wholesaleBase: 1950,  retailBase: 3000,  peakMonth: 2,  amplitude: 0.08, noise: 0.03 },
  { code: 'fish-020', name: '고등어필렛', category: 'fish', unit: '1kg',      wholesaleBase: 11000, retailBase: 17000, peakMonth: 5,  amplitude: 0.12, noise: 0.04 },
  { code: 'fish-021', name: '수입조기',   category: 'fish', unit: '1마리',    wholesaleBase: 2900,  retailBase: 4500,  peakMonth: 7,  amplitude: 0.15, noise: 0.05 },

  // 곡물·가공 7
  { code: 'grain-001', name: '쌀',     category: 'grain', unit: '20kg',      wholesaleBase: 50000, retailBase: 65000, peakMonth: 8,  amplitude: 0.05, noise: 0.02 },
  { code: 'grain-002', name: '콩',     category: 'grain', unit: '1kg',       wholesaleBase: 6000,  retailBase: 9000,  peakMonth: 9,  amplitude: 0.10, noise: 0.04 },
  { code: 'grain-003', name: '두부',   category: 'grain', unit: '1모',       wholesaleBase: 1800,  retailBase: 2800,  peakMonth: 1,  amplitude: 0.04, noise: 0.03 },
  { code: 'grain-004', name: '면',     category: 'grain', unit: '1kg',       wholesaleBase: 3000,  retailBase: 5000,  peakMonth: 1,  amplitude: 0.03, noise: 0.02 },
  { code: 'grain-005', name: '떡',     category: 'grain', unit: '1kg',       wholesaleBase: 5000,  retailBase: 8000,  peakMonth: 1,  amplitude: 0.18, noise: 0.04 },
  { code: 'grain-006', name: '콩나물', category: 'grain', unit: '1kg',       wholesaleBase: 1500,  retailBase: 2500,  peakMonth: 1,  amplitude: 0.05, noise: 0.03 },
  { code: 'grain-007', name: '숙주',   category: 'grain', unit: '1kg',       wholesaleBase: 2000,  retailBase: 3500,  peakMonth: 1,  amplitude: 0.05, noise: 0.03 },
  // 곡물·가공 확장 (견과 포함)
  { code: 'grain-008', name: '찹쌀',   category: 'grain', unit: '1kg',       wholesaleBase: 3000,  retailBase: 4700,  peakMonth: 8,  amplitude: 0.05, noise: 0.02 },
  { code: 'grain-009', name: '팥',     category: 'grain', unit: '500g',      wholesaleBase: 8600,  retailBase: 13200, peakMonth: 9,  amplitude: 0.10, noise: 0.04 },
  { code: 'grain-010', name: '녹두',   category: 'grain', unit: '500g',      wholesaleBase: 6800,  retailBase: 10400, peakMonth: 9,  amplitude: 0.10, noise: 0.04 },
  { code: 'grain-011', name: '땅콩',   category: 'grain', unit: '100g',      wholesaleBase: 2100,  retailBase: 3200,  peakMonth: 9,  amplitude: 0.08, noise: 0.03 },
  { code: 'grain-012', name: '호두',   category: 'grain', unit: '100g',      wholesaleBase: 1300,  retailBase: 2000,  peakMonth: 1,  amplitude: 0.05, noise: 0.03 },
  { code: 'grain-013', name: '아몬드', category: 'grain', unit: '100g',      wholesaleBase: 1250,  retailBase: 1900,  peakMonth: 1,  amplitude: 0.05, noise: 0.03 },

  // 조미료 5
  { code: 'season-001', name: '고춧가루', category: 'season', unit: '1kg',   wholesaleBase: 28000, retailBase: 40000, peakMonth: 5,  amplitude: 0.15, noise: 0.04 },
  { code: 'season-002', name: '된장',     category: 'season', unit: '1kg',   wholesaleBase: 6000,  retailBase: 9000,  peakMonth: 1,  amplitude: 0.03, noise: 0.02 },
  { code: 'season-003', name: '고추장',   category: 'season', unit: '1kg',   wholesaleBase: 8000,  retailBase: 12000, peakMonth: 1,  amplitude: 0.03, noise: 0.02 },
  { code: 'season-004', name: '간장',     category: 'season', unit: '1.8L',  wholesaleBase: 7000,  retailBase: 11000, peakMonth: 1,  amplitude: 0.02, noise: 0.02 },
  { code: 'season-005', name: '식용유',   category: 'season', unit: '1.8L',  wholesaleBase: 6000,  retailBase: 9000,  peakMonth: 1,  amplitude: 0.08, noise: 0.03 },
  // 조미료 확장
  { code: 'season-006', name: '건고추',   category: 'season', unit: '600g',  wholesaleBase: 11100, retailBase: 17100, peakMonth: 9,  amplitude: 0.12, noise: 0.04 },
  { code: 'season-007', name: '참깨',     category: 'season', unit: '500g',  wholesaleBase: 11700, retailBase: 18000, peakMonth: 9,  amplitude: 0.08, noise: 0.03 },
  { code: 'season-008', name: '새우젓',   category: 'season', unit: '1kg',   wholesaleBase: 10700, retailBase: 16500, peakMonth: 10, amplitude: 0.10, noise: 0.03 },
  { code: 'season-009', name: '멸치액젓', category: 'season', unit: '1kg',   wholesaleBase: 3800,  retailBase: 5900,  peakMonth: 10, amplitude: 0.05, noise: 0.02 },
  { code: 'season-010', name: '천일염',   category: 'season', unit: '5kg',   wholesaleBase: 7600,  retailBase: 11700, peakMonth: 6,  amplitude: 0.08, noise: 0.03 },

  // 과일 6
  { code: 'fruit-001', name: '사과',   category: 'fruit', unit: '1kg',       wholesaleBase: 5000,  retailBase: 8000,  peakMonth: 7,  amplitude: 0.30, noise: 0.06 },
  { code: 'fruit-002', name: '배',     category: 'fruit', unit: '1kg',       wholesaleBase: 5000,  retailBase: 8500,  peakMonth: 7,  amplitude: 0.30, noise: 0.06 },
  { code: 'fruit-003', name: '바나나', category: 'fruit', unit: '1kg',       wholesaleBase: 2500,  retailBase: 4000,  peakMonth: 1,  amplitude: 0.08, noise: 0.03 },
  { code: 'fruit-004', name: '토마토', category: 'fruit', unit: '1kg',       wholesaleBase: 4000,  retailBase: 6500,  peakMonth: 2,  amplitude: 0.30, noise: 0.07 },
  { code: 'fruit-005', name: '딸기',   category: 'fruit', unit: '1kg',       wholesaleBase: 10000, retailBase: 16000, peakMonth: 8,  amplitude: 0.60, noise: 0.10 },
  { code: 'fruit-006', name: '감귤',   category: 'fruit', unit: '1kg',       wholesaleBase: 3500,  retailBase: 5500,  peakMonth: 7,  amplitude: 0.45, noise: 0.07 },
  // 과일 확장 (KAMIS 분류상 수박·참외·멜론·방울토마토는 채소류지만 UI에선 과일)
  { code: 'fruit-007', name: '수박',       category: 'fruit', unit: '1개',   wholesaleBase: 13700, retailBase: 21000, peakMonth: 5,  amplitude: 0.40, noise: 0.08 },
  { code: 'fruit-008', name: '참외',       category: 'fruit', unit: '10개',  wholesaleBase: 8800,  retailBase: 13500, peakMonth: 4,  amplitude: 0.40, noise: 0.08 },
  { code: 'fruit-009', name: '멜론',       category: 'fruit', unit: '1개',   wholesaleBase: 6200,  retailBase: 9600,  peakMonth: 5,  amplitude: 0.30, noise: 0.07 },
  { code: 'fruit-010', name: '방울토마토', category: 'fruit', unit: '1kg',   wholesaleBase: 3600,  retailBase: 5600,  peakMonth: 2,  amplitude: 0.30, noise: 0.07 },
  { code: 'fruit-011', name: '복숭아',     category: 'fruit', unit: '10개',  wholesaleBase: 12500, retailBase: 19200, peakMonth: 7,  amplitude: 0.50, noise: 0.09 },
  { code: 'fruit-012', name: '오렌지',     category: 'fruit', unit: '10개',  wholesaleBase: 11300, retailBase: 17400, peakMonth: 2,  amplitude: 0.25, noise: 0.06 },
  { code: 'fruit-013', name: '레몬',       category: 'fruit', unit: '10개',  wholesaleBase: 6700,  retailBase: 10300, peakMonth: 1,  amplitude: 0.10, noise: 0.04 },
  { code: 'fruit-014', name: '체리',       category: 'fruit', unit: '100g',  wholesaleBase: 1500,  retailBase: 2300,  peakMonth: 6,  amplitude: 0.40, noise: 0.08 },
  { code: 'fruit-015', name: '망고',       category: 'fruit', unit: '1개',   wholesaleBase: 3600,  retailBase: 5500,  peakMonth: 4,  amplitude: 0.20, noise: 0.06 },
  { code: 'fruit-016', name: '참다래',     category: 'fruit', unit: '10개',  wholesaleBase: 7300,  retailBase: 11300, peakMonth: 11, amplitude: 0.20, noise: 0.05 },
  { code: 'fruit-017', name: '아보카도',   category: 'fruit', unit: '1개',   wholesaleBase: 1000,  retailBase: 1600,  peakMonth: 1,  amplitude: 0.10, noise: 0.04 },
  { code: 'fruit-018', name: '파인애플',   category: 'fruit', unit: '1개',   wholesaleBase: 4600,  retailBase: 7100,  peakMonth: 1,  amplitude: 0.12, noise: 0.05 },
];

if (ITEMS.length !== 101) {
  throw new Error(`ITEMS must contain 101 entries, got ${ITEMS.length}`);
}
