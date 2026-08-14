import { ChartColors, DisplayData, HeadToHeadResponse, SidebarSection, ThemeMeta, ThemeMode } from '../types';
import { esc, rgba } from './formatters';

/* ---------------- theme metadata (switcher) + chart colours ---------------- */
export const THEME_ORDER: ThemeMode[] = ['light', 'dark', 'sepia', 'night', 'midnight', 'solarized', 'focus'];
export const THEME_META: Record<ThemeMode, ThemeMeta> = {
  light: { icon: '☀️', label: 'Light', desc: 'Default bright mode', a: '#059669', b: '#D97706' },
  dark: { icon: '🌙', label: 'Dark', desc: 'Easy on the eyes', a: '#00E5CC', b: '#FF8C42' },
  sepia: { icon: '📖', label: 'Sepia', desc: 'Warm, book-like tone', a: '#2E7D32', b: '#BF6000' },
  night: { icon: '⭐', label: 'Night', desc: 'OLED-friendly black', a: '#00FF88', b: '#FF6600' },
  midnight: { icon: '🌌', label: 'Midnight', desc: 'Deep blue, calm reading', a: '#4DA6FF', b: '#FF8C42' },
  solarized: { icon: '🌞', label: 'Solarized', desc: "Ethan Schoonover's palette", a: '#268BD2', b: '#CB4B16' },
  focus: { icon: '👁️', label: 'Focus', desc: 'High contrast reading', a: '#00FF00', b: '#FFFF00' },
};
/** Colours the SVG charts use (kept in sync with themes.css). */
export const THEME_COLORS: Record<ThemeMode, ChartColors> = {
  light: { a: '#059669', b: '#D97706', ts: '#6B7280', tp: '#111827', grid: 'rgba(0,0,0,.08)', stripe: '#F3F4F6' },
  dark: { a: '#00E5CC', b: '#FF8C42', ts: '#6B7A99', tp: '#E8EAF0', grid: 'rgba(255,255,255,.08)', stripe: 'rgba(255,255,255,.03)' },
  sepia: { a: '#2E7D32', b: '#BF6000', ts: '#7C5C45', tp: '#3D2B1F', grid: '#C4A882', stripe: 'rgba(139,90,60,.05)' },
  night: { a: '#00FF88', b: '#FF6600', ts: '#555555', tp: '#FFFFFF', grid: 'rgba(255,255,255,.05)', stripe: 'rgba(255,255,255,.02)' },
  midnight: { a: '#4DA6FF', b: '#FF8C42', ts: '#5A7AAA', tp: '#C8D8F8', grid: 'rgba(100,149,237,.1)', stripe: 'rgba(100,149,237,.04)' },
  solarized: { a: '#268BD2', b: '#CB4B16', ts: '#93A1A1', tp: '#657B83', grid: 'rgba(147,161,161,.35)', stripe: 'rgba(147,161,161,.12)' },
  focus: { a: '#00FF00', b: '#FFFF00', ts: '#AAAAAA', tp: '#FFFFFF', grid: 'rgba(255,255,255,.25)', stripe: 'rgba(255,255,255,.05)' },
};

/* ---------------- static app data ---------------- */
export const SECTIONS: SidebarSection[] = [
  { id: 'overview', icon: '◎', label: 'Framework Overview' },
  { id: 'attacking', icon: '⚡', label: 'Attacking Output' },
  { id: 'xg', icon: '◇', label: 'xG Intelligence' },
  { id: 'peaks', icon: '⛰', label: 'Peak Seasons' },
  { id: 'career', icon: '📈', label: 'Career Arc' },
  { id: 'vectors', icon: '⬡', label: 'Vector Analysis' },
  { id: 'topsis', icon: '∑', label: 'TOPSIS Engine' },
  { id: 'sensitivity', icon: '🔬', label: 'Sensitivity Lab' },
  { id: 'rankings', icon: '▚', label: 'Rankings' },
  { id: 'similar', icon: '⚯', label: 'Similar Players' },
];
export const PLAYERS = ['Lionel Messi', 'Cristiano Ronaldo', 'Robert Lewandowski', 'Karim Benzema', 'Kylian Mbappé', 'Erling Haaland', 'Luis Suárez', 'Neymar', 'Harry Kane', 'Mohamed Salah', 'Sergio Agüero', 'Antoine Griezmann', 'Son Heung-min', 'Zlatan Ibrahimović', 'Thierry Henry', 'Wayne Rooney'];
export const SEASONS = ['2025-2026', '2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021', '2019-2020', '2018-2019', '2017-2018'];
export const RADAR_AXES = ['G/90', 'A/90', 'INT', 'PEAK', 'LON', 'CL'];
export const PHOTOS: Record<string, string> = {
  'Lionel Messi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/400px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
  'Cristiano Ronaldo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/400px-Cristiano_Ronaldo_2018.jpg',
  'Kylian Mbappé': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Kylian_Mbapp%C3%A9_2019.jpg/400px-Kylian_Mbapp%C3%A9_2019.jpg',
  'Erling Haaland': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Erling_Haaland_2023_%28cropped%29.jpg',
};
export const ROLES: Record<string, string> = {
  'Lionel Messi': 'THE MAESTRO | CREATIVE GENIUS',
  'Cristiano Ronaldo': 'THE FINISHER | ELITE PROTAGONIST',
};

/** The exact thesis case-study values (single source for offline correctness). */
export const MR_STATIC: DisplayData = {
  mr: true, aName: 'Lionel Messi', bName: 'Cristiano Ronaldo',
  aLabel: 'top-5 career · thesis dataset', bLabel: 'top-5 career · thesis dataset',
  topsis: [0.805, 0.195],
  vec: { a: [1.0, 1.0, 0.957, 1.0, 0.857, 1.0], b: [0.93, 0.589, 1.0, 0.882, 1.0, 0.967] },
  raw: { a: [0.911, 0.399, 0.276, 1.7, 965, 0.382], b: [0.847, 0.235, 0.289, 1.5, 1126, 0.369] },
  dist: { manhattan: [0.186, 0.632], euclidean: [0.149, 0.435], minkowski: [0.144, 0.415], chebyshev: [0.143, 0.411], cosine: [0.9985, 0.9875] },
  cosine: 0.982, pearson: -0.436,
  goals90: [0.911, 0.847], assists90: [0.399, 0.235],
  ahp: [0.25, 0.2, 0.1, 0.2, 0.1, 0.15], cr: 0.0, sens: 63, dbPartial: false,
  pctl: { a: [99, 99, 96, 99, 86, 98], b: [97, 94, 98, 96, 99, 97] }, composite: [92, 88],
  xgEff: [144.5, 108], xgAbove: [12.9, 2.7],
  brackets: [['20-24', 1.274, 0.789, 'a', '+61.5%', 'Early dominance established'], ['25-29', 1.382, 1.429, 'b', '+3.4%', 'Physical prime advantage'], ['30-34', 1.148, 1.09, 'a', '+5.3%', 'Playmaker style resilient'], ['35+', 1.131, 0.92, 'a', '+22.9%', 'Longevity quality gap']],
  peaks: [['1', 'MESSI', '2011-12', 73, 29, 1.7, 'a'], ['2', 'MESSI', '2012-13', 46, 12, 1.58, 'a'], ['3', 'RONALDO', '2014-15', 61, 11, 1.5, 'b'], ['4', 'MESSI', '2010-11', 53, 27, 1.44, 'a'], ['5', 'RONALDO', '2011-12', 60, 15, 1.39, 'b']],
  similarA: [['Xavi', '2000s', 91, 'Elite creation, low-error passing'], ['Iniesta', '2000s', 89, 'Dribble-and-link profile'], ['Bergkamp', '1990s', 84, 'Creative finishing blend'], ['Zidane', '2000s', 83, 'Control + chance creation'], ['Salah', '2010s', 81, 'High G+A per 90']],
  similarB: [['R. van Nistelrooy', '2000s', 90, 'Pure box finisher'], ['Shearer', '1990s', 88, 'Volume goalscoring'], ['Lewandowski', '2010s', 87, 'Elite npxG conversion'], ['Haaland', '2020s', 85, 'Penalty-box threat'], ['Batistuta', '1990s', 82, 'Powerful finishing']],
};

/** Map the raw backend response into the section-ready display shape. */
export function resolveDisplay(live: HeadToHeadResponse): DisplayData {
  const an = live.players.a.name, bn = live.players.b.name;
  const da = live.distances[an], db = live.distances[bn];
  return {
    mr: false, aName: an, bName: bn, aLabel: live.players.a.label, bLabel: live.players.b.label,
    topsis: [live.topsis.closeness[an], live.topsis.closeness[bn]],
    vec: { a: live.players.a.norm, b: live.players.b.norm }, raw: { a: live.players.a.raw, b: live.players.b.raw },
    dist: {
      manhattan: [da.manhattan, db.manhattan], euclidean: [da.euclidean, db.euclidean],
      minkowski: [da.minkowski_p3, db.minkowski_p3], chebyshev: [da.chebyshev, db.chebyshev],
      cosine: [da.cosine_to_ideal, db.cosine_to_ideal],
    },
    cosine: live.shape_similarity.cosine, pearson: live.shape_similarity.pearson,
    goals90: [live.players.a.raw[0], live.players.b.raw[0]], assists90: [live.players.a.raw[1], live.players.b.raw[1]],
    ahp: live.ahp.weights, cr: live.ahp.cr, sens: live.sensitivity.reverse_threshold_pct ?? '—',
    dbPartial: live.db_partial, gumbel: live.gumbel,
  };
}

/* ---------------- SVG chart generators (theme-aware, pixel-exact) ----------------
   Return SVG markup strings; rendered by the chart components via a small wrapper.
   Colours are passed in from the active theme so every mode recolours. */
type Series = { vals: number[]; color: string; fill?: string; dash?: boolean; hatch?: boolean };

export function radarSvg(axes: string[], series: Series[], size: number, c: ChartColors): string {
  const n = axes.length, cx = size / 2, cy = size / 2, R = size * 0.34;
  const pt = (i: number, v: number): [number, number] => {
    const a = ((-90 + (i * 360) / n) * Math.PI) / 180, r = R * Math.max(0, Math.min(1.05, v));
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  let g = '';
  [0.25, 0.5, 0.75, 1].forEach((l) => {
    g += `<polygon points="${axes.map((_, i) => pt(i, l).join(',')).join(' ')}" fill="none" stroke="${c.grid}" stroke-width="1"/>`;
  });
  for (let i = 0; i < n; i++) { const e = pt(i, 1); g += `<line x1="${cx}" y1="${cy}" x2="${e[0]}" y2="${e[1]}" stroke="${c.grid}"/>`; }
  series.forEach((s) => {
    const pts = s.vals.map((v, i) => pt(i, v).join(',')).join(' ');
    g += `<polygon points="${pts}" fill="${s.fill || 'none'}" stroke="${s.color}" stroke-width="2" ${s.dash ? 'stroke-dasharray="4 4"' : ''}/>`;
  });
  for (let j = 0; j < n; j++) {
    const lp = pt(j, 1.2), a = -90 + (j * 360) / n, cs = Math.cos((a * Math.PI) / 180);
    const an = Math.abs(cs) < 0.25 ? 'middle' : cs > 0 ? 'start' : 'end';
    g += `<text x="${lp[0]}" y="${lp[1] + 3}" font-size="9.5" fill="${c.ts}" text-anchor="${an}" letter-spacing="1">${esc(axes[j])}</text>`;
  }
  return `<svg viewBox="0 0 ${size} ${size}" width="100%" style="max-width:${size}px;display:block;margin:0 auto">${g}</svg>`;
}

export function donutSvg(val: number, max: number, color: string, center: string, sub: string, c: ChartColors): string {
  const r = 54, circ = 2 * Math.PI * r, frac = Math.max(0, Math.min(1, val / max)), off = circ * (1 - frac);
  return `<svg viewBox="0 0 140 140" width="130"><circle cx="70" cy="70" r="${r}" fill="none" stroke="${c.grid}" stroke-width="10"/>` +
    `<circle cx="70" cy="70" r="${r}" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 70 70)"/>` +
    `<text x="70" y="68" text-anchor="middle" font-size="24" font-weight="700" fill="${c.tp}">${center}</text>` +
    `<text x="70" y="86" text-anchor="middle" font-size="8.5" fill="${c.ts}" letter-spacing="1">${esc(sub || '')}</text></svg>`;
}

export function barsSvg(cats: string[], series: Series[], c: ChartColors, h = 170): string {
  const W = 300, pad = 30, bw = (W - pad * 2) / cats.length;
  let g = '';
  const maxv = Math.max(...series.reduce<number[]>((acc, s) => acc.concat(s.vals), [0.001]));
  for (let gy = 0; gy <= 3; gy++) { const yy = pad + (h - pad * 1.4) * gy / 3; g += `<line x1="${pad}" y1="${yy}" x2="${W - pad}" y2="${yy}" stroke="${c.grid}"/>`; }
  cats.forEach((cat, i) => {
    const x0 = pad + bw * i, innerW = bw * 0.62, sw = innerW / series.length;
    series.forEach((s, si) => {
      const v = s.vals[i] || 0, bh = (h - pad * 1.4) * (v / maxv), x = x0 + bw * 0.19 + sw * si, y = pad + (h - pad * 1.4) - bh;
      g += `<rect x="${x}" y="${y}" width="${sw * 0.82}" height="${Math.max(0, bh)}" rx="2" fill="${s.color}"${s.hatch ? ' fill-opacity="0.35"' : ''}/>`;
    });
    g += `<text x="${x0 + bw / 2}" y="${h - 6}" font-size="8.5" fill="${c.ts}" text-anchor="middle" letter-spacing="1">${esc(cat)}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${h}" width="100%">${g}</svg>`;
}

export function gumbelSvg(c: ChartColors): string {
  const W = 300, H = 180, pad = 28;
  const pdf = (x: number, mu: number, be: number) => { const z = (x - mu) / be; return Math.exp(-(z + Math.exp(-z))) / be; };
  const curve = (mu: number, be: number, color: string) => {
    const pts: [number, number][] = [];
    for (let x = 0; x <= 90; x += 2) { const y = pdf(x, mu, be); pts.push([pad + (W - 2 * pad) * x / 90, H - pad - y * 1400]); }
    const d = 'M' + pts.map((p) => `${p[0].toFixed(1)},${Math.max(pad, p[1]).toFixed(1)}`).join(' L');
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2"/><path d="${d} L${W - pad},${H - pad} L${pad},${H - pad} Z" fill="${rgba(color, 0.08)}"/>`;
  };
  let g = '';
  for (let i = 0; i <= 3; i++) { const yy = pad + (H - 2 * pad) * i / 3; g += `<line x1="${pad}" y1="${yy}" x2="${W - pad}" y2="${yy}" stroke="${c.grid}"/>`; }
  g += curve(35, 11, c.b) + curve(38, 12, c.a);
  const mx = pad + (W - 2 * pad) * 73 / 90;
  g += `<line x1="${mx}" y1="${pad}" x2="${mx}" y2="${H - pad}" stroke="${c.a}" stroke-dasharray="3 3" stroke-width="1"/>`;
  g += `<text x="${mx - 4}" y="${pad + 10}" font-size="8.5" fill="${c.a}" text-anchor="end">73G · 3.4% prob</text>`;
  g += `<text x="${pad}" y="${H - 8}" font-size="8" fill="${c.ts}">0</text><text x="${W - pad}" y="${H - 8}" font-size="8" fill="${c.ts}" text-anchor="end">90 goals</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%">${g}</svg>`;
}

export function ageCurveSvg(c: ChartColors): string {
  const W = 300, H = 190, pad = 30, ages = [17, 20, 22, 25, 27, 29, 31, 33, 35, 37, 39];
  const m = [0.4, 1.1, 1.32, 1.38, 1.45, 1.36, 1.2, 1.15, 1.13, 1.05, 0.9];
  const r = [0.5, 0.9, 1.15, 1.4, 1.44, 1.38, 1.1, 1.09, 0.92, 0.7, 0.5];
  const maxv = 1.6;
  const line = (vals: number[], color: string) => {
    const pts = ages.map((a, i) => [pad + (W - 2 * pad) * (a - 17) / 22, H - pad - (H - 2 * pad) * (vals[i] / maxv)]);
    return `<polyline points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="none" stroke="${color}" stroke-width="2.5"/>`;
  };
  let g = '';
  ['20-24', '25-29', '30-34', '35+'].forEach((lb, i) => {
    const x = pad + (W - 2 * pad) * i / 4;
    g += `<rect x="${x}" y="${pad}" width="${(W - 2 * pad) / 4}" height="${H - 2 * pad}" fill="${i % 2 ? c.stripe : 'transparent'}"/><text x="${x + (W - 2 * pad) / 8}" y="${H - 10}" font-size="8" fill="${c.ts}" text-anchor="middle">${lb}</text>`;
  });
  g += line(r, c.b) + line(m, c.a);
  return `<svg viewBox="0 0 ${W} ${H}" width="100%">${g}</svg>`;
}

export function crossoverSvg(sensPct: number, c: ChartColors): string {
  const W = 320, H = 200, pad = 32;
  const messi = (w: number) => 0.805 - (0.805 - 0.5) * (w / 0.63);
  const xf = (w: number) => pad + (W - 2 * pad) * w;
  const yf = (v: number) => H - pad - (H - 2 * pad) * v;
  let mp = '', rp = '';
  for (let w = 0; w <= 1.0001; w += 0.02) {
    const mv = Math.max(0.05, Math.min(0.95, messi(w)));
    mp += `${w === 0 ? 'M' : 'L'}${xf(w).toFixed(1)},${yf(mv).toFixed(1)} `;
    rp += `${w === 0 ? 'M' : 'L'}${xf(w).toFixed(1)},${yf(1 - mv).toFixed(1)} `;
  }
  const cx = xf(0.63);
  let g = `<rect x="${pad}" y="${pad}" width="${cx - pad}" height="${H - 2 * pad}" fill="${rgba(c.a, 0.06)}"/><rect x="${cx}" y="${pad}" width="${W - pad - cx}" height="${H - 2 * pad}" fill="${rgba(c.b, 0.06)}"/>`;
  for (let i = 0; i <= 4; i++) { const yy = pad + (H - 2 * pad) * i / 4; g += `<line x1="${pad}" y1="${yy}" x2="${W - pad}" y2="${yy}" stroke="${c.grid}"/>`; }
  g += `<path d="${mp}" fill="none" stroke="${c.a}" stroke-width="2.5"/><path d="${rp}" fill="none" stroke="${c.b}" stroke-width="2.5"/>`;
  g += `<line x1="${cx}" y1="${pad}" x2="${cx}" y2="${H - pad}" stroke="#ff4d4d" stroke-dasharray="4 3" stroke-width="1.5"/>`;
  g += `<text x="${cx}" y="${pad - 6}" font-size="9" fill="#ff6b6b" text-anchor="middle">TIPPING POINT 63%</text>`;
  const sx = xf(sensPct / 100);
  g += `<line x1="${sx}" y1="${pad}" x2="${sx}" y2="${H - pad}" stroke="${c.tp}" stroke-width="1" opacity=".5"/>`;
  g += `<text x="${pad}" y="${H - 8}" font-size="8" fill="${c.ts}">0% weight</text><text x="${W - pad}" y="${H - 8}" font-size="8" fill="${c.ts}" text-anchor="end">100%</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%">${g}</svg>`;
}
