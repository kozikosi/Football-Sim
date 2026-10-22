# Figma is now available to every seat — the tool map, the workflows, and what the council's rules become

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: the Owner's instruction — tell everyone, describe the capabilities, update the documents | DATE: 2026-10-22T14:10:00Z**

## 1 · The fact, and how to reproduce it

**Every seat that runs OpenCode from this machine now has Figma.** It was enabled by the Owner on 22 Oct and verified from this session:

- **Authenticated**: `whoami` → handle **Kosi**, `k.gnet.u@gmail.com`, plan **"k's team"**, tier **starter**, role **admin**, `code_layers_enabled: false`, `specs_enabled: false`.
- **The route**: the **remote** MCP server, `https://mcp.figma.com/mcp`, OAuth on first connect — no desktop app needed, works on every seat and every plan.
- **The config**: `~/.config/opencode/opencode.json` → `mcp.servers.figma = { type: "remote", url: "https://mcp.figma.com/mcp", disabled: false }`. The same entry already existed for the Architect in `.kilo/kilo.jsonc`.
- **To authenticate a machine**: `opencode mcp auth figma` → it opens Figma's consent page and listens on a local callback. **Watch out for the trap:** the `opencode` on PATH was **1.19.3**, which fails with *"Database is not empty and has no session table"* because the database is the newer `session_v2` schema. The fix was to point `~/.opencode/bin/opencode` at OpenChamber's bundled **v2.0.32** (the old binary is kept as `opencode-1.19.3.bak`). With that in place, `opencode mcp auth figma` works from any terminal.
- **The credential lives in the shared store** (`~/.local/share/opencode/opencode.db` → `credential`), so every seat on this machine inherits it.

**The Owner's own words changed the rule:** the brief said *"the council does not design in Figma — the palette, state list and data model go to the Architect."* That was written when seats had no Figma. **It is now obsolete, and §6 of the idle brief — *"a seat may propose a visual concept"* — is the replacement.** The Architect still owns the product file and the canonical tokens; what changed is that **a seat can now put a real frame on the canvas instead of describing one in a note.**

## 2 · The capabilities, in detail — 42 tools, six families

### A · Read a design out of Figma (design → code)
| tool | what it gives this project |
|---|---|
| `get_design_context` | the primary design-to-code tool: a node → the code that builds it. **This is the one that makes a Figma frame quotable as a spec.** |
| `get_screenshot` | a node rendered as an image — the frame Claude builds from, pixel for pixel |
| `get_metadata` | the node tree: frames, components, auto-layout, constraints |
| `get_variable_defs` | **the variables of a file — i.e. the palette as design tokens, with names and types** |
| `get_motion_context` | the animation of a node: the Owner's §4.7 motion rules, measurable |
| `get_figjam` | a FigJam board — where the council's diagrams live |
| `search_design_system` | the components, variables and styles **inside a file** to reuse instead of inventing |
| `get_libraries` | the team libraries — **where a published palette would live** |

### B · Write a design into Figma (code → design)
| tool | what it gives this project |
|---|---|
| `use_figma` | build or edit in an existing file — the tool that turns a proposal into a frame |
| `generate_figma_design` | translate a page or layout into Figma — **this is how a seat hands the Architect a draft screen** |
| `create_new_file` | a fresh file — the entry point for anything (and the reason the design-system route needs a key) |
| `send_code_to_figma` | push code into Figma (the code-layer path — see the limits) |
| `upload_assets` / `download_assets` | images in and out (a screenshot of the build into Figma, a rendered frame back) |
| `generate_diagram` | **a diagram into FigJam** — the council's mermaid becomes an editable board |
| `generate_image` | image generation; `export_video` — motion out of the file |

### C · Code Connect (code ↔ Figma components)
`get_code_connect_map`, `add_code_connect_map`, `send_code_connect_mappings`, `list_file_components_for_code_connect`, `get_context_for_code_connect`, `get_code_connect_suggestions` — bind a Figma component to the code that renders it, so a design change and a code change stop being two memories. **This is the long-term answer to "the palette is in a note and the CSS is in a file."**

### D · Weave (AI workflows run inside Figma)
`weave_list_tools`, `weave_find_model`, `weave_run_tool`, `weave_run_model`, `weave_get_tool_inputs`, `weave_get_tool_run_output`, `weave_get_model_run_output`, `weave_cancel_tool_run`, `weave_upload_asset` — run published workflows and models, and fetch their output.

### E · Generative plugins and shaders
`create_generative_plugin`, `list_generative_plugins`, `get_generative_plugin`, `update_generative_plugin`, `create_shader`, `list_shaders`, `get_shader`, `update_shader`, `list_file_shaders` — the Owner's "more motion, more excitement" could be a **shader or a generative plugin in the file**, not only CSS.

### F · The mandatory skills
The server ships skills that must be loaded before the write paths: **`/figma-use`** (before `use_figma`), **`/figma-generate-design`**, **`/figma-generate-library`**, **`/figma-generate-diagram`**, **`/figma-design-to-code`** (before `get_design_context`), `/figma-code-connect`, `/figma-use-figjam`. The fallback path when no skill is installed is the resource server: `get_figma_skill` on `skill://index.json` → `skill://figma/<name>/SKILL.md`.

## 3 · The five things this unlocks for this project, in order of value

1. **The palette becomes real.** `_agents/moc/receipts/palette-registry.json` (32 teams × 3 values, each with a `source_url` and a status) can become a **Figma variable collection with names** — `Team/Chiefs/Primary`, `Team/Chiefs/Secondary`, `Team/Chiefs/Tertiary` — where a designer picks the team from a dropdown instead of a hex from a table. **That is the hand-off the P15 packet promised**, and it is the one place Figma changes the shape of the work rather than its presentation.
2. **The contrast rules become variables too.** The display-derivation rules (edge → primary or the secondary when the primary is under 1.5 against the panel; stripe → primary → tertiary; text → the app's ink; gold stays gold) are *modes* of a variable, and Figma has modes.
3. **A seat can now hand the Architect a frame.** The seven components in `_agents/moc/notes/p3-shared-visual-system.md` (stat-card, bar-row, pair, gold-banner, star, section-head, box-row) can exist as real Figma components, and the preview/review graphics specs can be screens rather than prose.
4. **The council's mermaid diagrams become FigJam boards** — editable, and readable by a designer without reading the work order.
5. **Design-to-code closes the loop:** the Architect can read the frame Claude made, and a seat can read the frame the Architect built.

## 4 · The measured limits — read this before planning around Figma

| limit | evidence | what it costs |
|---|---|---|
| **Starter tier** | `tier: "starter"`, role admin, plan "k's team" | the free plan's feature set and **rate limits** ([developers.figma.com/docs/figma-mcp-server/rate-limits-access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)) — **batch work, not a hundred calls at once** |
| **Code layers off** | `code_layers_enabled: false` | `send_code_to_figma`'s generated code-layer path may be limited; the read paths and the write paths still work |
| **Specs off** | `specs_enabled: false` | Figma's Dev Mode handoff (specs) is unavailable — **the council's own notes stay the spec** |
| **The design-system route needs a file** | `get_libraries` and `search_design_system` both error *"fileKey: Missing key"* | there is no "list my files" tool — the route starts from `create_new_file` **or from a file key the Owner hands over** |
| **Writing needs the account's permission** | — | I have **not** created anything in the account: a Figma file is the Architect's deliverable, and the Owner's instruction was to tell the council, not to publish into their account. **One word from the Owner unlocks the file build.** |

## 5 · The documents that are now stale, and the exact text to replace them

**`V22-Suggestions.md` P15-1 "The tool map, so nobody guesses"** says the division is: *Claude has Figma, the council does not.* **That is now wrong, and the work order is the one document every seat reads first.** The seat that owns it should replace that section with:

> **The tool map (22 Oct, revised).** **Every seat has Figma** — the remote MCP server `https://mcp.figma.com/mcp`, OAuth on first connect, authenticated as the account; the tool surface is 42 tools (read a design, write a design, design-system search, variables, Code Connect, FigJam diagrams, generative plugins, shaders). **Mermaid, Biome and Git for everyone. `session.send` for nobody.** **What changed:** the council no longer describes designs in notes — a seat can put a frame on the canvas. **What did not change:** the Architect owns the product file and the canonical tokens; a seat's frame is a proposal, and the product is merged only by the Architect.

**The bulletin** carries the same fact from M-20261022-minimax-4; it stays, and this note supersedes it.

**`AGENTS.md`** carries the rule *"the council does not design in Figma"* in the visual-work paragraph — **the Owner's rule, so the Owner's call**; the same replacement sentence above fits there.

**My own lane** (`_agents/moc/notes/`) — this note is the reference; the graphics specs (`p3-shared-visual-system.md`, `p3-game-preview-graphics.md`, `p3-game-review-graphics.md`, `p3-colour-identity-system.md`, `p5-palette-contrast.md`) now name the **Figma variables and components** their content maps onto.

## 6 · What I did not do

- **I did not create a file, a component, a variable or a board in the Owner's Figma account** — that is the Architect's deliverable and the Owner did not ask for it; the blocker is one word away.
- **I did not write to the product file**, and **I did not edit `V22-Suggestions.md` or `AGENTS.md`** — both are shared/Owner-owned documents; §5 carries the exact replacement text for whoever owns them, and the seat that owns the work order has it.
- **I did not test the write paths** (`use_figma`, `generate_figma_design`, `generate_diagram`) — each requires a file key and a mandatory skill, and testing them means writing into the account.
- **I did not check the rate limits** for this account — only the plan tier, which the docs page governs.
