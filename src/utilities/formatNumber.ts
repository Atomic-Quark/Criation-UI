export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
  locale = "en-US"
): string {
  if (typeof value !== "number" || isNaN(value)) return "0";
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCurrency(
  value: number,
  currency = "USD",
  locale = "en-US"
): string {
  return formatNumber(value, { style: "currency", currency }, locale);
}

export function formatCompact(value: number, locale = "en-US"): string {
  return formatNumber(value, { notation: "compact", compactDisplay: "short" }, locale);
}
