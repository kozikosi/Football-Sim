import { focusById } from '../engine-contract/index.ts';
import type { FocusState } from '../state';

export function GamePanel({ s, effective }: { s: FocusState; effective: string }) {
  if (!s.sim) return null;
  const sim = s.sim;
  const fired = sim.focusLog;
  const precedence =
    fired.some((d) => d.key === 'strat-override') &&
    focusById(effective).offPlan.strat !== 'pass';
  const st = sim.result.stats;
  return (
    <section data-testid="game">
      <h2>3 · The game</h2>
      <p className="score" data-testid="score">
        Home <strong>{sim.result.homeScore}</strong> — <strong>{sim.result.awayScore}</strong> Away
        <span className="tag">Q4-start diff {sim.q4StartDiff}</span>
      </p>
      {fired.length > 0 ? (
        <>
          <h3>4th-quarter automatics (fired)</h3>
          <ul data-testid="fired">
            {fired.map((d) => (
              <li key={d.key}>
                <strong>{d.label}</strong> — {d.detail}
                {!d.appliedInSim && <span className="tag">reported to the engine layer</span>}
              </li>
            ))}
          </ul>
          {precedence && (
            <p className="note" data-testid="precedence">
              Precedence: the user's focus (<strong>{focusById(effective).label}</strong>) stays selected;
              the automatic's tendency applies on top for the overridden plan. The user is never silently re-picked.
            </p>
          )}
        </>
      ) : (
        <p data-testid="no-automatics">
          No automatics fired (Q4-start diff {sim.q4StartDiff}).
        </p>
      )}
      <h3>Box score</h3>
      <table className="box">
        <thead>
          <tr><th></th><th>Rush yds</th><th>Pass yds</th><th>Plays</th><th>Give</th><th>Take</th><th>Sacks</th></tr>
        </thead>
        <tbody>
          <tr>
            <th>Home</th><td>{st.home.rush}</td><td>{st.home.pass}</td><td>{st.home.plays}</td>
            <td>{st.home.giveaways}</td><td>{st.home.takeaways}</td><td>{st.home.sacksTaken}</td>
          </tr>
          <tr>
            <th>Away</th><td>{st.away.rush}</td><td>{st.away.pass}</td><td>{st.away.plays}</td>
            <td>{st.away.giveaways}</td><td>{st.away.takeaways}</td><td>{st.away.sacksTaken}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
