import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ThemeMode } from '../types';
import { THEME_ORDER } from '../utils/calculations';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', setTheme: () => {} });

function initialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem('qg-theme') as ThemeMode | null;
    if (saved && THEME_ORDER.includes(saved)) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(initialTheme);

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    try { localStorage.setItem('qg-theme', t); } catch { /* ignore */ }
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  // Apply on mount + whenever it changes (keeps <html data-theme> in sync).
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  // Keyboard shortcuts 1–7 (ignored while typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'select' || tag === 'textarea') return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 7) setTheme(THEME_ORDER[n - 1]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setTheme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
