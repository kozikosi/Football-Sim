// VLC V1 — DraftRecap cinematic (w38 P-155)
// Slow sentence-by-sentence center cinematic:
// "Play the season." → "Coach your team to the Super Bowl." → "Can you go 20-0?"
// First two faster, 20-0? perfectly centred and lingering at least 3s, twice the other holds.
// SEASON button centred with shimmering "Can you go 20-0?" under it.
// Tabs: NEW DRAFT and 100 SEASONS (all caps).

import { useState, useEffect } from 'react';
import Shimmer20_0 from '../home/Shimmer20_0';

const SENTENCES = [
  { text: 'Play the season.', hold: 1800 },
  { text: 'Coach your team to the Super Bowl.', hold: 2200 },
  { text: 'Can you go 20-0?', hold: 3400 },
];

export default function DraftRecap({ onStartSeason }: { onStartSeason: () => void }) {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    const t = setTimeout(() => {
      setIndex((i) => {
        if (i >= SENTENCES.length - 1) {
          setFinished(true);
          return i;
        }
        return i + 1;
      });
    }, SENTENCES[index].hold);
    return () => clearTimeout(t);
  }, [index, finished]);

  return (
    <section className="draft-recap">
      {finished ? (
        <div className="recap-done">
          <Shimmer20_0 variant="subtitle" />
          <div className="recap-tabs">
            <button className="recap-tab active">NEW DRAFT</button>
            <button className="recap-tab">100 SEASONS</button>
          </div>
          <button className="btn btn-primary" onClick={onStartSeason}>
            SEASON
          </button>
        </div>
      ) : (
        <div className="recap-cinematic">
          <div className="recap-sentence">{SENTENCES[index].text}</div>
        </div>
      )}
    </section>
  );
}
