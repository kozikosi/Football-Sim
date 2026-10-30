// HieroGlyphic v1 - Main entry point
import './styles/base.css';
import { makeRng } from './engine/rng.ts';
import { buildPool } from './engine/players.ts';
import { optimalLineup } from './engine/lineup.ts';

// HieroGlyphic v1 will be built iteratively
console.log('HieroGlyphic v1 - Initializing...');
