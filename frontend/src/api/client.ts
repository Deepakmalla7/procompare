import { CompareMode, HeadToHeadResponse } from '../types';

/** All backend communication lives here (separation of concerns). The dev server
 *  proxies these paths to the FastAPI backend on :8000 (see vite.config.ts). */
const API = '/api/data-scout';

async function post(body: Record<string, unknown>): Promise<any> {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export const apiClient = {
  /** Career/season comparison of two named players. */
  headToHead: (params: { player_a: string; player_b: string; mode: CompareMode; season?: string }): Promise<HeadToHeadResponse> =>
    post({ command: 'head_to_head', ...params }),

  /** Direct 6-D vector comparison (used by the CSV upload flow). */
  headToHeadVectors: (params: {
    vec_a: number[]; vec_b: number[]; name_a: string; name_b: string;
    label_a?: string; label_b?: string; season_goals_a?: number[]; season_goals_b?: number[];
    seasons_a?: number; seasons_b?: number;
  }): Promise<HeadToHeadResponse> => post({ command: 'head_to_head', mode: 'career', ...params }),

  getStatus: async (): Promise<{ player_rows: number; supplementary_rows: number }> =>
    (await fetch('/status')).json(),
};
