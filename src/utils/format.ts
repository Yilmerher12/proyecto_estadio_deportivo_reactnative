// 12000 -> "$12.000" (sin depender de Intl, que en Hermes puede variar)
export function formatPrice(value: number): string {
  return `$${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
