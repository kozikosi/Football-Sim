#!/usr/bin/env python3
"""Round-2 protocol reflow across the seven Z.ai arms (2026-11-13 wave).

Steps per arm:
  1. sha256 manifest of arm-owned files  -> round2/manifests/before-<arm>.sha256
  2. resync the canonical contract into the arm's contract dir (v1-5f, spread included)
  3. rebuild (arm's own `npm run build` / `npm run generate`)
  4. sha256 manifest again               -> round2/manifests/after-<arm>.sha256
  5. diff before/after -> must be ZERO changed arm-owned files
Plus:
  - cross-arm contract byte-identity check (diff -r semantics via hashes)
  - leakage audit over arm-owned code
Arm-owned = everything in the arm dir EXCEPT node_modules, framework build dirs,
and the vendored engine-contract copy (which is contract, not arm-owned).
"""
import hashlib, json, os, shutil, subprocess, sys, time

ROOT = "/home/z/my-project/work/fwtest-7"
R2 = os.path.join(ROOT, "round2")
os.makedirs(os.path.join(R2, "manifests"), exist_ok=True)
os.makedirs(os.path.join(R2, "logs"), exist_ok=True)

ARMS = {
    "arm-svelte":     {"build": ["npm", "run", "build"],    "contract": "src/engine-contract"},
    "arm-sveltekit":  {"build": ["npm", "run", "build"],    "contract": "src/lib/engine-contract"},
    "arm-react":      {"build": ["npm", "run", "build"],    "contract": "src/engine-contract"},
    "arm-vue":        {"build": ["npm", "run", "build"],    "contract": "src/engine-contract"},
    "arm-solidstart": {"build": ["npm", "run", "build"],    "contract": "src/engine-contract"},
    "arm-next":       {"build": ["npm", "run", "build"],    "contract": "src/engine-contract"},
    "arm-nuxt":       {"build": ["npm", "run", "generate"], "contract": "app/engine-contract"},
}
SKIP_DIRS = {"node_modules", ".next", "out", ".output", ".nuxt", ".nuxt-dev", ".svelte-kit",
             ".nitro", ".cache", "dist", "build", ".vinxi", ".vercel", ".turbo"}
CONTRACT_DIRNAME = "engine-contract"

CONTRACT_FILES = [
    "PROVENANCE.md", "engine-contract.md", "index.ts", "package.json",
    "package-lock.json", "tsconfig.json", "tsc-baseline.json",
    "fixtures/golden.json",
]
CONTRACT_SRC = "src"

def is_contract_path(rel: str) -> bool:
    for arm, cfg in ARMS.items():
        if rel.startswith(cfg["contract"] + os.sep):
            return True
    return False

def walk_owned(arm: str):
    """Yield arm-owned relative paths (excludes contract copy + build dirs)."""
    adir = os.path.join(ROOT, arm)
    cdir = ARMS[arm]["contract"]
    for dirpath, dirnames, filenames in os.walk(adir):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, adir)
            top = rel.split(os.sep)[0]
            if top == CONTRACT_DIRNAME or rel.startswith(cdir.replace("/", os.sep) + os.sep) \
               or (cdir in rel.split(os.sep)):
                continue
            yield rel

def manifest(arm: str, tag: str):
    lines = []
    for rel in sorted(walk_owned(arm)):
        h = hashlib.sha256(open(os.path.join(ROOT, arm, rel), "rb").read()).hexdigest()
        lines.append(f"{h}  {rel}")
    out = os.path.join(R2, "manifests", f"{tag}-{arm}.sha256")
    open(out, "w").write("\n".join(lines) + "\n")
    return out

def resync(arm: str):
    """Copy the canonical contract into the arm's contract dir (exact file set)."""
    src = os.path.join(ROOT, "engine-contract")
    dst = os.path.join(ROOT, arm, ARMS[arm]["contract"])
    for rel in CONTRACT_FILES:
        s = os.path.join(src, rel)
        if os.path.exists(s):
            d = os.path.join(dst, rel)
            os.makedirs(os.path.dirname(d), exist_ok=True)
            shutil.copyfile(s, d)
    # src tree: remove arm copy of contract src, copy canonical
    dsrc = os.path.join(dst, CONTRACT_SRC)
    if os.path.exists(dsrc):
        shutil.rmtree(dsrc)
    shutil.copytree(os.path.join(src, CONTRACT_SRC), dsrc)

def build(arm: str):
    log = os.path.join(R2, "logs", f"build-{arm}.log")
    t0 = time.time()
    p = subprocess.run(ARMS[arm]["build"], cwd=os.path.join(ROOT, arm),
                       capture_output=True, text=True, timeout=900)
    dt = time.time() - t0
    with open(log, "w") as f:
        f.write(p.stdout)
        f.write(p.stderr)
    return p.returncode, dt

def contract_hashes(arm: str):
    """Hash every file in the arm's contract copy (for cross-arm identity)."""
    dst = os.path.join(ROOT, arm, ARMS[arm]["contract"])
    out = {}
    for dirpath, dirnames, filenames in os.walk(dst):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in sorted(filenames):
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, dst)
            out[rel] = hashlib.sha256(open(full, "rb").read()).hexdigest()
    return out

def main():
    report = {"arms": {}, "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}

    # 1. before manifests
    for arm in ARMS:
        manifest(arm, "before")

    # 2. resync (canonical v1-5f contract into every arm)
    for arm in ARMS:
        resync(arm)

    # 3+4. rebuild + after manifests (sequential for clean timings)
    builds = {}
    for arm in ARMS:
        code, dt = build(arm)
        builds[arm] = {"exit": code, "seconds": round(dt, 2)}
        manifest(arm, "after")
    report["builds"] = builds

    # 5. manifest diff = arm-owned drift
    drift = {}
    for arm in ARMS:
        before = open(os.path.join(R2, "manifests", f"before-{arm}.sha256")).read()
        after = open(os.path.join(R2, "manifests", f"after-{arm}.sha256")).read()
        drift[arm] = "ZERO" if before == after else "CHANGED"
        if before != after:
            import difflib
            d = "\n".join(difflib.unified_diff(before.splitlines(), after.splitlines(),
                                               "before", "after", lineterm=""))
            open(os.path.join(R2, "manifests", f"drift-{arm}.diff"), "w").write(d + "\n")
    report["arm_owned_drift"] = drift

    # cross-arm contract identity
    masters = {}
    for arm in ARMS:
        masters[arm] = contract_hashes(arm)
    base = masters["arm-svelte"]
    ident = {}
    for arm, h in masters.items():
        ident[arm] = "IDENTICAL" if h == base else "DIFFERS"
    report["contract_byte_identity"] = ident
    if any(v == "DIFFERS" for v in ident.values()):
        # write the detail for the differing arm
        for arm, h in masters.items():
            if h != base:
                only = {k: (base.get(k), h.get(k)) for k in set(base) | set(h)
                        if base.get(k) != h.get(k)}
                open(os.path.join(R2, "manifests", f"contract-mismatch-{arm}.json"), "w").write(
                    json.dumps(only, indent=2, sort_keys=True) + "\n")

    # leakage audit over arm-owned code (skip binaries/assets)
    EXT = {".ts", ".tsx", ".vue", ".svelte", ".js", ".mjs", ".jsx", ".json"}
    # Engine-boundary rule (round-1 pattern list, unchanged): the engine and the
    # arm's feature logic must not reach for nondeterminism, time, storage, node
    # APIs, or deep contract internals.
    patterns = ["Math.random", "Date.now", "new Date(", "localStorage",
                "sessionStorage", "node:fs", "require("]
    # DOM globals are EXPECTED in a UI layer; the only legitimate place is the
    # framework's own entry point (mount/createRoot bootstrap). Anything else
    # using window./document. is reported as a finding.
    dom = ["window.", "document."]
    ENTRY_BASENAMES = {"main.ts", "main.tsx", "index.ts", "index.tsx",
                       "entry-client.tsx", "entry-server.tsx", "app.tsx", "app.ts"}
    deep = ["engine-contract/src", "engine-contract\\src"]
    findings = []
    dom_ok = []
    for arm in ARMS:
        adir = os.path.join(ROOT, arm)
        for rel in walk_owned(arm):
            ext = os.path.splitext(rel)[1]
            if ext not in EXT:
                continue
            p = os.path.join(adir, rel)
            try:
                text = open(p, encoding="utf-8", errors="strict").read()
            except Exception:
                continue
            for pat in patterns:
                if pat in text:
                    findings.append(f"{arm}/{rel}: forbidden-global '{pat}'")
            if os.path.basename(rel) not in ENTRY_BASENAMES:
                for pat in dom:
                    if pat in text:
                        findings.append(f"{arm}/{rel}: DOM-global '{pat}' outside entry point")
            else:
                for pat in dom:
                    if pat in text:
                        dom_ok.append(f"{arm}/{rel}: '{pat}' (entry-point mount)")
            for pat in deep:
                if pat in text:
                    findings.append(f"{arm}/{rel}: deep contract import '{pat}'")
    with open(os.path.join(R2, "leakage-audit.txt"), "w") as f:
        f.write("LEAKAGE AUDIT — engine-boundary rule\n")
        f.write("forbidden in ALL arm-owned code: Math.random / Date.now / new Date / "
                "localStorage / sessionStorage / node:fs / require\n")
        f.write("DOM globals (window./document.) allowed ONLY in the entry-point bootstrap\n\n")
        f.write("findings: %d\n" % len(findings))
        f.writelines(l + "\n" for l in findings)
        f.write("\nentry-point DOM mounts (expected, declared): %d\n" % len(dom_ok))
        f.writelines(l + "\n" for l in dom_ok)
    report["leakage_findings"] = findings
    report["leakage_entry_point_mounts_declared"] = dom_ok

    open(os.path.join(R2, "reflow-report.json"), "w").write(json.dumps(report, indent=2, sort_keys=True) + "\n")
    print(json.dumps(report, indent=2, sort_keys=True))

if __name__ == "__main__":
    main()
