import React, { useRef, useState } from 'react';
import { useComparison } from '../context/ComparisonContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const HEAD = 'season,age,club,league,games,goals,assists,minutes,xg,xg_assisted,psxg,cl_goals,international_goals';
const SAMPLES: Record<string, string> = {
  messi: HEAD + '\n2011-2012,24,Barcelona,la-liga,37,50,16,3270,,,12,14\n2014-2015,27,Barcelona,la-liga,38,43,18,3312,,,10,7\n2018-2019,31,Barcelona,la-liga,34,36,13,2713,23.8,14.4,12,8',
  ronaldo: HEAD + '\n2011-2012,26,Real Madrid,la-liga,38,46,12,3373,,,10,7\n2014-2015,29,Real Madrid,la-liga,35,48,16,3084,,,10,5\n2018-2019,33,Juventus,serie-a,31,21,8,2688,22.2,4.6,6,3',
  mbappe: HEAD + '\n2018-2019,20,Paris S-G,ligue-1,29,33,7,2400,,,6,4\n2021-2022,23,Paris S-G,ligue-1,35,28,17,2900,,,6,1',
  haaland: HEAD + '\n2022-2023,22,Manchester City,premier-league,35,36,8,2769,,,12,0\n2023-2024,23,Manchester City,premier-league,31,27,5,2500,,,5,0',
};

const num = (x: string) => { const v = parseFloat(String(x).replace(/,/g, '')); return isNaN(v) ? 0 : v; };

function parseCSV(text: string): Record<string, string>[] | null {
  const lines = text.trim().split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return null;
  const head = lines[0].split(',').map((s) => s.trim().toLowerCase());
  return lines.slice(1).map((l) => {
    const cells = l.split(','); const o: Record<string, string> = {};
    head.forEach((h, i) => { o[h] = (cells[i] || '').trim(); });
    return o;
  });
}
function toVector(rows: Record<string, string>[]) {
  let G = 0, A = 0, MIN = 0, GM = 0, INT = 0, CL = 0, peak = 0; const sg: number[] = [];
  rows.forEach((r) => {
    const g = num(r.goals), a = num(r.assists), gm = num(r.games) || 1, mn = num(r.minutes);
    G += g; A += a; MIN += mn; GM += num(r.games); INT += num(r.international_goals); CL += num(r.cl_goals);
    sg.push(g); const c = (g + a) / gm; if (c > peak) peak = c;
  });
  const n90 = MIN > 0 ? MIN / 90 : 1, games = GM || 1;
  return { vec: [G / n90, A / n90, INT / games, peak, GM, CL / games], sg, seasons: rows.length };
}
function download(name: string, text: string) {
  const b = new Blob([text], { type: 'text/csv' }); const u = URL.createObjectURL(b);
  const a = document.createElement('a'); a.href = u; a.download = name; a.click(); URL.revokeObjectURL(u);
}
const readFile = (input: HTMLInputElement | null): Promise<string> => new Promise((res, rej) => {
  const f = input?.files?.[0]; if (!f) { rej('pick a file'); return; }
  const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = () => rej('read error'); r.readAsText(f);
});

export const DatabasePage: React.FC<{ onLoaded: () => void }> = ({ onLoaded }) => {
  const { runVectors } = useComparison();
  const aRef = useRef<HTMLInputElement>(null);
  const bRef = useRef<HTMLInputElement>(null);
  const [nameA, setNameA] = useState('Player A');
  const [nameB, setNameB] = useState('Player B');
  const [msg, setMsg] = useState<{ text: string; err?: boolean }>({ text: '' });

  const runCsv = async () => {
    setMsg({ text: 'Reading…' });
    try {
      const [ta, tb] = await Promise.all([readFile(aRef.current), readFile(bRef.current)]);
      const ra = parseCSV(ta), rb = parseCSV(tb);
      if (!ra || !rb) { setMsg({ text: 'Could not parse a CSV.', err: true }); return; }
      const va = toVector(ra), vb = toVector(rb);
      await runVectors({
        vec_a: va.vec, vec_b: vb.vec, name_a: nameA, name_b: nameB,
        label_a: `${va.seasons} rows`, label_b: `${vb.seasons} rows`,
        season_goals_a: va.sg, season_goals_b: vb.sg, seasons_a: va.seasons, seasons_b: vb.seasons,
      });
      onLoaded();
    } catch (e) {
      setMsg({ text: `Failed: ${e}`, err: true });
    }
  };

  return (
    <>
      <div className="sec-title"><span className="ic">▢</span>Player Data Upload</div>
      <Card>
        <p className="mono" style={{ color: 'var(--ts)', fontSize: 12, marginTop: 0 }}>
          Upload a career CSV per player to run the full framework on any two forwards. Columns: {HEAD}.
        </p>
        <div className="split" style={{ marginTop: 8 }}>
          <div className="drop a">
            <div className="ic" style={{ color: 'var(--a)' }}>⬆</div>
            <input className="pill" placeholder="Player A name" value={nameA} onChange={(e) => setNameA(e.target.value)} style={{ margin: '8px auto', display: 'block' }} />
            <input type="file" accept=".csv" ref={aRef} />
          </div>
          <div className="drop b">
            <div className="ic" style={{ color: 'var(--b)' }}>⬆</div>
            <input className="pill" placeholder="Player B name" value={nameB} onChange={(e) => setNameB(e.target.value)} style={{ margin: '8px auto', display: 'block' }} />
            <input type="file" accept=".csv" ref={bRef} />
          </div>
        </div>
        <Button variant="full" onClick={runCsv}>Run Analysis</Button>
        <div className="dlrow">
          <Button variant="mini" onClick={() => download('template.csv', HEAD)}>CSV Template</Button>
          <Button variant="mini" onClick={() => download('messi_sample.csv', SAMPLES.messi)}>Messi Sample</Button>
          <Button variant="mini" onClick={() => download('ronaldo_sample.csv', SAMPLES.ronaldo)}>Ronaldo Sample</Button>
          <Button variant="mini" onClick={() => download('mbappe_sample.csv', SAMPLES.mbappe)}>Mbappé Sample</Button>
          <Button variant="mini" onClick={() => download('haaland_sample.csv', SAMPLES.haaland)}>Haaland Sample</Button>
        </div>
        <div className="mono" style={{ marginTop: 10, fontSize: 12, color: msg.err ? '#ff6b6b' : 'var(--ts)' }}>{msg.text}</div>
      </Card>
    </>
  );
};
