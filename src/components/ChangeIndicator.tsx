type Props = { pct: number };

export default function ChangeIndicator({ pct }: Props) {
  if (!Number.isFinite(pct) || Math.abs(pct) < 0.05) {
    return <span className="text-xs text-flat tabular-nums">— 0.0%</span>;
  }
  const up = pct > 0;
  return (
    <span className={`text-xs tabular-nums font-medium ${up ? 'text-up' : 'text-down'}`}>
      {up ? '▲' : '▼'} {Math.abs(pct).toFixed(1)}%
    </span>
  );
}
