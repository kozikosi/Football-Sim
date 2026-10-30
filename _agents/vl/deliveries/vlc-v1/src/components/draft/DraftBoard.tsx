// VLC V1 — Draft board
// w38 lessons: CB4 slot (32 rounds), no "Value here", flex only at -2/-4 until round 20,
// pick tags 1-2 words, TOP in gold, names uncoloured

import { useEngine } from '../../hooks/useEngine';
import type { Player, SlotKey } from '../../types/engine';

const CANDIDATES: Player[] = [
  { name: 'Caleb Williams', pos: 'QB', team: 'CHI', ovr: 92 },
  { name: 'Drake Maye', pos: 'QB', team: 'NE', ovr: 88 },
  { name: 'Malik Nabers', pos: 'WR', team: 'NYG', ovr: 86 },
  { name: 'Brian Thomas Jr.', pos: 'WR', team: 'JAX', ovr: 84 },
  { name: 'Cooper Kupp', pos: 'WR', team: 'LAR', ovr: 81 },
  { name: 'Bijan Robinson', pos: 'RB', team: 'ATL', ovr: 88 },
  { name: 'Trey McBride', pos: 'TE', team: 'ARI', ovr: 85 },
  { name: 'Justin Simmons', pos: 'FS', team: 'DEN', ovr: 81 },
];

const SLOTS: SlotKey[] = ['QB', 'RB1', 'WR1', 'WR2', 'TE1', 'OT1', 'OG1', 'C', 'DE1', 'CB1', 'FS'];

export default function DraftBoard() {
  const { roster, draftPick, adviseLineup } = useEngine();
  const advice = adviseLineup();

  return (
    <section className="draft-screen">
      <div className="board-header">
        <h2 className="screen-title">Draft Board</h2>
        <p className="board-sub">Round 1 · Pick 31 · {selectedTeam()}</p>
        <div className="advice-strip">
          {advice.slice(0, 3).map((a) => (
            <span key={a.slot} className="advice-chip">
              {a.slot}: {a.suggested?.name} (+{a.delta})
            </span>
          ))}
        </div>
      </div>

      <div className="draft-grid">
        {CANDIDATES.map((p) => (
          <div
            key={p.name}
            className={`pick-card ${isDrafted(p) ? 'drafted' : ''} ${isBest(p) ? 'best' : ''}`}
            onClick={() => draftPick('QB', p)}
          >
            <div className="pick-round">R1 · #{getPick(p)}</div>
            <div className="pick-name">{p.name}</div>
            <div className="pick-pos">{p.pos} · {p.team}</div>
            <div className="pick-ovr">{p.ovr} OVR</div>
            <span className={`pick-tag ${isBest(p) ? 'best' : 'ok'}`}>
              {isBest(p) ? 'Best available' : 'OK'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function selectedTeam(): string {
  try {
    const s = localStorage.getItem('vlc-v1-theme');
    if (s) return JSON.parse(s).teamId ?? 'Kansas City';
  } catch {}
  return 'Kansas City';
}

function isDrafted(p: Player): boolean {
  try {
    const r = JSON.parse(localStorage.getItem('vlc-v1-state') || '{}').roster || [];
    return r.some((x: Player) => x.name === p.name);
  } catch {
    return false;
  }
}

function isBest(p: Player): boolean {
  return p.ovr >= 90;
}

function getPick(p: Player): number {
  return 31 + CANDIDATES.indexOf(p);
}
