// The bench board entry (Svelte arm). Repointed from index.html; the scaffold's own src/main.ts is untouched.
import { mount } from 'svelte';
import './shared/board.css';
import Board from './Board.svelte';

const app = mount(Board, {
  target: document.getElementById('app')!,
});

export default app;
