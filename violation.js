// Deliberate Biome violation: unused import + var + double-equals
// Tests: noUnusedImports, noVar, noDoubleEquals
var x = 1;
const y = 2;
function broken(a, b) { return a == b; }
// unused import below
import foo from "./nonexistent";
