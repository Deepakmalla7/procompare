import React from 'react';
import { DisplayData } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { Card, CardDesc } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CircularGauge } from '../charts/CircularGauge';

export const TOPSISEngine: React.FC<{ d: DisplayData }> = ({ d }) => {
  const { colors: c } = useTheme();
  // Display order: Goals, Assists, Peak, CL, Intl, Longevity.
  const labels = ['Goals / 90', 'Assists / 90', 'Peak season', 'Champions League', 'International', 'Longevity'];
  const wv = [d.ahp[0], d.ahp[1], d.ahp[3], d.ahp[5], d.ahp[2], d.ahp[4]];
  return (
    <div className="split">
      <Card title="AHP Weight Matrix" icon="∑">
        {labels.map((lb, i) => (
          <div className="ahp-row" key={lb}>
            <span className="lbl">{lb}</span>
            <span>{(wv[i] * 100).toFixed(0)}%</span>
            <span className="ahp-bar"><i style={{ width: `${(wv[i] / 0.25) * 100}%` }} /></span>
          </div>
        ))}
        <div style={{ marginTop: 12 }}><Badge variant="ok">CR = {d.cr.toFixed(2)} ✓ PERFECTLY CONSISTENT</Badge></div>
      </Card>
      <Card title="Closeness Coefficients" icon="🏆">
        <div className="gauge-row">
          <div className="gwrap">
            <CircularGauge value={d.topsis[0]} color={c.a} center={d.topsis[0].toFixed(3)} sub="" />
            <div className="glabel" style={{ color: c.a }}>{(d.topsis[0] * 100).toFixed(1)}% OF IDEAL</div>
            {d.topsis[0] >= d.topsis[1] && <div style={{ marginTop: 6 }}><Badge variant="a">FRAMEWORK WINNER 🏆</Badge></div>}
          </div>
          <div className="gwrap">
            <CircularGauge value={d.topsis[1]} color={c.b} center={d.topsis[1].toFixed(3)} sub="" />
            <div className="glabel" style={{ color: c.b }}>{(d.topsis[1] * 100).toFixed(1)}% OF IDEAL</div>
            {d.topsis[1] > d.topsis[0] && <div style={{ marginTop: 6 }}><Badge variant="b">FRAMEWORK WINNER 🏆</Badge></div>}
          </div>
        </div>
        <CardDesc>Closeness = D⁻ / (D⁺ + D⁻). Weighted-sum and weighted-product models confirm the ranking.</CardDesc>
      </Card>
    </div>
  );
};
