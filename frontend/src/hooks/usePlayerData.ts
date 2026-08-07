import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

/** Reports how many rows the backend has loaded (dataset availability). */
export function usePlayerData() {
  const [status, setStatus] = useState<{ player_rows: number; supplementary_rows: number } | null>(null);
  useEffect(() => {
    let alive = true;
    apiClient.getStatus().then((s) => { if (alive) setStatus(s); }).catch(() => {});
    return () => { alive = false; };
  }, []);
  return { status, ready: (status?.player_rows ?? 0) > 0 };
}
