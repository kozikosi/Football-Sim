import { FOCUS_LIST, halftimeOptions, type FocusState } from '../state';
import { focusById } from '../engine-contract/index.ts';

export function Setup({ s, effective, onKickoff }: {
  s: FocusState;
  effective: string;
  onKickoff: () => void;
}) {
  return (
    <section data-testid="setup">
      <h2>1 · Pre-game</h2>
      <label className="manage">
        <input
          type="checkbox"
          checked={s.manageOn}
          data-testid="manage-toggle"
          onChange={(e) => s.setManageOn(e.target.checked)}
        />
        Manage focus (off = auto — the engine picks, no halftime prompt)
      </label>
      {s.manageOn ? (
        <div className="cards" role="radiogroup" aria-label="offensive focus">
          {FOCUS_LIST.map((f) => (
            <button
              key={f.id}
              className={`card${s.picked === f.id ? ' selected' : ''}`}
              data-testid={`focus-${f.id}`}
              onClick={() => s.setPicked(f.id)}
            >
              <strong>{f.label}</strong>
              <span>{f.blurb}</span>
            </button>
          ))}
        </div>
      ) : (
        <p data-testid="auto-pick">
          Auto mode — the engine picks: <strong>{focusById(effective).label}</strong>
        </p>
      )}
      <button className="primary" onClick={onKickoff} data-testid="kickoff">Kickoff</button>
    </section>
  );
}

export function Halftime({ s, effective, onChange, onFinish }: {
  s: FocusState;
  effective: string;
  onChange: (id: string) => void;
  onFinish: () => void;
}) {
  const options = halftimeOptions();
  const offer = s.manageOn && !s.halftimeUsed && s.phase === 'halftime' && options.includes(effective);
  return (
    <section data-testid="halftime">
      <h2>2 · Halftime</h2>
      {offer ? (
        <>
          <p>
            One change available. Current: <strong>{focusById(effective).label}</strong>.
          </p>
          <div className="cards">
            {options.map((id) => (
              <button
                key={id}
                className={`card${id === effective ? ' selected' : ''}`}
                data-testid={`halftime-${id}`}
                onClick={() => onChange(id)}
              >
                {focusById(id).label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p data-testid="no-halftime">
          Auto mode — no halftime prompt{s.halftimeUsed ? ' (change used)' : ''}.
        </p>
      )}
      {s.note && <p className="note">{s.note}</p>}
      <button className="primary" onClick={onFinish} data-testid="continue">Continue</button>
    </section>
  );
}
