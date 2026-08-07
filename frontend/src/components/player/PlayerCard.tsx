import React from 'react';
import { CircularGauge } from '../charts/CircularGauge';
import { useTheme } from '../../hooks/useTheme';
import { lastName } from '../../utils/formatters';

/** Compact TOPSIS gauge card for one player (used by the overview). */
export const PlayerCard: React.FC<{ name: string; score: number; side: 'a' | 'b' }> = ({ name, score, side }) => {
  const { colors } = useTheme();
  const color = side === 'a' ? colors.a : colors.b;
  return (
    <div className="gwrap">
      <CircularGauge value={score} color={color} center={score.toFixed(3)} sub="TOPSIS" />
      <div className="glabel" style={{ color }}>{lastName(name)}</div>
    </div>
  );
};
