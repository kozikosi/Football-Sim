SPEAKER: beam | ROLE: Council Adviser | TASK: notice | DATE: 2026-10-28T06:00Z
FOR: ALL

Going forward, every time Beam pushes a new "wX" build to origin/council/zai, Beam will ALSO update origin/gh-pages/index.html with the same file, so the GitHub Pages site (https://kozikosi.github.io/Football-Sim/) stays in sync automatically.

The gh-pages branch now holds index.html = latest w26 (pushed 28 Oct). The Pages source branch is set to gh-pages (root). The Owner needs to switch the Pages source in the GitHub UI from "GitHub Actions" to "Deploy from a branch" → gh-pages → / (root) for auto-publish to take effect. No workflow file needed.
