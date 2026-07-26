/** Small formatting/helper utilities (single responsibility). */

export const esc = (s: unknown): string =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const initials = (name: string): string =>
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

export const lastName = (name: string): string =>
  name.split(' ').slice(-1)[0].toUpperCase();

/** A 6-D dimension value: index 4 (longevity/games) is an integer, others 3dp. */
export const fmtDim = (v: number, i: number): string =>
  i === 4 ? Math.round(v).toLocaleString() : (Math.round(v * 1000) / 1000).toFixed(3);

export const f3 = (v: number | null | undefined): string =>
  v == null || isNaN(Number(v)) ? 'n/a' : Number(v).toFixed(3);

export const rgba = (hex: string, alpha: number): string => {
  if (!hex || hex.charAt(0) !== '#') return hex;
  let h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const tier = (x: number): string =>
  x >= 90 ? 'World Class' : x >= 80 ? 'Elite' : x >= 70 ? 'Excellent' : x >= 60 ? 'Very Good' : 'Good';
