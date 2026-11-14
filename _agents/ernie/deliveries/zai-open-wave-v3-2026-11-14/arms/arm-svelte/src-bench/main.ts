// The bench board entry (Svelte arm). Repointed from index.html; the scaffold's own src/main.ts is untouched.
import { mount } from 'svelte';
import './shared/board.css';
import Board from './Board.svelte';

const app = mount(Board, {
  target: document.getElementById('app')!,
});

export default app;

// BENCH-2 Phase A: the save-envelope bridge rides on the existing __bench handle (identical bytes in
// both arms; the bridge itself is framework-free and imports only the engine's own contract).
import { bridge } from './shared/envelope-bridge';
Object.assign((window as unknown as { __bench: Record<string, unknown> }).__bench, {
  save: bridge.save, load: bridge.load, completeGreedy: bridge.completeGreedy,
  pickById: bridge.pickById, rngPos: bridge.rngPos, rawSlot: bridge.rawSlot,
  slotRefusal: bridge.slotRefusal,
});
