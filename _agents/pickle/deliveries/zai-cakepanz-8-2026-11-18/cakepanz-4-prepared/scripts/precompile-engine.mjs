/* precompile-engine.mjs — the Part-D precompile, as a command.
 * Usage: node scripts/precompile-engine.mjs   (or: npm run precompile)
 * Emits src/engine-node/ from src/engine/ with the ONE parameter property transformed to explicit
 * fields. The snapshot is never edited; the generated copy differs from it in exactly one file
 * (proved inside the generator). See scripts/engine-node-gen.mjs for the guard rails. */
import { generate } from './engine-node-gen.mjs';
generate({ log: (m) => console.log(m) });
