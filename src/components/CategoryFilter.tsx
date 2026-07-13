import { useEffect, useState } from 'react';
import type { Category } from '../lib/data/items';

type Filter = Category | 'all';

type CategoryTab = { value: Category; label: string; count: number };

type Props = {
  /** 실제 데이터가 있는 카테고리만. 없으면 전 카테고리 대상(mock). */
  categories: CategoryTab[];
  /** 전체 노출 품목 수. */
  total: number;
};

export default function CategoryFilter({ categories, total }: Props) {
  const [active, setActive] = useState<Filter>('all');

  useEffect(() => {
    const wrappers = document.querySelectorAll<HTMLElement>('[data-category]');
    wrappers.forEach((el) => {
      const match = active === 'all' || el.dataset.category === active;
      el.style.display = match ? '' : 'none';
    });
  }, [active]);

  const baseBtn =
    'inline-flex items-center justify-center min-h-11 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-colors';

  // 카테고리가 하나뿐이면 필터가 의미 없음 → 렌더 생략.
  if (categories.length <= 1) return null;

  const btnClass = (isActive: boolean) =>
    `${baseBtn} ${
      isActive
        ? 'bg-neutral-900 text-white'
        : 'bg-white text-neutral-600 border border-neutral-200'
    }`;

  return (
    <div className="-mx-4 overflow-x-auto" role="tablist" aria-label="카테고리 필터">
      <div className="flex gap-2 px-4 py-2">
        <button
          type="button"
          onClick={() => setActive('all')}
          aria-pressed={active === 'all'}
          className={btnClass(active === 'all')}
        >
          전체
          <span className="ml-1 text-xs opacity-60 tabular-nums">{total}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setActive(c.value)}
            aria-pressed={active === c.value}
            className={btnClass(active === c.value)}
          >
            {c.label}
            <span className="ml-1 text-xs opacity-60 tabular-nums">{c.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
