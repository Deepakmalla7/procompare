import React, { createContext, useContext } from 'react';
import { useHeadToHead } from '../hooks/useHeadToHead';

type ComparisonValue = ReturnType<typeof useHeadToHead>;

const ComparisonContext = createContext<ComparisonValue | null>(null);

/** Shares one comparison state (players, mode, data) across the whole app so the
 *  hero, every section, and the verdict badge stay in sync. */
export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useHeadToHead();
  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};

export function useComparison(): ComparisonValue {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error('useComparison must be used within a ComparisonProvider');
  return ctx;
}
