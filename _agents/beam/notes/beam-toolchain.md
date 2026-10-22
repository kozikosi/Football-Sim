# Beam — toolchain inventory (22 Oct 2026), for the Architect and the council

**Purpose.** The Owner's ruling of 22 Oct gives the Architect and the council: Figma (read designs, pull screenshots and design context, generate diagrams), Mermaid, Biome, and Git. This note records **what actually works, the exact command, and the receipt** — so nobody else spends a session rediscovering it. **Every line below was run on this machine; nothing is assumed.**

---

## 1 · Biome — WORKS, native binary, no npm needed

**What:** a linter/formatter for the council's JavaScript. It is the council's house rules engine for the code agents write.

**Binary:** `/Users/kosi/.local/bin/biome` · 73 MB native executable · **v2.6.2** (installed 21 Oct 09:54, owned by `kosi:staff`).

**It needs no npm.** It is a standalone binary — the earlier `npx @biomejs/biome` invocation was a convenience, not a requirement. This matters because the shared npm cache is partly broken (see §3).

```sh
# version
~/.local/bin/biome --version

# check (lint + format rules) a file
~/.local/bin/biome check _agents/ds/tools/funcdiff-full.js

# format in place
~/.local/bin/biome format --write path/to/file.js

# apply safe fixes
~/.local/bin/biome check --write path/to/file.js
```

**Receipt:** `Checked 1 file in 83ms. No fixes applied.` on `_agents/ds/tools/funcdiff-full.js`.

**Scope note.** The project's `biome.json` decides what is in scope. Files outside it are reported as *"These paths were provided but ignored"* — that is the config talking, not a broken install. My harness drafts under `_agents/<seat>/notes/harness-drafts/` are currently outside the configured scope; a seat that wants its drafts linted should either narrow the path in `biome.json` (Owner's file to change) or run Biome on the file directly with the config bypassed.

**Why the council should care:** every agent that writes JS (the harness scripts, the appliers, the probes) can now lint before filing, so style and half-written code stop reaching the record. BOC's house rules (`noAssignInExpressions` off, `useIterableCallbackReturn` off, `noTemplateCurlyInString` on) are the agreed set; run the checker, don't argue about style in the bulletin.

---

## 2 · Mermaid — WORKS, with one env-var workaround

**What:** renders the Mermaid diagrams the council writes (GitHub renders them natively in markdown; this is for producing standalone SVG/PNG assets, which is what a design handoff wants).

**Package:** `@mermaid-js/mermaid-cli` (the `mmdc` binary). Puppeteer's bundled Chromium renders correctly — verified, not assumed.

```sh
# render a diagram to SVG
npx --yes @mermaid-js/mermaid-cli -i diagram.mmd -o diagram.svg

# PNG at a size
npx --yes @mermaid-js/mermaid-cli -i diagram.mmd -o diagram.png --size 1600

# available themes
npx --yes @mermaid-js/mermaid-cli --help
#   base | dark | default | forest | neutral | neo | neo-dark | redux | redux-color | null
```

**Receipt:** rendered a 3-node flowchart to a **197,055-byte SVG** with a valid `<svg id="my-svg" …>` root.

**The workaround — please read before you hit the error.** The shared npm cache `~/.npm` contains **24 root-owned files** under `~/.npm/_cacache/content-v2/`, so a plain `npx` fails with:

```
npm error To permanently fix this problem, please run:
npm error   sudo chown -R 501:20 "/Users/kosi/.npm"
```

Two ways out:

| Method | Needs | Scope |
|--------|-------|-------|
| **Set a private cache** (what I did — no privilege) | nothing | per-command |
| **Repair the shared cache** | `sudo chown -R 501:20 ~/.npm` | machine-wide, fixes it for every agent |

Per-command, prefix with:
```sh
npm_config_cache="$HOME/.npm-cache-beam" npx --yes @mermaid-js/mermaid-cli -i x.mmd -o x.svg
```
I already created `~/.npm-cache-beam` for this.

**The machine-wide fix is one `sudo` and it removes a trap for every seat.** The Owner's call; I did not run it (it needs your password).

**Also note:** GitHub renders Mermaid in markdown natively, so a diagram in `V22-Suggestions.md` needs **no CLI at all**. The CLI is only for standalone assets — bracket images for a design handoff, or a diagram to drop into a PR description.

---

## 3 · Python — WORKS, and now visible to GUI apps

**What:** the interpreter Python-based MCP servers need. Two of the project's MCP servers (and any seat adding one) shell out to `python`.

**Installed:** **Python 3.15.1** via the official python.org framework installer → `/Library/Frameworks/Python.framework/Versions/3.15/`. **pip 26.2.2** ships with it. This was already installed before 22 Oct — nothing was downloaded today.

**The real problem was PATH visibility, and it is now fixed in two places:**

| Path | `python` | `python3` | How |
|------|----------|-----------|-----|
| `/opt/homebrew/bin/python` | 3.15.1 | — | symlink I created, `Current`-relative so it follows the active version |
| `/usr/local/bin/python` | 3.15.1 | 3.15.1 | symlink the Owner created |
| `/usr/local/bin/python3` | — | 3.15.1 | pre-existing |

**Why GUI apps needed this:** macOS GUI applications (Kilo Desktop, launched from Dock/Spotlight) take `PATH` from `/etc/paths` + `/etc/paths.d/*` and **never read `~/.zshrc`/`~/.zprofile`**. `~/.local/bin` is on your *shell* PATH but not the GUI PATH. That is why a terminal found `python` and Kilo Desktop did not.

**Verified in a fresh login shell** (what a brand-new Terminal window produces):
```
/bin/zsh -l -c 'command -v python && python -V'
→ /opt/homebrew/bin/python
→ Python 3.15.1
```

**One trap to know about.** The project carries its own `.conda` environment with **Python 3.13.16** at `.conda/bin/python`. It only shadows the system Python if something explicitly activates it — a `conda activate` in a hook, or an MCP server configured with that interpreter as its command. If an MCP server starts but behaves oddly, check that first.

**Also worth knowing:** the PATH that shell was showing contained `.` (the current directory) and a non-existent `/usr/gnu/bin`, and it predated `/etc/paths.d/homebrew` (created 02:18:49). Both symptoms of a hand-edited profile, and `PATH=.:…` is a genuine footgun — anything in the working directory can shadow a real binary. Worth a look in `~/.zshrc` / `~/.zprofile` at some point.

---

## 4 · Figma — configured, still not connected

**State, measured, not assumed:**

```
kilo mcp list
  ●  ⚠ figma          needs authentication   https://mcp.figma.com/mcp
  ●  ○ figma-desktop  disabled              http://127.0.0.1:3845/mcp
```

- **Remote route is closed by the plan tier.** `kilo mcp auth figma` returns `HTTP 403 … Raw body: Forbidden` from Figma's OAuth endpoint — the server refuses to issue a credential on this plan. Not retryable from the tool side.
- **The desktop route is the one that can work**, and it needs three things: (a) Figma → open a design file → **Dev Mode → "Enable desktop MCP server"** (this is what opens 3845 — the app merely running is not enough); (b) `figma-desktop` enabled **in `/mcps`**, not in the file (the runtime owns that value and overwrites the file — I proved this); (c) **Kilo restarted**, because a session's tool list is fixed at launch and no `figma_*` tool appeared in mine.
- **Two Figma settings currently read empty** and may need attention once the server is up: `mcpAllowedDirectoriesByUser = {}` and `installedMcpClients = ["vscode","codexCLI","codexDesktop","claudeDesktop"]` — **Kilo is not in that list.**
- **Correction to the record:** several council notes (mine included) say "no Figma MCP tool is available," which reads as *the config is missing*. It is not. `.kilo/kilo.jsonc` carries both servers and Figma's own `settings.json` has `desktop_make_local_mcp_enabled`, `desktop_make_local_devserver_mcp_tools` and `desktop_make_local_mcp_proxy_mode` all true. The limitation is **"not connected yet"**, not "not configured."
- **One diagnostic worth keeping:** Figma's agent server answers on **44950**, but only with an `Origin: http://127.0.0.1` header — without it every path returns a misleading 403. 44950 is the Font/Issues agent; the MCP endpoint is the devserver on **3845**.

**Figma is not on the critical path.** The design work proceeds on Markdown + Mermaid regardless.

---

## 5 · The rest of the seat's toolchain (unchanged, for reference)

| Tool | Use | State |
|------|-----|-------|
| `bash` + `read`/`grep`/`glob`/`edit`/`write` | the working surface | working |
| `git` | branches, commits, pushes, worktrees | working; commit `b7a33fdc` on `gpt/council-reliability-scorecard` |
| `gh` | PRs, repo state | working (`/usr/local/bin/gh`) |
| `agent_manager` | list/session control for Kilo sessions | working — shows only "Reflection" and "Beam" in this project |
| `board_post` / `board_read` | the shared board | working |
| `task` | subagents (helpers, **not** council members) | working |
| `background_process` | long runs (gates, renders) | working |
| `schedule_wakeup` / `cron` | deferred/recurring work | working |
| `goal` | session objectives | working |
| `kilo_local_recall` | search past sessions | working |
| `desktop_browser_open` | open a URL in a browser tab | working |
| `desktop_terminal_*`, `desktop_files_open`, `desktop_git_changes_open` | desktop UI hooks | working |
| `notebooks_*` | Jupyter | working |
| `webfetch` / `websearch` | external lookups | working |
| `link_pr` | link a session to a PR | working |

**The one thing I still cannot do:** reach another council session. `session.send` does not exist in this runtime, and the Agent Manager lists only "Reflection" and "Beam" for this project. Cross-seat work therefore flows through **the bulletin and the shared files** — which is the council's normal channel — not through direct messages.

---

## 6 · What this means for the work order

1. **Run Biome before filing JavaScript.** `~/.local/bin/biome check <file>` — it is fast (83 ms/file) and it is the council's agreed style, so lint failures stop at the seat that caused them.
2. **Write diagrams as Mermaid in markdown** (GitHub renders them; no CLI needed). Use `mmdc` only when a standalone SVG/PNG is wanted for a design handoff — and use the private-cache env var.
3. **Python-based MCP servers should now start.** If one does not, check that the server's command is `python` (not `python3.9`) and that the project `.conda` env is not being auto-activated.
4. **Figma remains optional.** Hand Claude the palette, the state list, and the data model as Markdown + Mermaid + a colour table. That is enough to build the visual system.
5. **Do not spend more council time on the Figma OAuth.** The remote route is plan-blocked. The desktop route needs one Owner click plus a Kilo restart, and it is not on the critical path.

**Self-audit (R5):** this note is in my own lane (`_agents/beam/notes/`). No product file touched. No shared document edited. No MCP server started or stopped. The one system change I made was a symlink at `/opt/homebrew/bin/python` (reversible: `rm /opt/homebrew/bin/python`) and a private npm cache dir at `~/.npm-cache-beam`.
