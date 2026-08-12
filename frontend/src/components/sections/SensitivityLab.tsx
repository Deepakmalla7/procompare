import React, { useState } from 'react';
import { DisplayData } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Slider } from '../ui/Slider';
import { CrossoverChart } from '../charts/CrossoverChart';

const VerdictCard: React.FC<{ sp: number }> = ({ sp }) => {
  const { colors: c } = useTheme();
  if (sp < 63) {
    const m = (0.805 - (0.805 - 0.5) * (sp / 63)).toFixed(3);
    const r = (0.195 + (0.5 - 0.195) * (sp / 63)).toFixed(3);
    return (
      <div style={{ textAlign: 'center', padding: 12 }}>
        <div className="head" style={{ fontSize: 26, fontWeight: 700, letterSpacing: '.12em', color: c.a }}>MESSI LEADS</div>
        <div className="mono" style={{ color: 'var(--ts)', marginTop: 6 }}>Score ~ {m} vs {r}</div>
        <div style={{ marginTop: 10 }}><Badge variant="ok">VERDICT: STABLE</Badge></div>
      </div>
    );
  }
  return (
    <div style={{ textAlign: 'center', padding: 12 }}>
      <div className="head" style={{ fontSize: 26, fontWeight: 700, letterSpacing: '.12em', color: c.b }}>RONALDO LEADS</div>
      <div className="mono" style={{ color: 'var(--ts)', marginTop: 6 }}>Only under extreme legacy weighting ({sp}%)</div>
      <div style={{ marginTop: 10 }}><Badge variant="warn">VERDICT: EXTREME WEIGHTS</Badge></div>
    </div>
  );
};

export const SensitivityLab: React.FC<{ d: DisplayData }> = ({ d }) => {
  const { colors: c } = useTheme();
  const [sp, setSp] = useState(typeof d.sens === 'number' ? d.sens : 63);
  return (
    <div className="split">
      <Card title="Weight Sensitivity Sweep" icon="🔬">
        <CrossoverChart sensPct={sp} />
        <div style={{ marginTop: 14 }}><Slider value={sp} onChange={setSp} /></div>
        <div className="mono" style={{ textAlign: 'center', marginTop: 8, fontSize: 12 }}>
          Weight on <span style={{ color: c.b }}>Intl + Longevity</span>: <b>{sp}%</b>
        </div>
      </Card>
      <Card title="Verdict Stability" icon="⚖">
        <VerdictCard sp={sp} />
        <div className="scenario">
          <div className="sc"><div className="t">Balanced Analyst</div><div className="v" style={{ color: c.a }}>Messi 0.805</div></div>
          <div className="sc"><div className="t">Goals Purist</div><div className="v" style={{ color: c.a }}>Messi leads</div></div>
          <div className="sc"><div className="t">Legacy Focused</div><div className="v" style={{ color: c.b }}>Ronaldo wins</div></div>
        </div>
      </Card>
    </div>
  );
};
