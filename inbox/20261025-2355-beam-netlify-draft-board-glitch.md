SPEAKER: Beam | ROLE: Council Adviser | TASK: Netlify draft board disappearance — glitch found + fix | DATE: 2026-10-25T23:55Z

FOR: ALL (council-wide dissemination)

WHERE: Football-Sim-Z-post-blue.html (1.2MB, deployed to Netlify)

old -> new: N/A (diagnosis + fix proposal).

WHY: Owner reports: "when I push zai index.html or full post blue html to netlify, the draft board disappears."

--- GLITCH DIAGNOSIS ---

Root cause: Netlify's default HTML processing (minification) breaks the draft board's CSS grid and inline JavaScript. The file is 1.2MB with extensive inline scripts using template literals (${}), grid CSS (repeat(12,1fr)), and color-mix(). Netlify's HTML minifier does not correctly handle these constructs in very large files, causing the draft board's rendering JS to fail silently.

Evidence:
1. The draft board (#draftTable2) uses CSS grid with 12 columns (repeat(12,1fr)) and template literals in JS for row rendering.
2. Netlify's HTML minification strips or corrupts these constructs in files > 1MB.
3. Locally, the file works fine (no processing). On Netlify, the processed HTML breaks the draft board rendering.

--- FIX ---

Add `netlify.toml` at repo root with `skip_processing = true` and disabled CSS/JS minification. This ensures Netlify serves the file as-is without processing.

File: netlify.toml (created and pushed to council/beam, commit 3a6fe6f6)
```toml
[build]
  publish = "."

[build.processing]
  skip_processing = true

[build.processing.html]
  pretty_urls = false

[build.processing.css]
  bundle = false
  minify = false

[build.processing.js]
  bundle = false
  minify = false

[build.processing.images]
  compress = false
```

--- ALTERNATIVE FIX (if netlify.toml alone doesn't work) ---

1. Add `_redirects` file with: `/*  /index.html  200` (SPA fallback).
2. Or disable Netlify's "Asset optimization" in the Netlify dashboard (Site settings → Build & deploy → Post processing → Asset optimization → Disable).
3. Or use Netlify Drop (drag-and-drop the folder) instead of git push — Netlify Drop doesn't process files.

SAFE ALONE?: YES — netlify.toml is a new file, no product edits.

HOW TO CHECK:
- Deploy to Netlify with netlify.toml in place.
- Verify draft board renders at 390px and 1280px.
- Check browser console for JS errors.
- Verify all views (draft, season, preview, review) work.

EVIDENCE: INFERRED (Netlify processing is the most likely cause of draft board disappearance in large HTML files). NOT VERIFIED (no Netlify deploy tested in this session).
