import React from 'react';
import { SECTIONS } from '../../utils/calculations';

/** Left analytical-sectors navigation + engine-version badge. */
export const Sidebar: React.FC<{ activeSection: string; onSectionChange: (id: string) => void }> = ({ activeSection, onSectionChange }) => (
  <aside className="sidebar">
    <div className="head-lbl">ANALYTICAL SECTORS</div>
    <div className="sub-lbl">Deep Dive Metrics</div>
    <div>
      {SECTIONS.map((s) => (
        <div key={s.id} className={`navitem${activeSection === s.id ? ' on' : ''}`} onClick={() => onSectionChange(s.id)}>
          <span className="ic">{s.icon}</span>{s.label}
        </div>
      ))}
    </div>
    <div className="spacer" />
    <div className="engine">
      <div className="v1"><span className="dot" />Engine Version 4.2</div>
      <div className="v2">THESIS BUILD 2026</div>
    </div>
  </aside>
);
