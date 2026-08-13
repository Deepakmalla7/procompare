import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { crossoverSvg } from '../../utils/calculations';
import { SvgChart } from './SvgChart';

/** Sensitivity weight-sweep crossover chart with the 63% tipping point. */
export const CrossoverChart: React.FC<{ sensPct: number }> = ({ sensPct }) => {
  const { colors } = useTheme();
  return <SvgChart markup={crossoverSvg(sensPct, colors)} />;
};
