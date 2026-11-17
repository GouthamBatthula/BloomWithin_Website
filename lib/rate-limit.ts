const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
export function allowCheckout(ip: string): boolean {
  const now = Date.now();
  const attempts = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  if (attempts.length >= LIMIT) return false;
  attempts.push(now); hits.set(ip, attempts); return true;
}
