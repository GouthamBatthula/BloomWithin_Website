export const PRODUCT = {
  name: "Bloom Diary",
  slug: "bloom-diary",
  maxQuantity: 5,
  description: "A thoughtfully designed diary for your everyday reflections.",
} as const;

export function productPricePaise(): number | null {
  const value = process.env.PRODUCT_UNIT_PRICE_PAISE;
  if (!value || !/^\d+$/.test(value)) return null;
  const price = Number(value);
  return Number.isSafeInteger(price) && price >= 0 ? price : null;
}

export function formatINR(paise: number | null): string {
  if (paise === null) return "Price available at checkout";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(paise / 100);
}
