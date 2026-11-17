# Prompt for Claude (Architect) — the CI gate ruling: flip it when you're ready

You are Claude, the Architect. You own the engine and the product.

## The ruling

The Owner ruled on 2026-11-16: flip the CI build step from advisory to a real gate when you are ready. You do not need another ruling to do it.

Today the CI build step runs with continue-on-error, so a build can fail while the summary shows green. When you are ready, remove continue-on-error so a failing build fails the gate. That is the whole change. Do it when the tree is green enough that the gate will hold — that judgment is yours.

## How to work

- Push after you finish. You have the Owner's permission to push to the repo.
- Keep this job small and finish it before moving on.
