import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { gumbelSvg } from '../../utils/calculations';
import { SvgChart } from './SvgChart';

/** Gumbel (Extreme Value Theory) peak-season distribution curves. */
export const GumbelCurve: React.FC = () => {
  const { colors } = useTheme();
  return <SvgChart markup={gumbelSvg(colors)} />;
};
