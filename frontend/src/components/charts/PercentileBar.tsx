import React from 'react';

/** Centre-out dual percentile bars (Player A grows left, Player B grows right). */
export const PercentileBar: React.FC<{ label: string; a: number; b: number }> = ({ label, a, b }) => (
  <>
    <div className="pct">
      <div className="baro la"><i style={{ width: `${a}%` }} /></div>
      <div className="lab">{label}</div>
      <div className="baro lb"><i style={{ width: `${b}%` }} /></div>
    </div>
    <div className="pct">
      <div className="num a">{a}</div>
      <div />
      <div className="num b">{b}</div>
    </div>
  </>
);
