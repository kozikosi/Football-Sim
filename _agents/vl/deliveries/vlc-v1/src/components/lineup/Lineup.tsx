// VLC V1 — Lineup screen
// w38 lesson: lineups less boxy, dynamic floaty; QB flexes only to FS at −10

import { useEngine } from '../../hooks/useEngine';
import type { SlotKey } from '../../types/engine';

const SLOTS: { key: SlotKey; label: string }[] = [
  { key: 'QB', label: 'Quarterback' },
  { key: 'RB1', label: 'Running Back 1' },
  { key: 'WR1', label: 'Wide Receiver 1' },
  { key: 'WR2', label: 'Wide Receiver 2' },
  { key: 'TE1', label: 'Tight End 1' },
  { key: 'FS', label: 'Free Safety (Flex)' },
];

export default function Lineup() {
  const { lineup, setLineup } = useEngine();

  return (
    <section className="lineup-screen">
      <div className="screen-header">
        <h2 className="screen-title">Lineup</h2>
        <p className="screen-sub">Set your starters · QB may flex only to FS at −10 wins</p>
      </div>

      <div className="slot-grid">
        {SLOTS.map(({ key, label }) => {
          const p = lineup[key];
          const isFlex = key === 'FS';
          return (
            <div
              key={key}
              className={`slot-card ${p ? 'filled' : 'empty'} ${isFlex && p ? 'flexed' : ''}`}
            >
              <div className="slot-label">{label}</div>
              {p ? (
                <>
                  <div className="slot-name">{p.name}</div>
                  <div className="slot-ovr">{p.ovr} OVR</div>
                  {isFlex && (
                    <div className="slot-hint">Flex → −10 wins</div>
                  )}
                </>
              ) : (
                <div className="slot-empty">Empty</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
