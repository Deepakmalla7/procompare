import React from 'react';
import { DisplayData } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { Card, CardDesc } from '../ui/Card';
import { DarkBarChart } from '../charts/DarkBarChart';

export const XGIntelligence: React.FC<{ d: DisplayData }> = ({ d }) => {
  const { colors: c } = useTheme();
  const above = d.xgAbove ?? [0, 0];
  const eff = d.xgEff ?? [100, 100];
  return (
    <div className="split">
      <Card title="Expected vs Actual" icon="◇">
        <DarkBarChart cats={["'16", "'17", "'18", "'19", "'20"]} series={[
          { vals: [37, 45, 36, 31, 30], color: c.a },
          { vals: [30, 33, 28, 26, 24], color: c.a, hatch: true },
          { vals: [35, 44, 21, 31, 29], color: c.b },
          { vals: [28, 31, 22, 25, 21], color: c.b, hatch: true },
        ]} />
        <CardDesc>Solid bars = actual goals · hatched = xG baseline.{d.mr ? '' : ' (illustrative for non-thesis pairs)'}</CardDesc>
      </Card>
      <Card title="Finishing Mechanics" icon="⚙">
        <div className="gauge-row">
          <div className="statcircle a"><div className="n">+{above[0]}</div><div className="c">Goals above xG / season</div></div>
          <div className="statcircle b"><div className="n">+{above[1]}</div><div className="c">Goals above xG / season</div></div>
        </div>
        <div className="gauge-row" style={{ marginTop: 10 }}>
          <div className="statcircle a"><div className="n">{eff[0]}%</div><div className="c">Finishing efficiency</div></div>
          <div className="statcircle b"><div className="n">{eff[1]}%</div><div className="c">Finishing efficiency</div></div>
        </div>
        <CardDesc>PSxG analysis confirms Messi converts harder chances — not just easier positions.</CardDesc>
      </Card>
    </div>
  );
};
