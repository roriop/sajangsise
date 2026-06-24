import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ITEMS, type Item, type ItemPriceSeries, type PricePoint } from './items';

/**
 * JSONL 가격 저장소 (Phase 1, USE_KAMIS_MOCK=false 일 때의 실데이터 진입점).
 *
 * 파일: data/prices.jsonl — append-only, 한 줄 = 한 품목의 하루치 가격.
 *   {"date":"2026-06-24","code":"veg-001","wholesale":2000,"retail":4000}
 *
 * GH Actions cron(scripts/collect-prices.mjs)이 KAMIS에서 매일 수집해 append + commit.
 * 빌드 시 Astro가 이 모듈로 JSONL을 읽어 SSG. (KAMIS API는 빌드 때 호출하지 않는다.)
 */

const PRICES_PATH = fileURLToPath(new URL('../../../data/prices.jsonl', import.meta.url));
const CODES_PATH = fileURLToPath(new URL('../../../data/kamis-codes.json', import.meta.url));

type Row = { date: string; code: string; retail: number; wholesale?: number };

/** KAMIS 실측 단위(예: 삼겹살 100g, 사과 10개)로 품목 unit 을 덮어쓴다. */
let unitCache: Map<string, string> | null = null;
function kamisUnits(): Map<string, string> {
  if (unitCache) return unitCache;
  const m = new Map<string, string>();
  try {
    const codes = JSON.parse(readFileSync(CODES_PATH, 'utf8')) as Record<string, { unit?: string }>;
    for (const [code, c] of Object.entries(codes)) if (c.unit) m.set(code, c.unit);
  } catch {
    /* 코드표 없으면 items.ts 단위 그대로 */
  }
  unitCache = m;
  return m;
}

let cache: Map<string, PricePoint[]> | null = null;

/** code → 날짜 오름차순 PricePoint[] */
function load(): Map<string, PricePoint[]> {
  if (cache) return cache;
  const byCode = new Map<string, PricePoint[]>();
  let raw = '';
  try {
    raw = readFileSync(PRICES_PATH, 'utf8');
  } catch {
    // 파일 없음(수집 시작 전) → 빈 저장소.
    cache = byCode;
    return byCode;
  }
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    let row: Row;
    try {
      row = JSON.parse(trimmed);
    } catch {
      continue; // 깨진 줄은 건너뜀
    }
    if (!row.code || !row.date || typeof row.retail !== 'number') continue;
    const list = byCode.get(row.code) ?? [];
    list.push({ date: row.date, wholesale: row.wholesale ?? 0, retail: row.retail });
    byCode.set(row.code, list);
  }
  for (const list of byCode.values()) {
    list.sort((a, b) => a.date.localeCompare(b.date));
  }
  cache = byCode;
  return byCode;
}

export async function getAllItems(): Promise<Item[]> {
  const units = kamisUnits();
  return ITEMS.map((i) => {
    const u = units.get(i.code);
    return u ? { ...i, unit: u } : i;
  });
}

export async function getLatestPrices(): Promise<
  Map<string, { current: PricePoint; previous: PricePoint }>
> {
  const byCode = load();
  const map = new Map<string, { current: PricePoint; previous: PricePoint }>();
  for (const item of ITEMS) {
    const series = byCode.get(item.code);
    if (!series || series.length === 0) continue;
    const current = series[series.length - 1];
    const previous = series.length >= 2 ? series[series.length - 2] : current;
    map.set(item.code, { current, previous });
  }
  return map;
}

export async function getItemSeries(code: string): Promise<ItemPriceSeries | null> {
  if (!ITEMS.some((i) => i.code === code)) return null;
  const series = load().get(code) ?? [];
  return { code, series };
}
