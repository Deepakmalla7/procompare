import React from 'react';
import { DisplayData } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { lastName, rgba } from '../../utils/formatters';
import { Card, CardDesc } from '../ui/Card';
import { CircularGauge } from '../charts/CircularGauge';
import { DiamondRadar } from '../charts/DiamondRadar';

export const AttackingOutput: React.FC<{ d: DisplayData }> = ({ d }) => {
  const { colors: c } = useTheme();
  const xg = d.xgEff ?? [100, 100];
  return (
    <div className="split">
      <Card title="Scoring Efficiency" icon="⚡">
        <div className="gauge-row">
          <div className="gwrap"><CircularGauge value={d.goals90[0]} max={1.2} color={c.a} center={d.goals90[0].toFixed(3)} sub={`G/90 ${lastName(d.aName)}`} /></div>
          <div className="gwrap"><CircularGauge value={d.goals90[1]} max={1.2} color={c.b} center={d.goals90[1].toFixed(3)} sub={`G/90 ${lastName(d.bName)}`} /></div>
        </div>
        <div className="gauge-row" style={{ marginTop: 8 }}>
          <div className="gwrap"><CircularGauge value={d.assists90[0]} max={0.6} color={c.a} center={d.assists90[0].toFixed(3)} sub={`A/90 ${lastName(d.aName)}`} /></div>
          <div className="gwrap"><CircularGauge value={d.assists90[1]} max={0.6} color={c.b} center={d.assists90[1].toFixed(3)} sub={`A/90 ${lastName(d.bName)}`} /></div>
        </div>
        <CardDesc>Per-90 normalization eliminates career-length bias across the 161-game difference.</CardDesc>
      </Card>
      <Card title="Finishing Quality" icon="◇">
        <DiamondRadar axes={['GOALS', 'ASSISTS', 'xG', 'PSxG']} size={220} series={[
          { vals: [d.vec.b[0], d.vec.b[1], 0.85, 0.8], color: c.b, fill: rgba(c.b, 0.18) },
          { vals: [d.vec.a[0], d.vec.a[1], 0.95, 0.98], color: c.a, fill: rgba(c.a, 0.2) },
        ]} />
        <div className="gauge-row" style={{ marginTop: 6 }}>
          <div className="statcircle a"><div className="n">{xg[0]}%</div><div className="c">Efficiency</div></div>
          <div className="statcircle b"><div className="n">{xg[1]}%</div><div className="c">Efficiency</div></div>
        </div>
        <CardDesc>xG overperformance proves elite finishing beyond volume.</CardDesc>
      </Card>
    </div>
  );
};
