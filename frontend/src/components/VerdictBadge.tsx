import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { useTheme } from '../hooks/useTheme';
import { lastName } from '../utils/formatters';

/** Floating bottom-right verdict pill; click to jump to the TOPSIS section. */
export const VerdictBadge: React.FC<{ onOpen?: () => void }> = ({ onOpen }) => {
  const { data } = useComparison();
  const { colors } = useTheme();
  if (!data) return null;
  const aWin = data.topsis[0] >= data.topsis[1];
  return (
    <div className="verdict" style={{ borderLeftColor: aWin ? colors.a : colors.b }} onClick={onOpen}>
      <div className="t">🏆 {lastName(aWin ? data.aName : data.bName)} LEADS</div>
      <div className="s">{data.topsis[0].toFixed(3)} vs {data.topsis[1].toFixed(3)}</div>
    </div>
  );
};
