import React from 'react';

/** Themed range slider (track shows the 63% split via CSS). */
export const Slider: React.FC<{ value: number; onChange: (v: number) => void; min?: number; max?: number }>
  = ({ value, onChange, min = 0, max = 100 }) => (
    <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)} />
  );
