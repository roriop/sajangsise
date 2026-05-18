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

  // 수산 8
  { code: 'fish-001', name: '고등어',   category: 'fish', unit: '1kg',        wholesaleBase: 7000,  retailBase: 12000, peakMonth: 5,  amplitude: 0.20, noise: 0.06 },
  { code: 'fish-002', name: '갈치',     category: 'fish', unit: '1kg',        wholesaleBase: 18000, retailBase: 28000, peakMonth: 4,  amplitude: 0.25, noise: 0.07 },
  { code: 'fish-003', name: '오징어',   category: 'fish', unit: '1kg',        wholesaleBase: 12000, retailBase: 20000, peakMonth: 3,  amplitude: 0.30, noise: 0.08 },
  { code: 'fish-004', name: '명태',     category: 'fish', unit: '1kg',        wholesaleBase: 6000,  retailBase: 10000, peakMonth: 7,  amplitude: 0.18, noise: 0.06 },
  { code: 'fish-005', name: '조기',     category: 'fish', unit: '1kg',        wholesaleBase: 15000, retailBase: 25000, peakMonth: 7,  amplitude: 0.20, noise: 0.07 },
  { code: 'fish-006', name: '새우',     category: 'fish', unit: '1kg',        wholesaleBase: 20000, retailBase: 35000, peakMonth: 8,  amplitude: 0.18, noise: 0.07 },
  { code: 'fish-007', name: '멸치',     category: 'fish', unit: '1kg',        wholesaleBase: 25000, retailBase: 40000, peakMonth: 12, amplitude: 0.10, noise: 0.04 },
  { code: 'fish-008', name: '김',       category: 'fish', unit: '1속(100장)', wholesaleBase: 8000,  retailBase: 13000, peakMonth: 9,  amplitude: 0.15, noise: 0.05 },

  // 곡물·가공 7
  { code: 'grain-001', name: '쌀',     category: 'grain', unit: '20kg',      wholesaleBase: 50000, retailBase: 65000, peakMonth: 8,  amplitude: 0.05, noise: 0.02 },
  { code: 'grain-002', name: '콩',     category: 'grain', unit: '1kg',       wholesaleBase: 6000,  retailBase: 9000,  peakMonth: 9,  amplitude: 0.10, noise: 0.04 },
  { code: 'grain-003', name: '두부',   category: 'grain', unit: '1모',       wholesaleBase: 1800,  retailBase: 2800,  peakMonth: 1,  amplitude: 0.04, noise: 0.03 },
  { code: 'grain-004', name: '면',     category: 'grain', unit: '1kg',       wholesaleBase: 3000,  retailBase: 5000,  peakMonth: 1,  amplitude: 0.03, noise: 0.02 },
  { code: 'grain-005', name: '떡',     category: 'grain', unit: '1kg',       wholesaleBase: 5000,  retailBase: 8000,  peakMonth: 1,  amplitude: 0.18, noise: 0.04 },
  { code: 'grain-006', name: '콩나물', category: 'grain', unit: '1kg',       wholesaleBase: 1500,  retailBase: 2500,  peakMonth: 1,  amplitude: 0.05, noise: 0.03 },
  { code: 'grain-007', name: '숙주',   category: 'grain', unit: '1kg',       wholesaleBase: 2000,  retailBase: 3500,  peakMonth: 1,  amplitude: 0.05, noise: 0.03 },

  // 조미료 5
  { code: 'season-001', name: '고춧가루', category: 'season', unit: '1kg',   wholesaleBase: 28000, retailBase: 40000, peakMonth: 5,  amplitude: 0.15, noise: 0.04 },
  { code: 'season-002', name: '된장',     category: 'season', unit: '1kg',   wholesaleBase: 6000,  retailBase: 9000,  peakMonth: 1,  amplitude: 0.03, noise: 0.02 },
  { code: 'season-003', name: '고추장',   category: 'season', unit: '1kg',   wholesaleBase: 8000,  retailBase: 12000, peakMonth: 1,  amplitude: 0.03, noise: 0.02 },
  { code: 'season-004', name: '간장',     category: 'season', unit: '1.8L',  wholesaleBase: 7000,  retailBase: 11000, peakMonth: 1,  amplitude: 0.02, noise: 0.02 },
  { code: 'season-005', name: '식용유',   category: 'season', unit: '1.8L',  wholesaleBase: 6000,  retailBase: 9000,  peakMonth: 1,  amplitude: 0.08, noise: 0.03 },

  // 과일 6
  { code: 'fruit-001', name: '사과',   category: 'fruit', unit: '1kg',       wholesaleBase: 5000,  retailBase: 8000,  peakMonth: 7,  amplitude: 0.30, noise: 0.06 },
  { code: 'fruit-002', name: '배',     category: 'fruit', unit: '1kg',       wholesaleBase: 5000,  retailBase: 8500,  peakMonth: 7,  amplitude: 0.30, noise: 0.06 },
  { code: 'fruit-003', name: '바나나', category: 'fruit', unit: '1kg',       wholesaleBase: 2500,  retailBase: 4000,  peakMonth: 1,  amplitude: 0.08, noise: 0.03 },
  { code: 'fruit-004', name: '토마토', category: 'fruit', unit: '1kg',       wholesaleBase: 4000,  retailBase: 6500,  peakMonth: 2,  amplitude: 0.30, noise: 0.07 },
  { code: 'fruit-005', name: '딸기',   category: 'fruit', unit: '1kg',       wholesaleBase: 10000, retailBase: 16000, peakMonth: 8,  amplitude: 0.60, noise: 0.10 },
  { code: 'fruit-006', name: '감귤',   category: 'fruit', unit: '1kg',       wholesaleBase: 3500,  retailBase: 5500,  peakMonth: 7,  amplitude: 0.45, noise: 0.07 },
];

if (ITEMS.length !== 50) {
  throw new Error(`ITEMS must contain 50 entries, got ${ITEMS.length}`);
}
