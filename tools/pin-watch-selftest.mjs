#!/usr/bin/env node
// tools/pin-watch-selftest.mjs — the falsifier for tools/pin-watch.mjs.
//
// A gate that cannot fail is not a gate. This builds throwaway git repositories with
// known-good and known-bad pin situations and asserts the tool's exit code AND the
// line it prints. If pin-watch ever returns 0 unconditionally, scenarios 2–7 fail here.
//
//   node tools/pin-watch-selftest.mjs
//
// Exit 0: every scenario behaved as specified. Exit 1: at least one did not.

import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const TOOL = join(HERE, 'pin-watch.mjs')

const results = []
function check(name, cond, detail) {
  results.push({ name, ok: !!cond, detail })
  console.log(`${cond ? 'PASS' : 'FAIL'} ${name}${cond ? '' : ` — ${detail}`}`)
}

function run(args, cwd) {
  const r = spawnSync('node', [TOOL, ...args], { cwd, encoding: 'utf8' })
  return { code: r.status, out: `${r.stdout || ''}${r.stderr || ''}` }
}

function git(cwd, args) {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8' })
  if (r.status !== 0) throw new Error(`git ${args.join(' ')}: ${r.stderr}`)
  return r.stdout.trim()
}

function repo(files) {
  const dir = mkdtempSync(join(tmpdir(), 'pin-watch-'))
  git(dir, ['init', '-q'])
  git(dir, ['config', 'user.email', 'selftest@example.invalid'])
  git(dir, ['config', 'user.name', 'pin-watch selftest'])
  for (const [p, body] of Object.entries(files)) {
    mkdirSync(join(dir, dirname(p)), { recursive: true })
    writeFileSync(join(dir, p), body)
  }
  git(dir, ['add', '-A'])
  git(dir, ['commit', '-q', '-m', 'fixture'])
  return dir
}

function commitAll(dir, msg) {
  git(dir, ['add', '-A'])
  git(dir, ['commit', '-q', '-m', msg])
  return git(dir, ['rev-parse', 'HEAD'])
}

const dirs = []
try {
  // ---------- scenario 1: clean pair passes -----------------------------------
  const base = { 'colors/src/a.ts': 'export const a = 1\n', 'colors/src/b.ts': 'export const b = 2\n', 'colors/src/c.ts': 'export const c = 3\n' }
  const good = repo(base)
  dirs.push(good)
  const pin1 = git(good, ['rev-parse', 'HEAD'])
  let r = run(['--tree', `${pin1}:colors/src`, '--pin', pin1, '--pin-path', 'colors/src'], good)
  check('clean pair exits 0', r.code === 0, `exit ${r.code}\n${r.out}`)
  check('clean pair prints PASS and the count', /PASS/.test(r.out) && /count: tree 3 \.ts files, pin 3/.test(r.out), r.out)

  // ---------- scenario 2: a file added to the tree (the live gh-pages case) ----
  writeFileSync(join(good, 'colors/src/d.ts'), 'export const d = 4\n')
  const tip2 = commitAll(good, 'add d')
  r = run(['--tree', `${tip2}:colors/src`, '--pin', pin1, '--pin-path', 'colors/src'], good)
  check('extra tree file exits 1', r.code === 1, `exit ${r.code}\n${r.out}`)
  check('extra tree file names the count mismatch', /FAIL count: tree 4 \.ts files, pin 3/.test(r.out), r.out)

  // ---------- scenario 3: same count, one file changed (a silent re-pin) -------
  const repin = repo(base)
  dirs.push(repin)
  const pin3 = git(repin, ['rev-parse', 'HEAD'])
  writeFileSync(join(repin, 'colors/src/b.ts'), 'export const b = 999\n')
  const tip3 = commitAll(repin, 'silent re-pin')
  r = run(['--tree', `${tip3}:colors/src`, '--pin', pin3, '--pin-path', 'colors/src'], repin)
  check('same-count re-pin exits 1', r.code === 1, `exit ${r.code}\n${r.out}`)
  check('same-count re-pin names the changed file', /FAIL spot-hash: b\.ts: tree \w+ != pin \w+/.test(r.out), r.out)
  check('same-count re-pin keeps the count check green', /ok   count/.test(r.out), r.out)

  // ---------- scenario 4: anchor missing (a moved anchor must not be green) ---
  const docRepo = repo({ ...base, 'colors/src/README.md': '# tree\n\nno pin line here\n' })
  dirs.push(docRepo)
  const pin4 = git(docRepo, ['rev-parse', 'HEAD'])
  r = run(
    ['--tree', `${pin4}:colors/src`, '--pin-from', `${pin4}:colors/src/README.md`, '--anchor', 'Pinned engine commit:', '--pin-path', 'colors/src'],
    docRepo,
  )
  check('missing anchor exits 1', r.code === 1, `exit ${r.code}\n${r.out}`)
  check('missing anchor names the file and the anchor', /anchor not found/.test(r.out) && /README\.md/.test(r.out) && /Pinned engine commit:/.test(r.out), r.out)

  // ---------- scenario 5: anchor ambiguous ------------------------------------
  const ambRepo = repo({ ...base, 'colors/src/README.md': 'Pinned engine commit: `aaaaaaa`\nPinned engine commit: `bbbbbbb`\n' })
  dirs.push(ambRepo)
  const pin5 = git(ambRepo, ['rev-parse', 'HEAD'])
  r = run(
    ['--tree', `${pin5}:colors/src`, '--pin-from', `${pin5}:colors/src/README.md`, '--anchor', 'Pinned engine commit:', '--pin-path', 'colors/src'],
    ambRepo,
  )
  check('ambiguous anchor exits 1', r.code === 1, `exit ${r.code}\n${r.out}`)
  check('ambiguous anchor is named, both lines shown', /ambiguous/.test(r.out) && /line 1/.test(r.out) && /line 2/.test(r.out), r.out)

  // ---------- scenario 6: anchor present, no commit in the line --------------
  const noHex = repo({ ...base, 'colors/src/README.md': 'Pinned engine commit: old one\n' })
  dirs.push(noHex)
  const pin6 = git(noHex, ['rev-parse', 'HEAD'])
  r = run(
    ['--tree', `${pin6}:colors/src`, '--pin-from', `${pin6}:colors/src/README.md`, '--anchor', 'Pinned engine commit:', '--pin-path', 'colors/src'],
    noHex,
  )
  check('anchor without a commit exits 1', r.code === 1, `exit ${r.code}\n${r.out}`)
  check('anchor without a commit says so', /carries no hex commit/.test(r.out), r.out)

  // ---------- scenario 7: the document names the right pin -------------------
  const docOk = repo({ ...base, 'colors/src/README.md': 'Pinned engine commit: `PIN` on architect/engine-and-seats\n' })
  dirs.push(docOk)
  const pin7 = git(docOk, ['rev-parse', 'HEAD'])
  writeFileSync(join(docOk, 'colors/src/README.md'), `Pinned engine commit: \`${pin7}\` on architect/engine-and-seats\n`)
  const tip7 = commitAll(docOk, 'doc names the pin it carries')
  r = run(
    ['--tree', `${tip7}:colors/src`, '--pin-from', `${tip7}:colors/src/README.md`, '--anchor', 'Pinned engine commit:', '--pin-path', 'colors/src'],
    docOk,
  )
  check('document naming its own pin exits 0', r.code === 0, `exit ${r.code}\n${r.out}`)

  // ---------- scenario 8: unreachable pin is a failure, not a crash ----------
  r = run(['--tree', `${pin1}:colors/src`, '--pin', 'deadbeefdeadbeef', '--pin-path', 'colors/src'], good)
  check('unresolvable pin exits 1', r.code === 1, `exit ${r.code}\n${r.out}`)
  check('unresolvable pin is named', /cannot resolve pin commit deadbeef/.test(r.out), r.out)
} finally {
  for (const d of dirs) {
    try {
      rmSync(d, { recursive: true, force: true })
    } catch {}
  }
}

const failed = results.filter((x) => !x.ok)
console.log(`\n${results.length - failed.length}/${results.length} assertions passed`)
process.exit(failed.length ? 1 : 0)
