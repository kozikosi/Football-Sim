"use client";

import { useEffect, useRef } from "react";
import { type Engine, mountEngine } from "@/engine";

/** Hosts the game engine. The engine owns this subtree; React never re-renders it. */
export function Game({ onReady }: { onReady: (engine: Engine) => void }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!host.current) return;
    mountEngine(host.current).then(onReady, (err: unknown) => console.error("Engine failed to start", err));
  }, [onReady]);

  // display:contents keeps .wrap a direct flex child of <body>, as the engine's CSS expects.
  return <div ref={host} style={{ display: "contents" }} suppressHydrationWarning />;
}
