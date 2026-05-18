export function formatPrice(n: number): string {
  return n.toLocaleString('ko-KR');
}

export function formatDateKor(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function formatDateShort(iso: string): string {
  return iso.slice(5).replace('-', '/');
}
