import { useEffect, useMemo, useState } from 'react';
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

type Props = { series: PricePoint[] };

export default function PriceChart({ series }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const chartData = useMemo(
    () => series.map((p) => ({ date: p.date, value: p.retail })),
    [series],
  );

  const minPrice = useMemo(() => Math.min(...chartData.map((d) => d.value)), [chartData]);
  const maxPrice = useMemo(() => Math.max(...chartData.map((d) => d.value)), [chartData]);

  const stroke = '#16a34a';

  const xTickInterval = isMobile ? 60 : 29;
  const xTickFormatter = isMobile
    ? (d: string) => `${d.slice(5, 7)}월`
    : (d: string) => d.slice(5).replace('-', '/');

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-neutral-700">소매가 추이</span>
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
              tickFormatter={xTickFormatter}
              interval={xTickInterval}
              fontSize={10}
              stroke="#9ca3af"
              tickLine={false}
              minTickGap={isMobile ? 16 : 8}
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
              formatter={(value: number) => [`${formatPrice(value)}원`, '소매가']}
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
