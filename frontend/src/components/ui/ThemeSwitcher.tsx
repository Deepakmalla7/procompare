import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { THEME_META, THEME_ORDER } from '../../utils/calculations';

/** Reading-mode dropdown: 7 themes, preview dots, checkmark, keyboard [1–7]. */
export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onEsc); };
  }, [open]);

  return (
    <div ref={ref} style={{ display: 'inline-flex' }}>
      <button className="themebtn" title="Reading mode (1–7)" aria-label="Reading mode" onClick={() => setOpen((o) => !o)}>◐</button>
      {open && (
        <div className="themepanel" role="menu">
          <div className="tp-h">Reading Mode</div>
          {THEME_ORDER.map((name, i) => {
            const t = THEME_META[name];
            const active = theme === name;
            return (
              <div key={name} className={`tp-row${active ? ' on' : ''}`} onClick={() => { setTheme(name); setOpen(false); }} role="menuitem">
                <span className="tp-ic">{t.icon}</span>
                <div>
                  <div className="tp-name">{t.label}</div>
                  <div className="tp-desc">{t.desc}</div>
                </div>
                <span className="tp-dots"><i style={{ background: t.a }} /><i style={{ background: t.b }} /></span>
                {active ? <span className="tp-check">✓</span> : <span className="tp-desc" style={{ width: 12, textAlign: 'center' }}>{i + 1}</span>}
              </div>
            );
          })}
          <div className="tp-f">[1–7] to switch modes</div>
        </div>
      )}
    </div>
  );
};
