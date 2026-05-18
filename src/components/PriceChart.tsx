import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { PricePoint } from '../lib/data/items';
import { formatPrice } from '../lib/format';

type Mode = 'retail' | 'wholesale';
type Props = { series: PricePoint[] };

export default function PriceChart({ series }: Props) {
  const [mode, setMode] = useState<Mode>('retail');

  const chartData = useMemo(
    () => series.map((p) => ({ date: p.date, value: mode === 'retail' ? p.retail : p.wholesale })),
    [series, mode],
  );

  const minPrice = useMemo(() => Math.min(...chartData.map((d) => d.value)), [chartData]);
  const maxPrice = useMemo(() => Math.max(...chartData.map((d) => d.value)), [chartData]);

  const btnBase = 'px-3 py-1 rounded text-sm font-medium transition-colors';
  const stroke = mode === 'retail' ? '#16a34a' : '#0ea5e9';

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('retail')}
            className={`${btnBase} ${
              mode === 'retail' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            소매가
          </button>
          <button
            type="button"
            onClick={() => setMode('wholesale')}
            className={`${btnBase} ${
              mode === 'wholesale' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            도매가
          </button>
        </div>
        <div className="text-xs text-neutral-500 tabular-nums hidden sm:block">
          최저 {formatPrice(minPrice)} · 최고 {formatPrice(maxPrice)}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(d: string) => d.slice(5).replace('-', '/')}
              interval={29}
              fontSize={10}
              stroke="#9ca3af"
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => v.toLocaleString('ko-KR')}
              fontSize={10}
              stroke="#9ca3af"
              width={56}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 200', 'dataMax + 200']}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
              labelFormatter={(d) => `${d}`}
              formatter={(value: number) => [`${formatPrice(value)}원`, mode === 'retail' ? '소매가' : '도매가']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={stroke}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-xs text-neutral-500 tabular-nums sm:hidden">
        최저 {formatPrice(minPrice)}원 · 최고 {formatPrice(maxPrice)}원
      </div>
    </div>
  );
}
