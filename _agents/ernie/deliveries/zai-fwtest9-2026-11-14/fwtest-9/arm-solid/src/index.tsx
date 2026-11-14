// arm-solid — the same one-screen "Offensive focus" feature in raw SolidJS idiom.
// Every screen shows the contract through Solid signals (components re-render,
// they don't recompute). Same data-testids as the other arms.
import { For, Show } from 'solid-js';
import { render } from 'solid-js/web';
import {
  state, TEAM_SLOTS, FOCUS_LIST, VERSION_TAG, effectiveFocus, board, kickoff,
  halftimeOptions, changeFocusAtHalftime, finish, arrowFor,
} from './lib/state';
import { focusById } from './engine-contract/index.ts';
import './app.css';

const label = (id: string) => focusById(id).label;

function App() {
  return (
    <main>
      <h1>Framework Test — Offensive Focus <span class="tag">Solid · focus {VERSION_TAG}</span></h1>

      <section data-testid="setup">
        <h2>1 · Pre-game</h2>
        <label class="manage">
          <input type="checkbox" data-testid="manage-toggle" checked={state.manageOn()} onChange={() => state.setManageOn(!state.manageOn())} />
          Manage focus (off = auto — the engine picks, no halftime prompt)
        </label>
        <Show when={state.manageOn()}>
          <div class="cards" role="radiogroup" aria-label="offensive focus">
            <For each={FOCUS_LIST}>{(f) => (
              <button
                class={`card${state.picked() === f.id ? ' selected' : ''}`}
                data-testid={`focus-${f.id}`}
                onClick={() => state.setPicked(f.id)}
              >
                <strong>{f.label}</strong>
                <span>{f.blurb}</span>
              </button>
            )}</For>
          </div>
        </Show>
        <Show when={!state.manageOn()}>
          <p data-testid="auto-pick">Auto mode — the engine picks: <strong>{label(effectiveFocus())}</strong></p>
        </Show>
        <button class="primary" onClick={kickoff} data-testid="kickoff">Kickoff</button>
      </section>

      <Show when={state.phase() !== 'pregame'}>
        <section data-testid="halftime">
          <h2>2 · Halftime</h2>
          <Show when={state.manageOn() && !halftimeDoneAlready()}
            fallback={
              <p data-testid="no-halftime">Auto mode — no halftime prompt{state.halftimeUsed() ? ' (change used)' : ''}.</p>
            }
          >
            <p>One change available. Current: <strong>{label(effectiveFocus())}</strong>.</p>
            <div class="cards">
              <For each={halftimeOptions()}>{(id) => (
                <button
                  class={`card${id === effectiveFocus() ? ' selected' : ''}`}
                  data-testid={`halftime-${id}`}
                  onClick={() => changeFocusAtHalftime(id)}
                >{label(id)}</button>
              )}</For>
            </div>
          </Show>
          <Show when={state.note()}>
            <p class="note">{state.note()}</p>
          </Show>
          <button class="primary" onClick={finish} data-testid="continue">Continue</button>
        </section>
      </Show>

      <section data-testid="board">
        <h2>The draft board <span class="tag">focus: {label(effectiveFocus())}</span></h2>
        <p class="law">Wins are the static truth — the focus moves Priority only.</p>
        <table>
          <thead><tr><th>Slot</th><th>OVR</th><th>Wins</th><th>Priority</th><th>Form</th></tr></thead>
          <tbody>
            <For each={board()}>{(r) => (
              <tr data-testid={`row-${r.slot}`}>
                <td>{r.slot}</td>
                <td>{TEAM_SLOTS[r.slot]}</td>
                <td>{r.wins.toFixed(2)}</td>
                <td class="priority" data-testid={`priority-${r.slot}`}>{r.priority}</td>
                <td>
                  {arrowFor(r.slot)
                    ? <span class={`arrow ${arrowFor(r.slot)}`} title={arrowFor(r.slot)} aria-label={`form: ${arrowFor(r.slot)}`} />
                    : null}
                </td>
              </tr>
            )}</For>
          </tbody>
        </table>
      </section>

      <Show when={state.sim()}>
        {(() => {
          const s = state.sim()!;
          return (
            <section data-testid="game">
              <h2>3 · The game</h2>
              <p class="score" data-testid="score">
                Home <strong>{s.result.homeScore}</strong> — <strong>{s.result.awayScore}</strong> Away
                <span class="tag">Q4-start diff {s.q4StartDiff}</span>
              </p>
              <Show when={s.focusLog.length} fallback={<p data-testid="no-automatics">No automatics fired (Q4-start diff {s.q4StartDiff}).</p>}>
                <h3>4th-quarter automatics (fired)</h3>
                <ul data-testid="fired">
                  <For each={s.focusLog}>{(d) => (
                    <li>
                      <strong>{d.label}</strong> — {d.detail}
                      <Show when={!d.appliedInSim}><span class="tag">reported to the engine layer</span></Show>
                    </li>
                  )}</For>
                </ul>
                <Show when={s.focusLog.some((d) => d.key === 'strat-override') && focusById(effectiveFocus()).offPlan.strat !== 'pass'}>
                  <p class="note" data-testid="precedence">
                    Precedence: the user's focus (<strong>{label(effectiveFocus())}</strong>) stays selected; the
                    automatic's tendency applies on top for the overridden plan. The user is never silently re-picked.
                  </p>
                </Show>
              </Show>
              <h3>Box score</h3>
              <table class="box">
                <thead><tr><th></th><th>Rush yds</th><th>Pass yds</th><th>Plays</th><th>Give</th><th>Take</th><th>Sacks</th></tr></thead>
                <tbody>
                  <tr><th>Home</th><td>{s.result.stats.home.rush}</td><td>{s.result.stats.home.pass}</td><td>{s.result.stats.home.plays}</td><td>{s.result.stats.home.giveaways}</td><td>{s.result.stats.home.takeaways}</td><td>{s.result.stats.home.sacksTaken}</td></tr>
                  <tr><th>Away</th><td>{s.result.stats.away.rush}</td><td>{s.result.stats.away.pass}</td><td>{s.result.stats.away.plays}</td><td>{s.result.stats.away.giveaways}</td><td>{s.result.stats.away.takeaways}</td><td>{s.result.stats.away.sacksTaken}</td></tr>
                </tbody>
              </table>
            </section>
          );
        })()}
      </Show>
    </main>
  );
}

function halftimeDoneAlready() {
  return state.halftimeUsed() || phaseIsNotHalftime() || !halftimeOptions().includes(effectiveFocus());
}
function phaseIsNotHalftime() {
  return state.phase() !== 'halftime';
}

render(() => <App />, document.getElementById('app') as HTMLElement);
