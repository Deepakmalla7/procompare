/** Shared TypeScript types. These match the REAL FastAPI backend response
 *  (the `head_to_head` command), not an idealised shape. */

export type ThemeMode = 'light' | 'dark' | 'sepia' | 'night' | 'midnight' | 'solarized' | 'focus';

export type ActivePage = 'dashboard' | 'database' | 'methodology';

export type CompareMode = 'career' | 'season';

/** Colours the SVG charts read (from the active theme). */
export interface ChartColors {
  a: string; b: string; ts: string; tp: string; grid: string; stripe: string;
}

/** Raw backend response for `head_to_head`. Player keys are the player names. */
export interface HeadToHeadResponse {
  mode: CompareMode;
  season: string | null;
  dimensions: string[];
  thesis_exact: boolean;
  db_partial: boolean;
  players: {
    a: { name: string; label: string; raw: number[]; norm: number[]; seasons: number };
    b: { name: string; label: string; raw: number[]; norm: number[]; seasons: number };
  };
  ideal: number[];
  ahp: { weights: number[]; cr: number; lambda_max: number; ci: number; ri: number; n: number };
  distances: Record<string, {
    manhattan: number; euclidean: number; minkowski_p3: number; chebyshev: number; cosine_to_ideal: number;
  }>;
  shape_similarity: { cosine: number; pearson: number | null };
  topsis: { closeness: Record<string, number>; ideal: number[]; anti_ideal: number[] };
  verdict: { winner: string; loser: string; winner_closeness: number; loser_closeness: number; margin: number };
  sensitivity: { loser_best_dims: string[]; current_weight_pct: number; reverse_threshold_pct: number | null; reverses: boolean };
  gumbel: Record<string, { loc: number; scale: number; modelled_peak: number; observed_peak: number } | null> | null;
  error?: string;
}

/** Normalised, display-ready view consumed by section components. */
export interface DisplayData {
  mr: boolean;
  aName: string;
  bName: string;
  aLabel: string;
  bLabel: string;
  topsis: [number, number];
  vec: { a: number[]; b: number[] };
  raw: { a: number[]; b: number[] };
  dist: {
    manhattan: [number, number]; euclidean: [number, number];
    minkowski: [number, number]; chebyshev: [number, number]; cosine: [number, number];
  };
  cosine: number;
  pearson: number | null;
  goals90: [number, number];
  assists90: [number, number];
  ahp: number[];
  cr: number;
  sens: number | string;
  dbPartial: boolean;
  /* Rich thesis-case-study extras (only present for Messi vs Ronaldo). */
  pctl?: { a: number[]; b: number[] };
  composite?: [number, number];
  xgEff?: [number, number];
  xgAbove?: [number, number];
  brackets?: Array<[string, number, number, 'a' | 'b', string, string]>;
  peaks?: Array<[string, string, string, number, number, number, 'a' | 'b']>;
  gumbel?: Record<string, { loc: number; scale: number; modelled_peak: number; observed_peak: number } | null> | null;
  similarA?: Array<[string, string, number, string]>;
  similarB?: Array<[string, string, number, string]>;
}

export interface SidebarSection { id: string; label: string; icon: string; }
export interface ThemeMeta { icon: string; label: string; desc: string; a: string; b: string; }
