#!/usr/bin/env node
// tools/pin-watch.mjs — does a packaged tree's engine match the pin its own documents name?
//
//   node tools/pin-watch.mjs --tree origin/gh-pages:67-cakepanz/src/engine \
//                            --pin-from origin/gh-pages:67-cakepanz/README.md \
//                            --anchor "Pinned engine commit:" \
//                            --pin-path colors/src
//
//   node tools/pin-watch.mjs --tree <rev>:<dir> --pin <commit> --pin-path <dir>
//
// Checks, in this order (Ernie, 2026-11-17T22:57Z):
//   1. COUNT      the <ext> file count under <tree> vs the same at <pin>:<pin-path>.
//   2. SPOT HASH  three files (first, middle, last by path), byte-compared tree vs pin.
//
// A manifest hash is NEVER the check: the manifest is the thing that goes stale.
// When --pin-from is used, the anchor must be present exactly once and carry a hex
// commit; a moved anchor is a FAIL that names the file and the anchor, never a green.
//
// Exit: 0 pass · 1 fail (mismatch, missing anchor, unresolvable commit) · 2 usage.
//
// Only reads git objects. No network, no working-tree bytes, no build step.

import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'

const OUT = 'pin-watch:'
const EXIT = { pass: 0, fail: 1, usage: 2 }

function usage(msg) {
  if (msg) console.error(`${OUT} ${msg}`)
  console.error(
    `${OUT} usage: node tools/pin-watch.mjs --tree <rev>:<dir> (--pin <commit> | ` +
      `--pin-from <rev>:<file> --anchor "<text>") --pin-path <dir> ` +
      `[--ext .ts] [--files 3] [--repo .] [--json]`,
  )
  process.exit(EXIT.usage)
}

function parseArgs(argv) {
  const a = { ext: '.ts', files: 3, repo: '.', json: false }
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i]
    const v = () => {
      const x = argv[++i]
      if (x === undefined) usage(`${k} needs a value`)
      return x
    }
    switch (k) {
      case '--tree':
        a.tree = v()
        break
      case '--pin':
        a.pin = v()
        break
      case '--pin-from':
        a.pinFrom = v()
        break
      case '--anchor':
        a.anchor = v()
        break
      case '--pin-path':
        a.pinPath = v()
        break
      case '--ext':
        a.ext = v()
        break
      case '--files':
        a.files = Number(v())
        if (!Number.isInteger(a.files) || a.files < 1) usage('--files must be a positive integer')
        break
      case '--repo':
        a.repo = v()
        break
      case '--json':
        a.json = true
        break
      case '-h':
      case '--help':
        usage()
        break
      default:
        usage(`unknown argument ${k}`)
    }
  }
  if (!a.tree) usage('--tree is required')
  if (!a.pinFrom && !a.pin) usage('one of --pin or --pin-from is required')
  if (a.pinFrom && !a.anchor) usage('--anchor is required with --pin-from')
  if (!a.pinPath) usage('--pin-path is required')
  return a
}

function git(repo, args, encoding = 'utf8') {
  const r = spawnSync('git', args, { cwd: repo, encoding, maxBuffer: 128 * 1024 * 1024 })
  if (r.error) throw new Error(`git ${args[0]}: ${r.error.message}`)
  return { code: r.status, out: r.stdout, err: r.stderr }
}

function revParse(repo, rev) {
  const r = git(repo, ['rev-parse', '--verify', '--quiet', `${rev}^{commit}`])
  if (r.code !== 0) return null
  return r.out.trim()
}

function listFiles(repo, spec, ext) {
  const r = git(repo, ['ls-tree', '-r', '--name-only', spec])
  if (r.code !== 0) return null
  return r.out
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((p) => p.endsWith(ext))
    .sort()
}

function blobSha(repo, spec) {
  const r = git(repo, ['cat-file', 'blob', spec], 'buffer')
  if (r.code !== 0) return null
  return createHash('sha256').update(r.out).digest('hex')
}

// first, middle, last — deterministic, so a receipt can name the same three files.
function pick(files, n) {
  if (files.length <= n) return files.slice()
  const out = []
  const seen = new Set()
  for (let i = 0; i < n; i++) {
    const idx = n === 1 ? 0 : Math.round((i * (files.length - 1)) / (n - 1))
    if (!seen.has(idx)) {
      seen.add(idx)
      out.push(files[idx])
    }
  }
  return out
}

function main() {
  const a = parseArgs(process.argv.slice(2))
  const findings = []
  const fail = (code, detail) => {
    findings.push({ ok: false, check: code, detail })
  }

  // ---- 0. resolve the two sides -------------------------------------------------
  const treeRev = a.tree.slice(0, a.tree.lastIndexOf(':'))
  const treeDir = a.tree.slice(a.tree.lastIndexOf(':') + 1)
  if (!treeRev || !treeDir) usage('--tree must be <rev>:<dir>')

  const treeCommit = revParse(a.repo, treeRev)
  if (!treeCommit) {
    console.error(`${OUT} FAIL cannot resolve --tree rev ${treeRev}`)
    process.exit(EXIT.fail)
  }

  // ---- 1. the pin: declared, or read from the document it lives in --------------
  let pin = a.pin
  let anchorLine = null
  if (a.pinFrom) {
    const docRev = a.pinFrom.slice(0, a.pinFrom.lastIndexOf(':'))
    const docPath = a.pinFrom.slice(a.pinFrom.lastIndexOf(':') + 1)
    if (!revParse(a.repo, docRev)) {
      console.error(`${OUT} FAIL cannot resolve --pin-from rev ${docRev}`)
      process.exit(EXIT.fail)
    }
    const r = git(a.repo, ['show', `${docRev}:${docPath}`])
    if (r.code !== 0) {
      console.error(`${OUT} FAIL cannot read ${a.pinFrom} (file not at that rev)`)
      process.exit(EXIT.fail)
    }
    const lines = r.out.split('\n')
    const hits = []
    for (let i = 0; i < lines.length; i++) {
      const at = lines[i].indexOf(a.anchor)
      if (at >= 0) hits.push({ line: i + 1, text: lines[i].trim() })
    }
    if (hits.length === 0) {
      console.error(`${OUT} FAIL anchor not found`)
      console.error(`${OUT}   file:   ${a.pinFrom}`)
      console.error(`${OUT}   anchor: ${JSON.stringify(a.anchor)}`)
      console.error(`${OUT}   a moved anchor is a failure, not a pass — fix the anchor or the document`)
      process.exit(EXIT.fail)
    }
    if (hits.length > 1) {
      console.error(`${OUT} FAIL anchor is ambiguous (${hits.length} hits)`)
      console.error(`${OUT}   file:   ${a.pinFrom}`)
      console.error(`${OUT}   anchor: ${JSON.stringify(a.anchor)}`)
      for (const h of hits) console.error(`${OUT}   line ${h.line}: ${h.text}`)
      process.exit(EXIT.fail)
    }
    anchorLine = hits[0]
    const m = anchorLine.text.match(/\b([0-9a-f]{7,40})\b/)
    if (!m) {
      console.error(`${OUT} FAIL anchor found but carries no hex commit`)
      console.error(`${OUT}   file:   ${a.pinFrom}`)
      console.error(`${OUT}   anchor: ${JSON.stringify(a.anchor)}`)
      console.error(`${OUT}   line ${anchorLine.line}: ${anchorLine.text}`)
      process.exit(EXIT.fail)
    }
    pin = m[1]
  }

  const pinCommit = revParse(a.repo, pin)
  if (!pinCommit) {
    console.error(`${OUT} FAIL cannot resolve pin commit ${pin}`)
    process.exit(EXIT.fail)
  }

  // ---- 2. COUNT -----------------------------------------------------------------
  const treeFiles = listFiles(a.repo, `${treeCommit}:${treeDir}`, a.ext)
  const pinFiles = listFiles(a.repo, `${pinCommit}:${a.pinPath}`, a.ext)
  if (treeFiles === null) {
    console.error(`${OUT} FAIL ${treeCommit}:${treeDir} is not a directory at ${treeCommit.slice(0, 8)}`)
    process.exit(EXIT.fail)
  }
  if (pinFiles === null) {
    console.error(`${OUT} FAIL ${pinCommit.slice(0, 8)}:${a.pinPath} is not a directory`)
    process.exit(EXIT.fail)
  }

  const countOk = treeFiles.length === pinFiles.length
  findings.push({
    ok: countOk,
    check: 'count',
    detail: `tree ${treeFiles.length} ${a.ext} files, pin ${pinFiles.length} at ${pinCommit.slice(0, 8)}:${a.pinPath}`,
  })

  // ---- 3. SPOT HASH -------------------------------------------------------------
  const pinSet = new Set(pinFiles)
  const picked = pinFiles.length ? pick(pinFiles, a.files) : []
  for (const rel of picked) {
    if (!treeFiles.includes(rel)) {
      findings.push({ ok: false, check: 'spot-hash', detail: `${rel}: present at pin, absent from tree` })
      continue
    }
    const want = blobSha(a.repo, `${pinCommit}:${a.pinPath}/${rel}`)
    const got = blobSha(a.repo, `${treeCommit}:${treeDir}/${rel}`)
    if (want === null || got === null) {
      findings.push({ ok: false, check: 'spot-hash', detail: `${rel}: blob unreadable` })
      continue
    }
    findings.push({
      ok: want === got,
      check: 'spot-hash',
      detail: `${rel}: tree ${got.slice(0, 12)} ${want === got ? '=' : '!='} pin ${want.slice(0, 12)}`,
    })
  }
  // same-count re-pin guard: a file in the tree that is not at the pin.
  for (const rel of treeFiles) {
    if (!pinSet.has(rel)) {
      findings.push({ ok: false, check: 'tree-only-file', detail: `${rel}: present in tree, absent at pin` })
    }
  }

  const passed = findings.every((f) => f.ok)
  const report = {
    ok: passed,
    tree: `${treeCommit.slice(0, 8)}:${treeDir}`,
    pin: `${pinCommit.slice(0, 8)}`,
    pinSource: a.pinFrom ? `${a.pinFrom} (anchor line ${anchorLine?.line})` : `${a.pin}`,
    pinPath: a.pinPath,
    ext: a.ext,
    checks: findings,
    note: 'manifest hashes are deliberately not consulted: the manifest is what goes stale',
  }

  if (a.json) {
    console.log(JSON.stringify(report, null, 2))
  } else {
    console.log(`${OUT} ${passed ? 'PASS' : 'FAIL'} tree ${treeCommit.slice(0, 8)}:${treeDir}`)
    console.log(`${OUT} pin ${pinCommit.slice(0, 8)} (${report.pinSource})`)
    for (const f of findings) console.log(`${OUT}   ${f.ok ? 'ok  ' : 'FAIL'} ${f.check}: ${f.detail}`)
    console.log(`${OUT} note: ${report.note}`)
  }
  process.exit(passed ? EXIT.pass : EXIT.fail)
}

main()
