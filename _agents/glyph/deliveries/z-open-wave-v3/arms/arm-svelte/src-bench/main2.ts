// BENCH-2 Phase D entry (Svelte arm) — the library-test board page (library.html).
import { mount } from 'svelte';
import './library/board2.css';
import Board2 from './library/Board2.svelte';

const app = mount(Board2, { target: document.getElementById('app')! });
export default app;
