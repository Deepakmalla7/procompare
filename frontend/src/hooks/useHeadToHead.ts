import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { CompareMode, DisplayData } from '../types';
import { MR_STATIC, resolveDisplay } from '../utils/calculations';

const isMR = (a: string, b: string) => a === 'Lionel Messi' && b === 'Cristiano Ronaldo';

/** Owns the comparison state + data fetching (business logic, not UI). */
export function useHeadToHead() {
  const [playerA, setPlayerA] = useState('Lionel Messi');
  const [playerB, setPlayerB] = useState('Cristiano Ronaldo');
  const [mode, setMode] = useState<CompareMode>('career');
  const [season, setSeason] = useState('2018-2019');
  const [data, setData] = useState<DisplayData | null>(MR_STATIC);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    // Messi vs Ronaldo (career) → exact thesis case study (offline-safe).
    if (isMR(playerA, playerB) && mode === 'career') { setData(MR_STATIC); setError(null); return; }
    setLoading(true); setError(null);
    try {
      const res = await apiClient.headToHead({ player_a: playerA, player_b: playerB, mode, season: mode === 'season' ? season : undefined });
      if (!res || res.error) { setError(res?.error || 'Analysis failed'); setData(null); }
      else setData(resolveDisplay(res));
    } catch {
      setError('Request failed'); setData(null);
    } finally {
      setLoading(false);
    }
  }, [playerA, playerB, mode, season]);

  /** Load a comparison from arbitrary CSV-derived vectors (Database page). */
  const runVectors = useCallback(async (payload: Parameters<typeof apiClient.headToHeadVectors>[0]) => {
    setLoading(true); setError(null);
    try {
      const res = await apiClient.headToHeadVectors(payload);
      if (!res || res.error) { setError(res?.error || 'Analysis failed'); return; }
      setPlayerA(payload.name_a); setPlayerB(payload.name_b); setData(resolveDisplay(res));
    } catch {
      setError('Request failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { run(); }, [run]);

  return { playerA, playerB, mode, season, data, loading, error, setPlayerA, setPlayerB, setMode, setSeason, run, runVectors };
}
