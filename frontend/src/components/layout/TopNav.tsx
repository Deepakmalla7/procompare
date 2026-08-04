import React from 'react';
import { ActivePage } from '../../types';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

const TABS: { id: ActivePage; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'database', label: 'Database' },
  { id: 'methodology', label: 'Methodology' },
];

/** Sticky top bar: QG logo, page tabs, and the reading-mode switcher. */
export const TopNav: React.FC<{ activePage: ActivePage; onPageChange: (p: ActivePage) => void }> = ({ activePage, onPageChange }) => (
  <div className="topbar">
    <div className="logo">
      <span className="grid-ic"><i /><i /><i /><i /></span>
      <b>ProCompare</b>
    </div>
    <div className="topnav">
      {TABS.map((t) => (
        <button key={t.id} className={activePage === t.id ? 'on' : ''} onClick={() => onPageChange(t.id)}>{t.label}</button>
      ))}
      <ThemeSwitcher />
    </div>
  </div>
);
