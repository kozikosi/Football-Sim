// VLC V1 — App
// Routes between screens. Engine state drives navigation.

import { useState } from 'react';
import Shell from './layout/Shell';
import Home from './home/Home';
import DraftBoard from './draft/DraftBoard';
import DraftRecap from './draft/DraftRecap';
import Lineup from './lineup/Lineup';
import GamePreview from './game/GamePreview';
import GameLog from './game/GameLog';
import SeasonReview from './review/SeasonReview';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'draft' | 'draft-recap' | 'lineup' | 'preview' | 'game' | 'review'>('home');

  return (
    <Shell>
      {screen === 'home' && <Home onStartDraft={() => setScreen('draft')} />}
      {screen === 'draft' && (
        <>
          <DraftBoard />
          <div className="nav-row">
            <button className="btn btn-ghost" onClick={() => setScreen('lineup')}>
              Set Lineup →
            </button>
          </div>
        </>
      )}
      {screen === 'draft-recap' && (
        <DraftRecap onStartSeason={() => setScreen('review')} />
      )}
      {screen === 'lineup' && (
        <>
          <Lineup />
          <div className="nav-row">
            <button className="btn btn-ghost" onClick={() => setScreen('preview')}>
              Game Preview →
            </button>
          </div>
        </>
      )}
      {screen === 'preview' && <GamePreview />}
      {screen === 'game' && <GameLog />}
      {screen === 'review' && <SeasonReview />}
    </Shell>
  );
}
