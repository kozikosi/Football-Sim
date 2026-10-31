// VLC V1 — Shimmer20_0 (w38 lesson)
// The shimmering "20-0?" sweep — homepage headline and draft review.
// Cinzel Decorative display type, gold shimmer, slowly fading in/out.

import { useEffect, useState } from 'react';

export default function Shimmer20_0({ variant = 'headline' }: { variant?: 'headline' | 'subtitle' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slow fade in/out cycle — w38: 'Can you go' slowly fades in/out, shimmering '20-0?' stays
    const timer = setInterval(() => {
      setVisible((v) => !v);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`shimmer-20-0 ${variant}`} style={{ opacity: visible ? 1 : 0.35, transition: 'opacity 2.5s ease' }}>
      <span className="twenty">Can you go</span>
      <span className="twenty-bold shimmer-text">20-0?</span>
    </div>
  );
}
