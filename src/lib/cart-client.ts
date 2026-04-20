export type CartItem = {
  product_id: string;
  slug: string;
  name: string;
  sku: string;
  variant: string;
  price_pence: number;
  image_url: string;
  qty: number;
};

const KEY = 'mystore_cart';

export function readCart(): CartItem[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}
export function writeCart(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  document.dispatchEvent(new CustomEvent('cart:changed', { detail: items }));
}
export function addToCart(item: CartItem) {
  const items = readCart();
  const existing = items.find((i) => i.sku === item.sku);
  if (existing) existing.qty += item.qty;
  else items.push(item);
  writeCart(items);
}
export function updateQty(sku: string, qty: number) {
  const items = readCart().map((i) => (i.sku === sku ? { ...i, qty } : i));
  writeCart(items.filter((i) => i.qty > 0));
}
export function removeItem(sku: string) {
  writeCart(readCart().filter((i) => i.sku !== sku));
}
export function clearCart() { writeCart([]); }
export function totalPence(items: CartItem[]) { return items.reduce((n, i) => n + i.qty * i.price_pence, 0); }
