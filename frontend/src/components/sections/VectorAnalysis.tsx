import React from 'react';
import { DisplayData } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { f3, lastName, rgba } from '../../utils/formatters';
import { RADAR_AXES } from '../../utils/calculations';
import { Card, CardDesc } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DiamondRadar } from '../charts/DiamondRadar';

export const VectorAnalysis: React.FC<{ d: DisplayData }> = ({ d }) => {
  const { colors: c } = useTheme();
  const metrics: { lbl: string; key: keyof DisplayData['dist'] }[] = [
    { lbl: 'Manhattan L1', key: 'manhattan' },
    { lbl: 'Euclidean L2', key: 'euclidean' },
    { lbl: 'Minkowski p=3', key: 'minkowski' },
    { lbl: 'Chebyshev L∞', key: 'chebyshev' },
  ];
  return (
    <div className="split">
      <Card title="6D Feature Vectors" icon="⬡">
        <DiamondRadar axes={RADAR_AXES} size={280} series={[
          { vals: [1, 1, 1, 1, 1, 1], color: c.tp, dash: true },
          { vals: d.vec.b, color: c.b, fill: rgba(c.b, 0.18) },
          { vals: d.vec.a, color: c.a, fill: rgba(c.a, 0.2) },
        ]} />
        <div className="mono" style={{ fontSize: 11, marginTop: 12, color: 'var(--tac)' }}>
          <div style={{ color: c.a }}>{lastName(d.aName)} [ {d.vec.a.map((v) => v.toFixed(3)).join(', ')} ]</div>
          <div style={{ color: c.b, marginTop: 4 }}>{lastName(d.bName)} [ {d.vec.b.map((v) => v.toFixed(3)).join(', ')} ]</div>
          <div style={{ color: 'var(--ts)', marginTop: 4 }}>IDEAL&nbsp;&nbsp; [ 1.000, 1.000, 1.000, 1.000, 1.000, 1.000 ]</div>
        </div>
      </Card>
      <Card title="Distance Metrics" icon="📐">
        <table className="dt">
          <thead><tr><th>Metric</th><th>{lastName(d.aName)}</th><th>{lastName(d.bName)}</th><th>Verdict</th></tr></thead>
          <tbody>
            {metrics.map((m) => {
              const a = d.dist[m.key][0], b = d.dist[m.key][1], aw = a < b;
              return (
                <tr key={m.key}>
                  <td>{m.lbl}</td>
                  <td className={aw ? 'va' : ''}>{a.toFixed(3)}</td>
                  <td className={!aw ? 'vb' : ''}>{b.toFixed(3)}</td>
                  <td>{aw ? <Badge variant="a">{lastName(d.aName)}</Badge> : <Badge variant="b">{lastName(d.bName)}</Badge>}</td>
                </tr>
              );
            })}
            <tr><td>Cosine sim</td><td colSpan={2} className="va" style={{ textAlign: 'center' }}>{f3(d.cosine)}</td><td>ALIGNED</td></tr>
            <tr><td>Pearson corr</td><td colSpan={2} style={{ textAlign: 'center', color: c.b }}>{f3(d.pearson)}</td><td>{d.pearson != null && d.pearson < 0 ? 'OPPOSITE' : '—'}</td></tr>
          </tbody>
        </table>
        <CardDesc><b>{lastName(d.aName)} is markedly closer to the ideal across ALL Minkowski-family metrics.</b></CardDesc>
      </Card>
    </div>
  );
};
