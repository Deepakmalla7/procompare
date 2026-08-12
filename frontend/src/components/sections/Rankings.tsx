import React from 'react';
import { DisplayData } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { lastName } from '../../utils/formatters';
import { Card } from '../ui/Card';
import { PercentileBar } from '../charts/PercentileBar';

export const Rankings: React.FC<{ d: DisplayData }> = ({ d }) => {
  const { colors: c } = useTheme();
  const pa = d.pctl?.a ?? d.vec.a.map((v) => Math.round(40 + v * 59));
  const pb = d.pctl?.b ?? d.vec.b.map((v) => Math.round(40 + v * 59));
  const labels = ['Goals/90', 'Assists/90', 'Peak', 'CL', 'Intl', 'Longevity'];
  return (
    <div className="split">
      <Card title="Percentile Position" icon="▚">
        <div className="gauge-row">
          <div className="gwrap">
            <div className="statcircle a"><div className="n">{pa[0]}th</div><div className="c">Percentile overall</div></div>
            <div className="glabel" style={{ color: c.a }}>{lastName(d.aName)} · TOP 1%</div>
          </div>
          <div className="gwrap">
            <div className="statcircle b"><div className="n">{pb[0]}th</div><div className="c">Percentile overall</div></div>
            <div className="glabel" style={{ color: c.b }}>{lastName(d.bName)} · TOP 3%</div>
          </div>
        </div>
      </Card>
      <Card title="Metric Percentiles" icon="▦">
        {labels.map((lb, i) => <PercentileBar key={lb} label={lb} a={pa[i]} b={pb[i]} />)}
      </Card>
    </div>
  );
};
