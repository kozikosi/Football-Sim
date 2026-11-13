// arm-lit — same "Offensive focus" feature delivered by Lit + Web Components.
// Light DOM (no shadow root) so the shared acceptance spec's data-testid hooks
// work without piercing; global app.css provides the styles.
import { LitElement, html } from 'lit';
import {
  state, TEAM_SLOTS, FOCUS_LIST, VERSION_TAG, effectiveFocus, board, kickoff,
  halftimeOptions, changeFocusAtHalftime, finish, arrowFor,
} from './lib/state';
import { focusById } from './engine-contract/index.ts';

const label = (id: string) => focusById(id).label;

export class FrameworkArm extends LitElement {
  state_ = state; // module-shared; LitElement re-renders when we call requestUpdate()

  render() {
    return html`
      <main>
        <h1>Framework Test — Offensive Focus <span class="tag">Lit · focus ${VERSION_TAG}</span></h1>

        <section data-testid="setup">
          <h2>1 · Pre-game</h2>
          <label class="manage">
            <input type="checkbox" data-testid="manage-toggle" .checked=${state.manageOn}
              @change=${() => { state.manageOn = !state.manageOn; this.requestUpdate(); }} />
            Manage focus (off = auto — the engine picks, no halftime prompt)
          </label>
          ${state.manageOn ? html`
            <div class="cards" role="radiogroup" aria-label="offensive focus">
              ${FOCUS_LIST.map((f) => html`
                <button class="card ${state.picked === f.id ? 'selected' : ''}"
                  data-testid="focus-${f.id}" @click=${() => { state.picked = f.id; this.requestUpdate(); }}>
                  <strong>${f.label}</strong>
                  <span>${f.blurb}</span>
                </button>`)}
            </div>` : html`
            <p data-testid="auto-pick">Auto mode — the engine picks: <strong>${label(effectiveFocus())}</strong></p>`}
          <button class="primary" data-testid="kickoff" @click=${() => { kickoff(); this.requestUpdate(); }}>Kickoff</button>
        </section>

        ${state.phase !== 'pregame' ? html`
        <section data-testid="halftime">
          <h2>2 · Halftime</h2>
          ${(state.manageOn && !state.halftimeUsed && state.phase === 'halftime' && halftimeOptions().includes(effectiveFocus())) ? html`
            <p>One change available. Current: <strong>${label(effectiveFocus())}</strong>.</p>
            <div class="cards">
              ${halftimeOptions().map((id) => html`
                <button class="card ${id === effectiveFocus() ? 'selected' : ''}"
                  data-testid="halftime-${id}" @click=${() => { changeFocusAtHalftime(id); this.requestUpdate(); }}>${label(id)}</button>`)}
            </div>` : html`
            <p data-testid="no-halftime">Auto mode — no halftime prompt${state.halftimeUsed ? ' (change used)' : ''}.</p>`}
          ${state.note ? html`<p class="note">${state.note}</p>` : ''}
          <button class="primary" data-testid="continue" @click=${() => { finish(); this.requestUpdate(); }}>Continue</button>
        </section>` : ''}

        <section data-testid="board">
          <h2>The draft board <span class="tag">focus: ${label(effectiveFocus())}</span></h2>
          <p class="law">Wins are the static truth — the focus moves Priority only.</p>
          <table>
            <thead><tr><th>Slot</th><th>OVR</th><th>Wins</th><th>Priority</th><th>Form</th></tr></thead>
            <tbody>
              ${board().map((r) => html`
                <tr data-testid="row-${r.slot}">
                  <td>${r.slot}</td>
                  <td>${TEAM_SLOTS[r.slot]}</td>
                  <td>${r.wins.toFixed(2)}</td>
                  <td class="priority" data-testid="priority-${r.slot}">${r.priority}</td>
                  <td>${arrowFor(r.slot) ? html`<span class="arrow ${arrowFor(r.slot)}" title=${arrowFor(r.slot)} aria-label="form: ${arrowFor(r.slot)}"></span>` : ''}</td>
                </tr>`)}
            </tbody>
          </table>
        </section>

        ${state.sim ? html`
        <section data-testid="game">
          <h2>3 · The game</h2>
          <p class="score" data-testid="score">
            Home <strong>${state.sim.result.homeScore}</strong> — <strong>${state.sim.result.awayScore}</strong> Away
            <span class="tag">Q4-start diff ${state.sim.q4StartDiff}</span>
          </p>
          ${state.sim.focusLog.length ? html`
            <h3>4th-quarter automatics (fired)</h3>
            <ul data-testid="fired">
              ${state.sim.focusLog.map((d) => html`
                <li>
                  <strong>${d.label}</strong> — ${d.detail}
                  ${!d.appliedInSim ? html`<span class="tag">reported to the engine layer</span>` : ''}
                </li>`)}
            </ul>
            ${state.sim.focusLog.some((d) => d.key === 'strat-override') && focusById(effectiveFocus()).offPlan.strat !== 'pass' ? html`
              <p class="note" data-testid="precedence">
                Precedence: the user's focus (<strong>${label(effectiveFocus())}</strong>) stays selected; the
                automatic's tendency applies on top for the overridden plan. The user is never silently re-picked.
              </p>` : ''}` : html`
            <p data-testid="no-automatics">No automatics fired (Q4-start diff ${state.sim.q4StartDiff}).</p>`}
          <h3>Box score</h3>
          <table class="box">
            <thead><tr><th></th><th>Rush yds</th><th>Pass yds</th><th>Plays</th><th>Give</th><th>Take</th><th>Sacks</th></tr></thead>
            <tbody>
              <tr><th>Home</th><td>${state.sim.result.stats.home.rush}</td><td>${state.sim.result.stats.home.pass}</td><td>${state.sim.result.stats.home.plays}</td><td>${state.sim.result.stats.home.giveaways}</td><td>${state.sim.result.stats.home.takeaways}</td><td>${state.sim.result.stats.home.sacksTaken}</td></tr>
              <tr><th>Away</th><td>${state.sim.result.stats.away.rush}</td><td>${state.sim.result.stats.away.pass}</td><td>${state.sim.result.stats.away.plays}</td><td>${state.sim.result.stats.away.giveaways}</td><td>${state.sim.result.stats.away.takeaways}</td><td>${state.sim.result.stats.away.sacksTaken}</td></tr>
            </tbody>
          </table>
        </section>` : ''}
      </main>
    `;
  }
}

customElements.define('framework-arm', FrameworkArm);
