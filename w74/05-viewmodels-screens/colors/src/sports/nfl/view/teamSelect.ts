// Team Select view model (w74 item 5a, Z.ai DRAFT). Pure: state (or an error string) in, plain JSON out — the
// pattern view/draftBoard.ts established. G-VM6 (flagged): the VM takes the store's ERROR STRING, not the whole
// store state, because Team Select reads nothing else from the draft store; when the whole-app AppState reducer
// lands, the signature widens to (AppState) and the body does not change.
import { TEAMS, TEAM_BY_NAME } from '../engine/league.ts';
import { TEAM_COLORS } from './teamColors.ts';

export interface TeamChoiceVM { index: number; name: string; conf: string; div: string; fg: string; bg: string }
export interface TeamSelectVM {
  title: string; tagline: string; seedHint: string; startLabel: string;
  teams: TeamChoiceVM[];
  error: string | null;
}

export function teamSelectVM(error: string | null = null): TeamSelectVM {
  return {
    title: 'Choose your team',
    tagline: 'Draft the roster. Coach the season. Go 20-0.',
    seedHint: 'The same seed with the same picks plays the same season — share it and a friend drafts the identical class.',
    startLabel: 'Start the draft',
    teams: TEAMS.map((t, i) => {
      const c = TEAM_COLORS[t.name] ?? ['#333333', '#111111', '#EEEEEE'];   // a name missing from the Owner's table: neutral, never a guess
      return { index: i, name: t.name, conf: t.conf, div: t.div, fg: c[0], bg: c[1] };
    }),
    error,
  };
}

// teamColors wants the name; TEAM_BY_NAME is re-exported so a future VM can resolve names from payloads.
export { TEAM_BY_NAME };
