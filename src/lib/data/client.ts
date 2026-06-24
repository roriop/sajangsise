import type { Item, ItemPriceSeries, PricePoint } from './items';
import * as mock from './mock';
import * as store from './store';

type Provider = {
  getAllItems(): Promise<Item[]>;
  getLatestPrices(): Promise<Map<string, { current: PricePoint; previous: PricePoint }>>;
  getItemSeries(code: string): Promise<ItemPriceSeries | null>;
};

function pickProvider(): Provider {
  const flag = process.env.USE_KAMIS_MOCK;
  if (flag === 'false') return store; // JSONL 실데이터
  if (flag === 'true') return mock;
  // 기본값: KAMIS 키가 있으면 실데이터(JSONL), 없으면 mock.
  return process.env.KAMIS_API_KEY ? store : mock;
}

const provider = pickProvider();

/** 현재 mock 데이터로 동작 중인지 (실데이터=store 면 false). */
export const usingMock = provider === mock;

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
