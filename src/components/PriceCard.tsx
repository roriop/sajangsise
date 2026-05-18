import type { Item, PricePoint } from '../lib/data/items';
import ChangeIndicator from './ChangeIndicator';
import { formatPrice } from '../lib/format';

type Props = {
  item: Item;
  current: PricePoint;
  previous: PricePoint;
};

export default function PriceCard({ item, current, previous }: Props) {
  const change = current.retail - previous.retail;
  const changePct = previous.retail ? (change / previous.retail) * 100 : 0;

  return (
    <a
      href={`/item/${item.code}`}
      className="block rounded-lg border border-neutral-200 bg-white p-3 hover:border-neutral-400 active:bg-neutral-50 transition-colors"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-medium text-neutral-900 text-sm sm:text-base truncate">
          {item.name}
        </span>
        <span className="text-[10px] text-neutral-500 shrink-0">{item.unit}</span>
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <span className="text-lg sm:text-xl font-bold tabular-nums">
          {formatPrice(current.retail)}
          <span className="text-xs font-normal text-neutral-500 ml-0.5">원</span>
        </span>
        <ChangeIndicator pct={changePct} />
      </div>
    </a>
  );
}
