#!/usr/bin/env python3
"""Collect the framework-test metrics for the seven arms (2026-11-13)."""
import json, os, subprocess, time

ROOT = "/home/z/my-project/work/fwtest-7"
SRC_EXT = {".ts", ".tsx", ".vue", ".svelte", ".css", ".html", ".js", ".mjs"}
SKIP_DIRS = {"node_modules", ".next", "out", ".output", ".nuxt", ".nuxt-dev", ".svelte-kit",
             ".nitro", ".cache", "dist", "build", ".vinxi", ".vercel"}
CONTRACT = "engine-contract"
OUT_DIRS = {"arm-svelte": "dist", "arm-sveltekit": "build", "arm-react": "dist",
            "arm-vue": "dist", "arm-solidstart": ".vinxi/build" if os.path.isdir(
                os.path.join(ROOT, "arm-solidstart", ".vinxi", "build")) else "build",
            "arm-next": "out", "arm-nuxt": ".output/public"}

def loc_count(arm):
    files, loc = 0, 0
    adir = os.path.join(ROOT, arm)
    for dirpath, dirnames, filenames in os.walk(adir):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, adir)
            if CONTRACT in rel.split(os.sep):
                continue
            if os.path.splitext(fn)[1] not in SRC_EXT:
                continue
            if rel.startswith("public") or "assets" in rel.split(os.sep):
                continue
            try:
                n = sum(1 for line in open(full, encoding="utf-8", errors="ignore") if line.strip())
            except Exception:
                continue
            files += 1
            loc += n
    return files, loc

def dir_size_bytes(path):
    total = 0
    n = 0
    if not os.path.isdir(path):
        return None, None
    for dirpath, dirnames, filenames in os.walk(path):
        for fn in filenames:
            try:
                total += os.path.getsize(os.path.join(dirpath, fn))
                n += 1
            except OSError:
                pass
    return total, n

def main():
    out = {"node": subprocess.run(["node", "--version"], capture_output=True, text=True).stdout.strip(),
           "npm": subprocess.run(["npm", "--version"], capture_output=True, text=True).stdout.strip(),
           "arms": {}}
    for arm in sorted(OUT_DIRS):
        adir = os.path.join(ROOT, arm)
        files, loc = loc_count(arm)
        outdir = os.path.join(adir, OUT_DIRS[arm])
        obytes, nfiles = dir_size_bytes(outdir)
        pj = json.load(open(os.path.join(adir, "package.json")))
        deps = len(pj.get("dependencies", {})) + len(pj.get("devDependencies", {}))
        pkgs = 0
        nm = os.path.join(adir, "node_modules")
        if os.path.isdir(nm):
            for d in os.listdir(nm):
                if d.startswith("@"):
                    sd = os.path.join(nm, d)
                    pkgs += len([x for x in os.listdir(sd) if os.path.isdir(os.path.join(sd, x))])
                elif os.path.isdir(os.path.join(nm, d)):
                    pkgs += 1
        audit = subprocess.run(["npm", "audit", "--json", "--no-audit" if False else "--json"],
                               cwd=adir, capture_output=True, text=True, timeout=120)
        try:
            avulns = json.loads(audit.stdout).get("metadata", {}).get("vulnerabilities", {})
        except Exception:
            avulns = {"error": audit.stdout[:200]}
        out["arms"][arm] = {"arm_owned_files": files, "arm_owned_loc": loc,
                            "declared_deps": deps, "node_modules_pkgs": pkgs,
                            "out_dir": OUT_DIRS[arm], "out_bytes": obytes, "out_files": nfiles,
                            "audit": avulns,
                            "framework": {k: v for k, v in pj.get("dependencies", {}).items()},
                            "build_script": pj.get("scripts", {}).get("build")}
    with open(os.path.join(ROOT, "results", "metrics-2026-11-13.json"), "w") as f:
        json.dump(out, f, indent=2, sort_keys=True)
    print(json.dumps(out, indent=1, sort_keys=True))

if __name__ == "__main__":
    main()
