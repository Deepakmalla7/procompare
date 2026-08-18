import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { Button } from '../components/ui/Button';

const STAGES: [string, string, string, string][] = [
  ['1', '6-D Vectors', 'Per-90 + Z-score normalisation → six-dimensional feature vector.', 'x = [g90, a90, intl, peak, lon, cl]'],
  ['2', 'Max-normalisation', 'Scale each dimension by its max → ideal vector = 1.', 'x̂ᵢ = xᵢ / max(xᵢ)'],
  ['3', 'Distance metrics', 'Minkowski family + cosine/Pearson to the ideal.', 'dₚ = (Σ|1−x̂ᵢ|ᵖ)^(1/p)'],
  ['4', 'AHP weights', 'Pairwise priorities → weights, consistency ratio.', 'CR = CI / RI = 0.00'],
  ['5', 'TOPSIS', 'Closeness to the ideal vs anti-ideal.', 'Cᵢ = D⁻ / (D⁺ + D⁻)'],
  ['6', 'Sensitivity', 'Weight sweep → reversal threshold.', 'flip at 63%'],
];
const SCALE: [string, string, string][] = [
  ['Mbappé vs Haaland', 'Kylian Mbappé', 'Erling Haaland'],
  ['Salah vs Lewandowski', 'Mohamed Salah', 'Robert Lewandowski'],
  ['Henry vs Ibrahimović', 'Thierry Henry', 'Zlatan Ibrahimović'],
  ['Custom Upload', '', ''],
];

export const MethodologyPage: React.FC<{ onLoaded: () => void; onUpload: () => void }> = ({ onLoaded, onUpload }) => {
  const { setPlayerA, setPlayerB, setMode } = useComparison();
  const load = (a: string, b: string) => { setMode('career'); setPlayerA(a); setPlayerB(b); onLoaded(); };
  return (
    <>
      <div className="sec-title"><span className="ic">◈</span>Analytical Framework <span style={{ color: 'var(--ts)', fontWeight: 400, fontSize: 12, marginLeft: 8 }}>6-Stage Pipeline Overview</span></div>
      <div className="stageflow">
        {STAGES.map((s) => (
          <div className="stagecard" key={s[0]}>
            <div className="n">{s[0]}</div>
            <div className="t">{s[1]}</div>
            <div className="d">{s[2]}</div>
            <div className="f">{s[3]}</div>
          </div>
        ))}
      </div>
      <div className="sec-title" style={{ marginTop: 24 }}><span className="ic">⚯</span>Scalability</div>
      <div className="split" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        {SCALE.map((c) => (
          <div className="panel" style={{ textAlign: 'center' }} key={c[0]}>
            <div className="head" style={{ letterSpacing: '.1em', color: 'var(--tp)', fontWeight: 600 }}>{c[0]}</div>
            {c[1]
              ? <Button variant="mini" style={{ marginTop: 10 }} onClick={() => load(c[1], c[2])}>Load</Button>
              : <Button variant="mini" style={{ marginTop: 10 }} onClick={onUpload}>Upload CSV</Button>}
          </div>
        ))}
      </div>
      <div className="footer">
        <b>A Multi-Dimensional Framework for Objective Player Comparison in Professional Football:</b> Integrating Performance Metrics, Statistical Profiling, and Machine Learning<br />
        <b>BSc Computing Thesis</b> · Softwarica College of IT &amp; E-Commerce<br />
        In partnership with Coventry University · Prepared by <b>Dipak Malla</b> (ID 14810866) · Module Leader <b>Manoj Shrestha</b><br />
        Photos: Wikimedia Commons (CC)
      </div>
    </>
  );
};
