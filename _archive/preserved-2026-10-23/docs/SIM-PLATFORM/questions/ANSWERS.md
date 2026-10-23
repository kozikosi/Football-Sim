# ANSWERS.md — the Owner's recorded concept answers

**Append-only.** Each entry is an Owner decision input for the Architect and the council. The
generator (`tools/owner-questions.mjs`) reads this file to know which questions are answered, so
**keep the `## Q-OWNER-nn` heading format** if you add an entry by hand.

Format:

```markdown
## Q-OWNER-03 — The NBA's flex

- **Answered:** 2026-10-20
- **By:** Owner
- **Area:** flex-and-lineup · **Priority:** blocking
- **Question:** <the question, copied>
- **Answer:** <the answer>
```

The queue lives in `OWNER-QUESTIONS.md` (generated). This file is the record.

---

## No answers recorded yet

The first entry goes here — either write it in this format, or let the tool do it:

```
node tools/owner-questions.mjs --answer Q-OWNER-45 "your answer"
```
