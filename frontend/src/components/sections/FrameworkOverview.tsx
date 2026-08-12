import React from 'react';
import { DisplayData } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { rgba } from '../../utils/formatters';
import { RADAR_AXES } from '../../utils/calculations';
import { Card, CardDesc } from '../ui/Card';
import { DiamondRadar } from '../charts/DiamondRadar';
import { DarkBarChart } from '../charts/DarkBarChart';
import { PlayerCard } from '../player/PlayerCard';

export const FrameworkOverview: React.FC<{ d: DisplayData }> = ({ d }) => {
  const { colors: c } = useTheme();
  return (
    <div className="split">
      <Card title="The Baseline" icon="↗" right="ⓘ">
        <div className="gauge-row">
          <PlayerCard name={d.aName} score={d.topsis[0]} side="a" />
          <PlayerCard name={d.bName} score={d.topsis[1]} side="b" />
        </div>
        <CardDesc>Multi-criteria TOPSIS analysis across 6 weighted performance dimensions — AHP consistency ratio CR = {d.cr.toFixed(2)}.</CardDesc>
      </Card>
      <Card title="Framework Verdict" icon="⚡">
        <div className="split" style={{ gap: 12 }}>
          <div>
            <DiamondRadar axes={RADAR_AXES} size={230} series={[
              { vals: d.vec.b, color: c.b, fill: rgba(c.b, 0.18) },
              { vals: d.vec.a, color: c.a, fill: rgba(c.a, 0.2) },
            ]} />
          </div>
          <div>
            <DarkBarChart cats={['Career', 'Peak', 'Present']} series={[
              { vals: [d.topsis[0], 0.95, 0.82], color: c.a },
              { vals: [d.topsis[1], 0.7, 0.6], color: c.b },
            ]} />
          </div>
        </div>
        <CardDesc>Direct vector comparison across 6 dimensions with sensitivity threshold at {d.sens}%.</CardDesc>
      </Card>
    </div>
  );
};
