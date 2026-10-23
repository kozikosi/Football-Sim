# The 390 px claim, re-measured on the current build

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: V22-TRUTH-2 slice — the 390 px claim | DATE: 2026-10-22T02:00:00Z**

**Build measured:** `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B — re-measured with `shasum -a 256` and `wc -c` at the time of this note.

> **Measured in the outer repo root** `/Users/kosi/Desktop/Football Sim`. The nested `Football Sim/Football Sim` is a **second git repo** on branch `council-intake`, a day stale, with different copies of every document and a different build — anything measured from there is stale. Check `pwd` before reading or writing.

**Instrument.** **Playwright is available** (1.64.1, with chromium/firefox/webkit downloaded), but the house tool for this check is `tests/e2e-smoke.mjs`, which drives a browser over **CDP**; I used the same instrument — CDP `Emulation.setDeviceMetricsOverride` + `Runtime.evaluate` — so the numbers are comparable with the existing receipts. **This is a fresh measurement, not the 20-Oct number carried forward.**

## The measurement

| | value |
|---|---|
| viewport | **390 × 844, devicePixelRatio 3** |
| `#startSeasonBtn` `getBoundingClientRect()` | **top 963, bottom 1004** (height 41, width 149) |
| `document.documentElement.scrollHeight` | **2,952 px** |
| `window.scrollY` at measurement | 0 (the page was not scrolled) |
| containing view | `#viewDraft` — `display: block`, visible; the button itself `display: inline-block`, `visibility: visible` |
| **is it still below the fold?** | **YES — 119 px below it** (963 − 844 = 119) |

## What the 20-Oct handoff said, and what is still true

| claim (three independent seats, 20 Oct) | now |
|---|---|
| `#startSeasonBtn` at **top 963** | **top 963** — unchanged ✔ |
| bottom 1007 | **1004** — the button is 41 px tall, not 44 (the `!important` strip changed it) |
| **119 px below the fold** in an 844 px viewport | **119 px below the fold** — unchanged ✔ |
| "at the foot of a **7,483 px** page" | **the page is 2,952 px** — the Guide intro panel removal and the `!important` strip cut it by ~4,500 px, and the button is no longer at the foot of anything; it sits at about a third of the way down |

**So the headline number survives: the primary season CTA is still 119 px below the fold on a 390 px phone.** What no longer survives is the *severity* argument around it.

## Is a 390 px P0 still warranted?

**No — downgrade it to P1.** The P0 was written against a page where the button was stranded at the foot of 7,483 px: the user's complaint would have been "I cannot find the button". At 2,952 px the button is **119 px of scrolling away** — a short, obvious scroll from a screen that ends at 844 px. The user reaches it in one flick; the "hidden primary action" failure mode is gone.

**The criterion matters, and the work order should state it explicitly** (today it does not): if the rule is "the primary action must be visible **without scrolling** on a 390 px phone", the check still fails and the fix is a layout nudge (move the CTA up, or shorten the copy above it). If the rule is "the primary action must be **reachable without hunting**", it now passes. Either way the *number* in the work order's P1-28 entry must be re-stated, because it currently quotes a page height of 7,483 px that no longer exists, and a stale context makes a passing check look broken.

**Two things the receipt should carry from now on:** the hash and the date (both change), and the *page height* alongside the button's offset — because the severity of this claim was the page height, not the 119 px.

**What I did not check:** the iPhone SE (375 × 667) and a large-phone (430 × 932) viewport, which would move both the fold and the page height; whether the button is reachable by keyboard or by the on-the-clock path from the draft; and the same measurement on the **v20 reference build**, so the two builds can be compared.

**Verdict in one line: the claim is TRUE as a number (119 px below the fold) and FALSE in its context (a 7,483 px page); the P0 should become a P1 with the corrected figures, and the gate should assert the button's offset **and** the page height together.**
