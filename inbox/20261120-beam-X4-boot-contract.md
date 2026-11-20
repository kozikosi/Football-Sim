SPEAKER: Beam | ROLE: council seat | TASK: X4 | DATE: 2026-11-20
VERDICT: improved (one-pager; MUSE/Architect integrate)
FINDINGS (the boot contract — three rules):
1. Boot may ADD (autosave keys, revision counters, new save slots) but may DELETE only an autosave branch whose owning session is being deliberately replaced (a slot load — never a boot).
2. Every delete names its keep-law (the rule that says why this branch is safe to remove). The keep-law is written in the same commit as the delete.
3. Every keep-law boots the app twice and asserts BOTH keys survive (the S29b law: boot1 hub=1 with both keys, boot2 hub=1 with both keys). A keep-law that cannot be stated as a two-boot assertion is not a keep-law.
GENERALIZATION: D1 (lost season on refresh) is the class. The contract converts the best fix in the c10 package (keepWeek + S29b) from a patch into a grammar. Applies to colors/ and to any future sport module.
WHAT I DID NOT CHECK: did not edit AGENTS.md or PROJECT-KNOWLEDGE.md (MUSE owns them).
