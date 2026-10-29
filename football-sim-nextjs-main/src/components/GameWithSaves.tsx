"use client";

import { useState } from "react";
import type { Engine } from "@/engine";
import { Game } from "./Game";
import { SaveBar } from "./SaveBar";

export function GameWithSaves() {
  const [engine, setEngine] = useState<Engine | null>(null);
  return (
    <>
      <Game onReady={setEngine} />
      {engine && <SaveBar engine={engine} />}
    </>
  );
}
