import type { Item, ItemPriceSeries, PricePoint } from './items';
import * as mock from './mock';
import * as kamis from './kamis';

type Provider = {
  getAllItems(): Promise<Item[]>;
  getLatestPrices(): Promise<Map<string, { current: PricePoint; previous: PricePoint }>>;
  getItemSeries(code: string): Promise<ItemPriceSeries | null>;
};

function pickProvider(): Provider {
  const flag = process.env.USE_KAMIS_MOCK;
  if (flag === 'false') return kamis;
  if (flag === 'true') return mock;
  // 기본값: KAMIS API 키가 없으면 mock.
  return process.env.KAMIS_API_KEY ? kamis : mock;
}

const provider = pickProvider();

export function getAllItems(): Promise<Item[]> {
  return provider.getAllItems();
}

export function getLatestPrices(): Promise<
  Map<string, { current: PricePoint; previous: PricePoint }>
> {
  return provider.getLatestPrices();
}

export function getItemSeries(code: string): Promise<ItemPriceSeries | null> {
  return provider.getItemSeries(code);
}
