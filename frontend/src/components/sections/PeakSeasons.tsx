import React from 'react';
import { DisplayData } from '../../types';
import { Card, CardDesc } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { GumbelCurve } from '../charts/GumbelCurve';

export const PeakSeasons: React.FC<{ d: DisplayData }> = ({ d }) => (
  <div className="split">
    <Card title="Gumbel Distribution" icon="⛰">
      <GumbelCurve />
      <CardDesc>Gumbel EVT correctly models peak-season probability vs the Normal distribution.</CardDesc>
    </Card>
    <Card title="Peak Season Table" icon="▤" right={<Badge variant="a">MESSI: 6 OF TOP 10</Badge>}>
      {d.peaks ? (
        <table className="dt">
          <thead><tr><th>Rank</th><th>Player</th><th>Season</th><th>G</th><th>A</th><th>C/G</th></tr></thead>
          <tbody>
            {d.peaks.map((p, i) => (
              <tr key={i} className={p[6] === 'a' ? 'rowA' : 'rowB'}>
                <td>{p[0]}</td><td>{p[1]}</td><td>{p[2]}</td><td>{p[3]}</td><td>{p[4]}</td><td>{p[5].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="loading">Peak-season leaderboard is a thesis case-study view.</div>
      )}
    </Card>
  </div>
);
