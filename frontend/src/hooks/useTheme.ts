import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { THEME_COLORS } from '../utils/calculations';
import { ChartColors, ThemeMode } from '../types';

interface UseThemeResult {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  colors: ChartColors;
}

/** Access the current theme + setter, plus the chart colour set for that theme. */
export function useTheme(): UseThemeResult {
  const ctx = useContext(ThemeContext);
  return { theme: ctx.theme, setTheme: ctx.setTheme, colors: THEME_COLORS[ctx.theme] };
}
