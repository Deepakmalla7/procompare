import React from 'react';
import { motion } from 'framer-motion';
import { DisplayData } from '../types';
import { useComparison } from '../context/ComparisonContext';
import { SECTIONS } from '../utils/calculations';
import { PlayerHero } from '../components/player/PlayerHero';
import { FrameworkOverview } from '../components/sections/FrameworkOverview';
import { AttackingOutput } from '../components/sections/AttackingOutput';
import { XGIntelligence } from '../components/sections/XGIntelligence';
import { PeakSeasons } from '../components/sections/PeakSeasons';
import { CareerArc } from '../components/sections/CareerArc';
import { VectorAnalysis } from '../components/sections/VectorAnalysis';
import { TOPSISEngine } from '../components/sections/TOPSISEngine';
import { SensitivityLab } from '../components/sections/SensitivityLab';
import { Rankings } from '../components/sections/Rankings';
import { SimilarPlayers } from '../components/sections/SimilarPlayers';

const SECTION_MAP: Record<string, React.FC<{ d: DisplayData }>> = {
  overview: FrameworkOverview, attacking: AttackingOutput, xg: XGIntelligence, peaks: PeakSeasons,
  career: CareerArc, vectors: VectorAnalysis, topsis: TOPSISEngine, sensitivity: SensitivityLab,
  rankings: Rankings, similar: SimilarPlayers,
};

export const DashboardPage: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const { data, loading, error } = useComparison();
  const meta = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];
  const Section = SECTION_MAP[activeSection] || FrameworkOverview;
  return (
    <>
      <PlayerHero />
      <div className="sec-title"><span className="ic">{meta.icon}</span>{meta.label}</div>
      {loading && <div className="loading">Computing the framework…</div>}
      {error && <div className="loading" style={{ color: '#ff6b6b' }}>{error}</div>}
      {!loading && data && (
        <motion.div key={activeSection + data.aName + data.bName} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Section d={data} />
        </motion.div>
      )}
    </>
  );
};
