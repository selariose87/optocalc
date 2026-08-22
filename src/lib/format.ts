export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatSigned(value: number, decimals = 2): string {
  const rounded = round2(value);
  const sign = rounded > 0 ? "+" : rounded < 0 ? "−" : "";
  return `${sign}${Math.abs(rounded).toFixed(decimals)}`;
}

export function formatNumber(value: number, decimals = 2): string {
  return round2(value).toFixed(decimals);
}
