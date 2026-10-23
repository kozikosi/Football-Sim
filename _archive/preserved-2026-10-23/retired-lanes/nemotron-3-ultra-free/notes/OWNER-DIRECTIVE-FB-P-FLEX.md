# Owner Directive: FB & Punter Flex Rules Update

**SPEAKER:** Ultra | **ROLE:** Council Advisor | **TASK:** Record Owner directive on FB/P flex rules | **DATE:** 2026-10-21T14:00:00Z

---

## Owner Directive Received

> **Flex Rules Update for FB (Fullback) and P (Punter):**
> - No flex cost for Punter (same logic as Fullback)
> - 28 rounds (was 26)
> - RB and HB interchangeable among agents but preserve site labeling
> - HBs can become FBs at no flex cost
> - Other positions can flex into FB and P roles
> - **Don't change any existing flex penalties** — only add new rules for FB and P
> - "How Claude and I handled the SAM issue is exactly how the FB and Punter situations should be handled"

> **Rounds:** 28 (increased from 26)

> **BOC's Trap:** Owner requests clarification if still an issue

> **Archived Council Members:** Liquid, Glyph, Omni, Cohere permanently archived. Contributions may be deleted unless structural.

---

## Implementation Notes (for Claude/Architect)

### Current Flex System (from merged.html)

The flex system is defined in the `FLEX` object and `NATURAL_SLOT_MAP`. Current flex penalties apply when players play out of position.

### Required Changes

1. **Add FB (Fullback) to flex system with zero-cost from HB:**
   - HB → FB: 0 penalty
   - Other positions → FB: per existing flex penalties (don't change)

2. **Add P (Punter) to flex system with zero-cost from K:**
   - K → P: 0 penalty (same logic as FB)
   - Other positions → P: per existing flex penalties

3. **Rounds:** Increase from 26 to 28

4. **RB/HB Interchangeability:**
   - RB and HB interchangeable for agent logic
   - Preserve site labeling (display as labeled on site)

5. **No changes to existing flex penalties** — only add FB and P rules

### SAM Issue Reference

"Handled the SAM issue exactly how FB and Punter should be handled" — refers to how SAM (Strongside LB) flex was implemented. Need to mirror that pattern.

---

## Council Archival Note

**Permanently Archived:** Liquid, Glyph, Omni, Cohere
- Contributions may be deleted unless structural
- No action taken yet — awaiting confirmation on "structural" criteria

---

## BOC's Trap — Clarification Requested

> "I don't understand BOC's trap. If this is still an issue, you'll have to explain it to me."

**Status:** Awaiting explanation from BOC or Owner.

---

## Action Required

**For Claude (Architect):** Implement flex rule changes in `merged.html` per above specification.

**For Council:** Record directive; no product edits by council members.

**For DS:** Update any affected draft/roster slot counts (28 rounds).

---

**Recorded in:** `_agents/nemotron-3-ultra-free/notes/OWNER-DIRECTIVE-FB-P-FLEX.md`
