import { ITEMS, type Item, type ItemPriceSeries, type PricePoint } from './items';

function hashCode(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return function () {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dayKey(d: Date): number {
  return Math.floor(d.getTime() / 86400000);
}

function priceForDate(item: Item, d: Date): PricePoint {
  const baseSeed = hashCode(item.code);
  const rng = mulberry32(baseSeed ^ dayKey(d));

  const monthFrac = d.getMonth() + 1 + (d.getDate() - 1) / 30;
  const seasonal = 1 + item.amplitude * Math.cos(((monthFrac - item.peakMonth) / 12) * 2 * Math.PI);

  const dailyNoise = (rng() - 0.5) * 2 * item.noise;
  const retailNoise = (rng() - 0.5) * 2 * (item.noise * 0.6);

  const wholesale = Math.max(1, Math.round(item.wholesaleBase * seasonal * (1 + dailyNoise)));
  const retail = Math.max(1, Math.round(item.retailBase * seasonal * (1 + dailyNoise * 0.7 + retailNoise * 0.3)));

  return { date: isoDate(d), wholesale, retail };
}

function generateSeries(item: Item, days: number, endDate: Date): PricePoint[] {
  const out: PricePoint[] = [];
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    out.push(priceForDate(item, d));
  }
  return out;
}

export async function getAllItems(): Promise<Item[]> {
  return ITEMS;
}

export async function getLatestPrices(): Promise<
  Map<string, { current: PricePoint; previous: PricePoint }>
> {
  const today = new Date();
  const map = new Map<string, { current: PricePoint; previous: PricePoint }>();
  for (const item of ITEMS) {
    const series = generateSeries(item, 2, today);
    map.set(item.code, { current: series[1], previous: series[0] });
  }
  return map;
}

export async function getItemSeries(code: string): Promise<ItemPriceSeries | null> {
  const item = ITEMS.find((i) => i.code === code);
  if (!item) return null;
  return { code, series: generateSeries(item, 365, new Date()) };
}
