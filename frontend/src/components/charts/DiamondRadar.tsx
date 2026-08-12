import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { radarSvg } from '../../utils/calculations';
import { SvgChart } from './SvgChart';

export interface RadarSeries { vals: number[]; color: string; fill?: string; dash?: boolean }

/** Multi-axis radar (the thesis "diamond"/hexagon vector plot). */
export const DiamondRadar: React.FC<{ axes: string[]; series: RadarSeries[]; size?: number }> = ({ axes, series, size = 300 }) => {
  const { colors } = useTheme();
  return <SvgChart markup={radarSvg(axes, series, size, colors)} />;
};
