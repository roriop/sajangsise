import type { Item, ItemPriceSeries, PricePoint } from './items';

// Phase 1 — KAMIS Open API 연동 진입점.
// Phase 0에서는 client.ts가 mock.ts로 분기하므로 호출되지 않는다.

export async function getAllItems(): Promise<Item[]> {
  throw new Error('KAMIS provider not implemented yet (Phase 1)');
}

export async function getLatestPrices(): Promise<
  Map<string, { current: PricePoint; previous: PricePoint }>
> {
  throw new Error('KAMIS provider not implemented yet (Phase 1)');
}

export async function getItemSeries(_code: string): Promise<ItemPriceSeries | null> {
  throw new Error('KAMIS provider not implemented yet (Phase 1)');
}
