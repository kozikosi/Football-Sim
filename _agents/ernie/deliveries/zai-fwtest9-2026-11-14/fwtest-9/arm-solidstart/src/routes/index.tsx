// @ts-nocheck
import { createMemo, createSignal, For, Show } from 'solid-js';
// v3 fix: the `import '../app.css'` that stood here moved to src/app.tsx.
// Evidence chain (receipts in logs/): the route module graph keyed with
// `pick=$css` (`window.manifest` in the served HTML) and the SSR branch
// rendered empty comment markers (prod: 1852 B, 0 data-testids; dev: 1069 B,
// 0 data-testids). Global CSS belongs in the root App component, not in a
// route file — see logs/v3-solidstart-{prod,dev}-{before,after}.logs.
import {
	FOCUSES, FOCUS_VERSION, FORM_Z, STRONG_PASS, STRONG_FRONT,
	canChangeAtHalftime, autoPickFocus, automatics, priorityBoard, formArrow,
	focusById, simulateWithFocus,
	type SimOutput, type SlotId,
} from '~/engine-contract';

const SEED = 20261113;
const TEAM = STRONG_PASS;
const OPP = STRONG_FRONT;

type Phase = 'pregame' | 'halftime' | 'final';

export default function Home() {
	const [manageOn, setManageOn] = createSignal(false);
	const [picked, setPicked] = createSignal('west-coast');
	const [phase, setPhase] = createSignal<Phase>('pregame');
	const [sim, setSim] = createSignal<SimOutput | null>(null);
	const [halftimeUsed, setHalftimeUsed] = createSignal(false);
	const [q4Auto, setQ4Auto] = createSignal(true);
	const [note, setNote] = createSignal('');

	const effective = createMemo(() =>
		manageOn() ? picked() : autoPickFocus({ diff: 0, quarter: 1, oppSlots: OPP }),
	);

	const board = createMemo(() =>
		priorityBoard(TEAM, effective())
			.filter((r) => r.wins > 0)
			.sort((a, b) => b.priority - a.priority || b.wins - a.wins),
	);

	const runSim = (focus: string) =>
		simulateWithFocus({
			homeSlots: TEAM,
			awaySlots: OPP,
			homeFocus: focus,
			awayFocus: 'auto',
			seed: SEED,
			quarterAutomatics: q4Auto(),
		});

	const kickoff = () => {
		setSim(runSim(effective()));
		setPhase('halftime');
		setHalftimeUsed(false);
	};

	const halftimeOptions = () => FOCUSES.filter((f) => canChangeAtHalftime(f.id)).map((f) => f.id);

	const changeAtHalftime = (id: string) => {
		if (halftimeUsed() || phase() !== 'halftime') return;
		setPicked(id);
		setHalftimeUsed(true);
		setSim(runSim(id));
		setNote(`Halftime change applied: ${id} (sim re-run with the new focus).`);
	};

	const fired = createMemo(() => (sim() ? sim()!.focusLog : []));
	const preview = createMemo(() =>
		sim() ? automatics({ diff: sim()!.q4StartDiff, quarter: 4, oppSlots: OPP }, effective()) : [],
	);
	const precedence = createMemo(
		() =>
			fired().some((d) => d.key === 'strat-override') &&
			focusById(effective()).offPlan.strat !== 'pass',
	);

	const arrow = (slot: SlotId) => formArrow(FORM_Z[slot] ?? 0);

	return (
		<main>
			<h1>
				Framework Test — Offensive Focus <span class="tag">SolidStart · focus {FOCUS_VERSION}</span>
			</h1>

			<section data-testid="setup">
				<h2>1 · Pre-game</h2>
				<label class="manage">
					<input
						type="checkbox"
						checked={manageOn()}
						data-testid="manage-toggle"
						onInput={(e) => setManageOn(e.currentTarget.checked)}
					/>
					Manage focus (off = auto — the engine picks, no halftime prompt)
				</label>
				<Show
					when={manageOn()}
					fallback={
						<p data-testid="auto-pick">
							Auto mode — the engine picks: <strong>{focusById(effective()).label}</strong>
						</p>
					}
				>
					<div class="cards" role="radiogroup" aria-label="offensive focus">
						<For each={FOCUSES}>
							{(f) => (
								<button
									class="card"
									classList={{ selected: picked() === f.id }}
									data-testid={`focus-${f.id}`}
									onClick={() => setPicked(f.id)}
								>
									<strong>{f.label}</strong>
									<span>{f.blurb}</span>
								</button>
							)}
						</For>
					</div>
				</Show>
				<button class="primary" data-testid="kickoff" onClick={kickoff}>
					Kickoff
				</button>
			</section>

			<Show when={phase() !== 'pregame'}>
				<section data-testid="halftime">
					<h2>2 · Halftime</h2>
					<Show
						when={manageOn() && !halftimeUsed() && phase() === 'halftime' && halftimeOptions().includes(effective())}
						fallback={
							<p data-testid="no-halftime">
								Auto mode — no halftime prompt{halftimeUsed() ? ' (change used)' : ''}.
							</p>
						}
					>
						<p>
							One change available. Current: <strong>{focusById(effective()).label}</strong>.
						</p>
						<div class="cards">
							<For each={halftimeOptions()}>
								{(id) => (
									<button
										class="card"
										classList={{ selected: id === effective() }}
										data-testid={`halftime-${id}`}
										onClick={() => changeAtHalftime(id)}
									>
										{focusById(id).label}
									</button>
								)}
							</For>
						</div>
					</Show>
					<Show when={note()}>
						<p class="note">{note()}</p>
					</Show>
					<button class="primary" data-testid="continue" onClick={() => setPhase('final')}>
						Continue
					</button>
				</section>
			</Show>

			<section data-testid="board">
				<h2>
					The draft board <span class="tag">focus: {focusById(effective()).label}</span>
				</h2>
				<p class="law">Wins are the static truth — the focus moves Priority only.</p>
				<table>
					<thead>
						<tr>
							<th>Slot</th><th>OVR</th><th>Wins</th><th>Priority</th><th>Form</th>
						</tr>
					</thead>
					<tbody>
						<For each={board()}>
							{(r) => (
								<tr data-testid={`row-${r.slot}`}>
									<td>{r.slot}</td>
									<td>{TEAM[r.slot]}</td>
									<td>{r.wins.toFixed(2)}</td>
									<td class="priority" data-testid={`priority-${r.slot}`}>{r.priority}</td>
									<td>
										<Show when={arrow(r.slot)}>
											<span class={`arrow ${arrow(r.slot)}`} title={arrow(r.slot)!} aria-label={`form: ${arrow(r.slot)}`} />
										</Show>
									</td>
								</tr>
							)}
						</For>
					</tbody>
				</table>
			</section>

			<Show when={sim()}>
				<section data-testid="game">
					<h2>3 · The game</h2>
					<p class="score" data-testid="score">
						Home <strong>{sim()!.result.homeScore}</strong> — <strong>{sim()!.result.awayScore}</strong> Away
						<span class="tag">Q4-start diff {sim()!.q4StartDiff}</span>
					</p>
					<Show
						when={fired().length > 0}
						fallback={
							<p data-testid="no-automatics">
								No automatics fired (Q4-start diff {sim()!.q4StartDiff}); the layer would return {preview().length} decision(s) at this state.
							</p>
						}
					>
						<h3>4th-quarter automatics (fired)</h3>
						<ul data-testid="fired">
							<For each={fired()}>
								{(d) => (
									<li>
										<strong>{d.label}</strong> — {d.detail}
										<Show when={!d.appliedInSim}>
											<span class="tag">reported to the engine layer</span>
										</Show>
									</li>
								)}
							</For>
						</ul>
						<Show when={precedence()}>
							<p class="note" data-testid="precedence">
								Precedence: the user's focus (<strong>{focusById(effective()).label}</strong>) stays selected;
								the automatic's tendency applies on top for the overridden plan. The user is never silently re-picked.
							</p>
						</Show>
					</Show>
					<h3>Box score</h3>
					<table class="box">
						<thead>
							<tr><th></th><th>Rush yds</th><th>Pass yds</th><th>Plays</th><th>Give</th><th>Take</th><th>Sacks</th></tr>
						</thead>
						<tbody>
							<tr>
								<th>Home</th><td>{sim()!.result.stats.home.rush}</td><td>{sim()!.result.stats.home.pass}</td>
								<td>{sim()!.result.stats.home.plays}</td><td>{sim()!.result.stats.home.giveaways}</td>
								<td>{sim()!.result.stats.home.takeaways}</td><td>{sim()!.result.stats.home.sacksTaken}</td>
							</tr>
							<tr>
								<th>Away</th><td>{sim()!.result.stats.away.rush}</td><td>{sim()!.result.stats.away.pass}</td>
								<td>{sim()!.result.stats.away.plays}</td><td>{sim()!.result.stats.away.giveaways}</td>
								<td>{sim()!.result.stats.away.takeaways}</td><td>{sim()!.result.stats.away.sacksTaken}</td>
							</tr>
						</tbody>
					</table>
				</section>
			</Show>
		</main>
	);
}
