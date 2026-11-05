# Incidents — the honest register

What happened / how it was detected / what changed. Failures stay here next to the wins;
that is the point. (Format follow-up: every entry ends with the gate or law it produced.)

## 1. The w69 ledger overclaim

- **What happened:** the w69 work report said six fixes shipped. Two had.
- **How detected:** the w70 audit re-checked the previous wave's claims against the
  artifact before building on them (this re-check is itself a standing chore).
- **What changed:** the fixes landed in w70; the **delivery gate** became law — no work
  report counts without a download link and a verified md5. The story is told in full in
  [how-a-wave-ships.md](how-a-wave-ships.md).

## 2. The message-loss incident (the paused chat)

- **What happened:** a chat was paused mid-session and its end-of-chat state block (the
  seat's anti-amnesia memory) was lost with it — a whole session's last-known-state.
- **How detected:** the next session woke up, read a state block that was one wave behind
  the artifacts, and the product file's hash did not match any pin in the state block.
- **What changed:** the session recovered the lost state from the bytes on the Owner's own
  branches (`council/vl`, `council/uk`) instead of re-deriving history — and the fallback
  chain in the seat's workflow doc was rewritten to say **check the Owner's branches
  before declaring anything missing**, because that hunt had failed once before by only
  searching one branch. Recovery was complete: no wave was lost, only time.

## 3. The forkSeed tie-break golden shift

- **What happened:** an audit reordered the draft board's weights; a CPU team then took a
  different player at the same seed, and a pinned golden test shifted.
- **How detected:** the test suite flagged the changed golden output within the run.
- **What changed:** the golden was **re-pinned on purpose, with the reason written next to
  the pin** (audited reorder, not engine drift), and the rule was recorded: a golden file
  changes only with a written reason in the same diff. A golden that never explains itself
  trains everyone to re-pin blindly.

## 4. The w54 hunt failure (looking in one place)

- **What happened:** a session declared a wave "missing" after searching only the seat's
  own branch. The bytes were on the Owner's branches the whole time.
- **How detected:** the Owner pointed at the branch he had pushed.
- **What changed:** the fallback chain gained the explicit rule (see incident 2): search
  **all** Owner branches before saying a wave is missing; verify hashes, never locations.

## 5. The silent quote that ate a style block

- **What happened:** a patch generator emitted one stray quote; an entire CSS block went
  dead in the shipped artifact. Nothing crashed; the page just quietly lost its styling.
- **How detected:** the wave battery's style assertions failed on the regenerated artifact.
- **What changed:** two new **post-checks at the generator**: per-style-block quote parity
  (every block's quotes balance) and a cascade sentinel (an assertion that the new rules
  are actually reachable in the shipped CSS). The class of bug — silent CSS death — is now
  gated at the generator, not caught by eye after ship.

## Known open debts (the register we keep on purpose)

The debt inventories (v1 at w68, v2a at w71) are the standing register of known debt in
the retired shell — 43 `Math.random` lines (62 occurrences), 185 `window.*` sites, 22
dunder flags, 4 key families — with per-item rulings on what dies with the shell and what
ports as a law into the rebuild. Debt is not shameful; unrecorded debt is.
