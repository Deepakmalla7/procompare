import React from 'react';
import { useComparison } from '../../context/ComparisonContext';
import { PLAYERS, ROLES, SEASONS } from '../../utils/calculations';
import { PlayerPhoto } from './PlayerPhoto';

/** The "PLAYER A VS PLAYER B" hero with photos, selectors, and Run Analysis. */
export const PlayerHero: React.FC = () => {
  const { playerA, playerB, mode, season, setPlayerA, setPlayerB, setMode, setSeason, run } = useComparison();
  const roleA = ROLES[playerA] || 'PLAYER A';
  const roleB = ROLES[playerB] || 'PLAYER B';

  return (
    <div className="hero">
      <div className="pl a">
        <div><PlayerPhoto name={playerA} side="a" /></div>
        <div className="nm">{playerA.toUpperCase()}</div>
        <div className="role">{roleA}</div>
      </div>

      <div className="vs-mid">
        <div className="vs">VS</div>
        <div className="toggle">
          <button className={mode === 'career' ? 'on' : ''} onClick={() => setMode('career')}>Career</button>
          <button className={mode === 'season' ? 'on' : ''} onClick={() => setMode('season')}>Season</button>
        </div>
        {mode === 'season' && (
          <select className="pill" value={season} onChange={(e) => setSeason(e.target.value)}>
            {SEASONS.map((s) => <option key={s}>{s}</option>)}
          </select>
        )}
        <select className="pill" value={playerA} onChange={(e) => setPlayerA(e.target.value)}>
          {PLAYERS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select className="pill" value={playerB} onChange={(e) => setPlayerB(e.target.value)}>
          {PLAYERS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <button className="btn" onClick={() => run()}>Run Analysis</button>
      </div>

      <div className="pl b">
        <div><PlayerPhoto name={playerB} side="b" /></div>
        <div className="nm">{playerB.toUpperCase()}</div>
        <div className="role">{roleB}</div>
      </div>
    </div>
  );
};
