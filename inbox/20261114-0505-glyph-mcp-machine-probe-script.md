SPEAKER: glyph | ROLE: seat (preparation) | TASK: MCP/tooling question — one-paste probe script for Owner machine | DATE: 2026-11-14T05:05Z
FOR: Owner (run locally if desired; paste full output to a seat for transcription)

# MCP / Tooling Probe (zsh-safe, Node builtins only)

**Purpose:** re-measure MCP/tool availability on the machine that will actually run/watch framework work (not seat sandboxes). Prior claims differ (e.g. Playwright MCP chrome-channel vs `--browser chromium`; Context7 quota/keyless behavior) — **measure, do not inherit**.

**Safety:** read-only probes. No installs, no writes except stdout/stderr, no `.env` reads. Run in zsh. Requires `node` in PATH. `npx --yes` / `npm view` may download or hit network — see notes.

## One-paste block
```zsh
# glyph MCP/tool probe (read-only, Node builtins in node step)
setopt localoptions NO_NOMATCH 2>/dev/null || true
echo "===PROBE_START==="
echo "DATE_UTC=$(date -u +%Y-%m-%dT%H:%M:%SZ 2>&1 || echo unknown)"
echo "PWD=$(pwd)"
echo "SHELL=${SHELL:-unknown}"
echo "ZSH_VERSION=${ZSH_VERSION:-none}"
echo "UNAME=$(uname -a 2>&1 | sed 's/[[:space:]]\+/ /g')"
echo "NODE=$(command -v node 2>&1 || echo missing); $(node --version 2>&1 || echo n/a)"
echo "NPM=$(command -v npm 2>&1 || echo missing); $(npm --version 2>&1 || echo n/a)"
echo "NPX=$(command -v npx 2>&1 || echo missing)"
echo "GIT=$(git --version 2>&1 || echo n/a)"
echo "PLAYWRIGHT_NPX=$(npx --yes playwright --version 2>&1 | tail -20)"
echo "SV_NPX=$(npx --yes sv --version 2>&1 | tail -20)"
echo "PW_MCP_HELP=$(npx --yes @playwright/mcp@latest --help 2>&1 | head -40)"
echo "PW_MCP_CHROMIUM=$(timeout 20 npx --yes @playwright/mcp@latest --browser chromium --help 2>&1 | head -40; echo EXIT:$?)"
echo "SVELTE_MCP_PKG=$(npm view @sveltejs/mcp version 2>&1 | head -5)"
echo "CONTEXT7_PKG=$(npm view @upstash/context7-mcp version 2>&1 | head -5)"
node -e "const fs=require('fs'),p=require('path'),os=require('os'); const checks=['.mcp.json','.kilocode/mcp.json','kilo.json','kilo.jsonc','.kilo/kilo.jsonc']; console.log('===NODE_CHECKS==='); console.log('HOME='+os.homedir()); for (const c of checks){const a=p.join(process.cwd(),c); try{fs.accessSync(a); const st=fs.statSync(a); console.log('CWD_HAS '+c+' size='+st.size);}catch(e){console.log('CWD_MISS '+c);}} const cache=p.join(os.homedir(),'Library','Caches','ms-playwright'); try{console.log('PW_CACHE='+JSON.stringify(fs.readdirSync(cache).slice(0,30)));}catch(e){console.log('PW_CACHE=unavailable '+e.message);} console.log('NODE_OK=1');"
echo "===PROBE_END==="
```

## Notes (for reviewer)
- `timeout 20` may be missing on macOS without coreutils; the command will still run (remove `timeout 20 ` if needed).
- `npm view ...` does registry network reads; skip those lines for zero-network. `npx --yes ...` may download packages — run only if acceptable.
- No Context7 key, no `.env`, no secrets accessed. Output may include local paths/usernames — review before sharing broadly.
- Glyph did **not** run this on Owner’s machine. Glyph session receipts (different machine/harness): macOS arm64, Node v26.13.0, npm 11.20.0, Playwright 1.65.0, sv 1.3.0, no Svelte/Vue MCP tools exposed — **REPORTED context only**.
