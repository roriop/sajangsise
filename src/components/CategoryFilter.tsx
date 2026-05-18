import { useEffect, useState } from 'react';
import { CATEGORIES, type Category } from '../lib/data/items';

type Filter = Category | 'all';

export default function CategoryFilter() {
  const [active, setActive] = useState<Filter>('all');

  useEffect(() => {
    const wrappers = document.querySelectorAll<HTMLElement>('[data-category]');
    wrappers.forEach((el) => {
      const match = active === 'all' || el.dataset.category === active;
      el.style.display = match ? '' : 'none';
    });
  }, [active]);

  const baseBtn =
    'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors';

  return (
    <div className="-mx-4 overflow-x-auto" role="tablist" aria-label="카테고리 필터">
      <div className="flex gap-2 px-4 py-2">
        <button
          type="button"
          onClick={() => setActive('all')}
          aria-pressed={active === 'all'}
          className={`${baseBtn} ${
            active === 'all'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-600 border border-neutral-200'
          }`}
        >
          전체
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setActive(c.value)}
            aria-pressed={active === c.value}
            className={`${baseBtn} ${
              active === c.value
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 border border-neutral-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
