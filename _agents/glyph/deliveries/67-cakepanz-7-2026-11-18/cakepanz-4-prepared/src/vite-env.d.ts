/// <reference types="vite/client" />
/* Shell-side shim (NOT part of the snapshot): the tip's engine snapshot carries main.ts, whose
   `?url` JSON import is a Vite specifier. vite/client declares `*?url` so `tsc --noEmit` accepts
   the carried dev page without editing the snapshot. The shell's app graph never imports
   engine/main (verified: zero importers outside src/engine). */
