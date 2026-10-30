// VLC V1 — Hook: useEngine
// Syncs React state with Claude's engine. Single source of truth.

import { useState, useCallback, useEffect } from 'react';
import { createEngine, type EngineAPI } from '../engine/index';
import type { Player, SlotKey, TeamId } from '../types/engine';

export function useEngine() {
  const [engine] = useState(() => createEngine());
  const [roster, setRoster] = useState<Player[]>([]);
  const [lineup, setLineup] = useState<Record<SlotKey, Player | null>>({});
  const [phase, setPhase] = useState<'draft' | 'preseason' | 'regular' | 'playoffs' | 'superbowl' | 'offseason'>('draft');
  const [userTeam, setUserTeam] = useState<TeamId | null>(null);

  // Persist to localStorage (try/catch, per P-011)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('vlc-v1-state');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.roster) setRoster(parsed.roster);
        if (parsed.lineup) setLineup(parsed.lineup);
        if (parsed.userTeam) setUserTeam(parsed.userTeam);
        if (parsed.phase) setPhase(parsed.phase);
      }
    } catch {
      // ignore — try/catch per P-011
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('vlc-v1-state', JSON.stringify({ roster, lineup, userTeam, phase }));
    } catch {
      // ignore
    }
  }, [roster, lineup, userTeam, phase]);

  const startDraft = useCallback((teamId: TeamId) => {
    engine.startDraft(teamId);
    setUserTeam(teamId);
    setPhase('draft');
    setRoster([]);
    setLineup({});
  }, [engine]);

  const draftPick = useCallback((slot: SlotKey, player: Player) => {
    engine.draftPick(slot, player);
    setRoster((prev) => {
      const next = [...prev];
      const idx = next.findIndex((p) => p.name === player.name && p.pos === player.pos);
      if (idx >= 0) next[idx] = player;
      else next.push(player);
      return next;
    });
  }, [engine]);

  const setLineupState = useCallback((slotmap: Record<SlotKey, Player | null>) => {
    engine.setLineup(slotmap);
    setLineup(slotmap);
  }, [engine]);

  const simulateGame = useCallback((home: TeamId, away: TeamId) => {
    return engine.simulateGame(home, away);
  }, [engine]);

  const advise = useCallback(() => {
    return engine.adviseLineup(roster);
  }, [engine, roster]);

  return {
    engine,
    roster,
    lineup,
    phase,
    userTeam,
    startDraft,
    draftPick,
    setLineup: setLineupState,
    simulateGame,
    adviseLineup: advise,
  };
}
