import React from 'react';
import { DisplayData } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { ageCurveSvg } from '../../utils/calculations';
import { Card, CardDesc } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SvgChart } from '../charts/SvgChart';

export const CareerArc: React.FC<{ d: DisplayData }> = ({ d }) => {
  const { colors } = useTheme();
  return (
    <div className="split">
      <Card title="Age Curve Trajectory" icon="📈">
        <SvgChart markup={ageCurveSvg(colors)} />
        <CardDesc>Career trajectory reveals Messi leads 3 of 4 age brackets.</CardDesc>
      </Card>
      <Card title="Bracket Breakdown" icon="▦">
        {d.brackets ? (
          <div className="grid4">
            {d.brackets.map((b, i) => (
              <div className="minicard" key={i}>
                <Badge variant={b[3]}>{b[3] === 'a' ? 'MESSI LEADS' : 'RONALDO LEADS'}</Badge>
                <div className="v" style={{ marginTop: 8 }}>{b[1].toFixed(3)} <span style={{ color: 'var(--ts)' }}>vs</span> {b[2].toFixed(3)}</div>
                <div className="adv">{b[4]} advantage · Age {b[0]}</div>
                <div className="note">{b[5]}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loading">Age-bracket analysis is a thesis case-study view.</div>
        )}
      </Card>
    </div>
  );
};
