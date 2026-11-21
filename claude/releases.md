# Releases (append-only; Architect)

One row per deploy to Cloudflare, written BEFORE the upload and completed after. Never edit or delete a row: a rollback is a new row. No secrets here (no tokens, no account ids).

Procedure: `claude/cloudflare-decision-2026-11-21.md`. Rollback: `claude/cutover-runbook-2026-11-20.md` section 6.

| # | Date (UTC) | Kind | Source commit | `dist/` sha256 | Zip sha256 | Seam golden | Prior production deployment (id/URL) | Gates 1-10 receipt | Side-by-side seen by Owner | Live hashes verified | Result / note |
|---|---|---|---|---|---|---|---|---|---|---|---|

Kind is one of: `rehearsal`, `make-live`, `rollback`. Seam golden is the full hash (starts `e8fed8ab`), taken from the golden file, not copied from another row. "Prior production deployment" is `none` for the first row. Since 21 Nov (05:33Z) the host is a Worker, not Pages: record the prior **Worker version ID** in that column, and the exact `workers.dev` hostname in the note of the rehearsal row.
