import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { barsSvg } from '../../utils/calculations';
import { SvgChart } from './SvgChart';

export interface BarSeries { vals: number[]; color: string; hatch?: boolean }

/** Grouped dark bar chart (solid + hatched series supported). */
export const DarkBarChart: React.FC<{ cats: string[]; series: BarSeries[]; height?: number }> = ({ cats, series, height }) => {
  const { colors } = useTheme();
  return <SvgChart markup={barsSvg(cats, series, colors, height)} />;
};
