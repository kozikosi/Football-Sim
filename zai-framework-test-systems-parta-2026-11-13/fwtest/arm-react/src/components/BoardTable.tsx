import { arrowFor, TEAM_SLOTS } from '../state';
import type { PriorityRow } from '../engine-contract/index.ts';

export function BoardTable({ board, focusLabel }: { board: PriorityRow[]; focusLabel: string }) {
  return (
    <section data-testid="board">
      <h2>
        The draft board <span className="tag">focus: {focusLabel}</span>
      </h2>
      <p className="law">Wins are the static truth — the focus moves Priority only.</p>
      <table>
        <thead>
          <tr>
            <th>Slot</th><th>OVR</th><th>Wins</th><th>Priority</th><th>Form</th>
          </tr>
        </thead>
        <tbody>
          {board.map((r) => (
            <tr key={r.slot} data-testid={`row-${r.slot}`}>
              <td>{r.slot}</td>
              <td>{TEAM_SLOTS[r.slot]}</td>
              <td>{r.wins.toFixed(2)}</td>
              <td className="priority" data-testid={`priority-${r.slot}`}>{r.priority}</td>
              <td>
                {arrowFor(r.slot) && (
                  <span
                    className={`arrow ${arrowFor(r.slot)}`}
                    title={arrowFor(r.slot) ?? undefined}
                    aria-label={`form: ${arrowFor(r.slot)}`}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
