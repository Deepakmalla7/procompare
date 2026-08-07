import React, { useState } from 'react';
import { DisplayData } from '../../types';
import { lastName, initials } from '../../utils/formatters';

const SimGrid: React.FC<{ list: Array<[string, string, number, string]> }> = ({ list }) => (
  <div className="simrow">
    {list.map((p, i) => (
      <div className="simcard" key={i}>
        <div className="ph initials a" style={{ background: 'radial-gradient(circle,var(--ap),transparent)' }}>{initials(p[0])}</div>
        <div className="nm">{p[0]}</div>
        <div className="era">{p[1]}</div>
        <div className="sbar"><i style={{ width: `${p[2]}%` }} /></div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--a)', marginTop: 3 }}>{(p[2] / 100).toFixed(2)} cosine</div>
        <div className="why">{p[3]}</div>
      </div>
    ))}
  </div>
);

export const SimilarPlayers: React.FC<{ d: DisplayData }> = ({ d }) => {
  const [side, setSide] = useState<'a' | 'b'>('a');
  const list = side === 'a' ? d.similarA : d.similarB;
  return (
    <div className="panel">
      <h3>⚯ Similar Players</h3>
      <div className="toggle" style={{ marginBottom: 14 }}>
        <button className={side === 'a' ? 'on' : ''} onClick={() => setSide('a')}>Similar to {lastName(d.aName)}</button>
        <button className={side === 'b' ? 'on' : ''} onClick={() => setSide('b')}>Similar to {lastName(d.bName)}</button>
      </div>
      {list && list.length ? <SimGrid list={list} /> : <div className="loading">Similar-player reference set is a Messi/Ronaldo case-study view.</div>}
      <div className="desc">Cosine similarity of the 6-D profile vs a reference set of elite forwards — proving the framework scales across eras.</div>
    </div>
  );
};
