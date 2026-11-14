import './App.css';
import { focusById } from './engine-contract/index.ts';
import {
  useEffectiveFocus, useBoard, useFocusState, runSim, VERSION_TAG,
} from './state';
import { BoardTable } from './components/BoardTable';
import { Setup, Halftime } from './components/Panels';
import { GamePanel } from './components/GamePanel';

export default function App() {
  const st = useFocusState();
  const effective = useEffectiveFocus(st);
  const board = useBoard(effective);

  const kickoff = () => {
    st.setSim(runSim(st, effective));
    st.setPhase('halftime');
    st.setHalftimeUsed(false);
    st.setNote('');
  };
  const changeAtHalftime = (id: string) => {
    if (st.halftimeUsed || st.phase !== 'halftime') return;
    st.setPicked(id);
    st.setHalftimeUsed(true);
    st.setSim(runSim(st, id));
    st.setNote(`Halftime change applied: ${id} (sim re-run with the new focus).`);
  };
  const label = (id: string) => focusById(id).label;

  return (
    <main>
      <h1>
        Framework Test — Offensive Focus{' '}
        <span className="tag">React · focus {VERSION_TAG}</span>
      </h1>
      <Setup s={st} effective={effective} onKickoff={kickoff} />
      {st.phase !== 'pregame' && (
        <Halftime
          s={st}
          effective={effective}
          onChange={changeAtHalftime}
          onFinish={() => st.setPhase('final')}
        />
      )}
      <BoardTable board={board} focusLabel={label(effective)} />
      {st.sim && <GamePanel s={st} effective={effective} />}
    </main>
  );
}
