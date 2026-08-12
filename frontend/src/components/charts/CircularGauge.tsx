import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { donutSvg } from '../../utils/calculations';
import { SvgChart } from './SvgChart';

/** Circular donut gauge (TOPSIS scores, per-90 rates, percentiles). */
export const CircularGauge: React.FC<{ value: number; max?: number; color: string; center: string; sub?: string }> = ({ value, max = 1, color, center, sub = '' }) => {
  const { colors } = useTheme();
  return <SvgChart markup={donutSvg(value, max, color, center, sub, colors)} />;
};
