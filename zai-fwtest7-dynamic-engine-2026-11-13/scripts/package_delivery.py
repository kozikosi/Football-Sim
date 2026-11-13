#!/usr/bin/env python3
"""Package the 2026-11-13 wave delivery: assemble tree, CHECKSUMS.txt (sha256
LABELLED on shipped bytes), one zip, fresh-extraction verification."""
import hashlib, os, shutil, subprocess, sys

WORK = "/home/z/my-project/work"
FW = os.path.join(WORK, "fwtest-7")
DELIV = os.path.join(WORK, "delivery")
OUT = "/home/z/my-project/download"
ZIP_NAME = "z-post-blue-docs-update-2026-11-13.zip"
PKG = os.path.join(WORK, "package", ZIP_NAME.replace(".zip", ""))

# build/package dirs excluded from the shipped tree
SKIP_DIRS = {"node_modules", ".next", "out", ".output", ".nuxt", ".nuxt-dev",
             ".svelte-kit", ".nitro", ".cache", ".vinxi", "dist", "build",
             "__pycache__", ".git"}
SKIP_FILES = {".tsbuildinfo"}
SKIP_SUFFIX = (".log.bak",)

def copy_tree(src, dst):
    n = 0
    for dirpath, dirnames, filenames in os.walk(src):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            if fn in SKIP_FILES or fn.endswith(SKIP_SUFFIX):
                continue
            s = os.path.join(dirpath, fn)
            rel = os.path.relpath(s, src)
            d = os.path.join(dst, rel)
            os.makedirs(os.path.dirname(d), exist_ok=True)
            shutil.copyfile(s, d)
            n += 1
    return n

def main():
    if os.path.exists(PKG):
        shutil.rmtree(PKG)
    os.makedirs(PKG)
    total = 0
    # 1. the framework test tree
    total += copy_tree(FW, os.path.join(PKG, "fwtest-7"))
    # 2. the delivery folder (inbox, deliveries, README, trio) — at root paths
    total += copy_tree(DELIV, PKG)
    # 3. the scripts (receipt instruments)
    total += copy_tree("/home/z/my-project/scripts", os.path.join(PKG, "scripts"))
    print(f"assembled {total} files into {PKG}")

    # 4. CHECKSUMS.txt — sha256 LABELLED, relative paths, over shipped bytes.
    #    HEADERLESS on purpose: GNU sha256sum -c does not skip '#' lines, and the
    #    A.1 lesson is "verifiable with a plain command". The label lives here:
    #    algorithm sha256, computed on the shipped bytes, verify with `sha256sum -c CHECKSUMS.txt`.
    lines = []
    entries = []
    for dirpath, dirnames, filenames in os.walk(PKG):
        dirnames[:] = [d for d in dirnames if d != "CHECKSUMS.txt"]
        for fn in sorted(filenames):
            if fn == "CHECKSUMS.txt":
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, PKG)
            h = hashlib.sha256(open(full, "rb").read()).hexdigest()
            entries.append(f"{h}  {rel}")
    entries.sort(key=lambda e: e.split("  ", 1)[1])
    lines.extend(entries)
    with open(os.path.join(PKG, "CHECKSUMS.txt"), "w", newline="\n") as f:
        f.write("\n".join(lines) + "\n")
    print(f"CHECKSUMS.txt: {len(entries)} entries")

    # 5. the zip
    os.makedirs(os.path.join(WORK, "package"), exist_ok=True)
    zpath = os.path.join(WORK, "package", ZIP_NAME)
    if os.path.exists(zpath):
        os.remove(zpath)
    subprocess.run(["zip", "-qr", zpath, ZIP_NAME.replace(".zip", "")],
                   cwd=os.path.join(WORK, "package"), check=True)
    print(f"zip built: {zpath}")

    # 6. fresh-extraction verification (persistent dir — /tmp prunes between calls)
    exdir = "/home/z/my-project/work/verify/fresh-extract"
    if os.path.exists(exdir):
        shutil.rmtree(exdir)
    os.makedirs(exdir)
    subprocess.run(["unzip", "-q", zpath, "-d", exdir], check=True)
    # integrity test first
    t = subprocess.run(["unzip", "-t", zpath], capture_output=True, text=True)
    ok_line = [l for l in t.stdout.splitlines() if "No errors detected" in l]
    print("unzip -t:", ok_line[0] if ok_line else t.stdout.splitlines()[-1])
    # the zip carries one top-level folder; verify inside it
    extract_root = os.path.join(exdir, ZIP_NAME.replace(".zip", ""))
    v = subprocess.run(["sha256sum", "-c", "CHECKSUMS.txt"], cwd=extract_root,
                       capture_output=True, text=True)
    ok = sum(1 for l in v.stdout.splitlines() if l.endswith(": OK"))
    fail = [l for l in v.stdout.splitlines() if ": FAILED" in l or ": FAILED " in l]
    missing = [l for l in v.stderr.splitlines() if "failed to open" in l]
    print(f"fresh-extraction sha256sum -c: {ok} OK, {len(fail)} FAILED, {len(missing)} missing")
    if fail or missing or ok != len(entries):
        print("\n".join((fail + missing)[:10]))
        print(f"VERIFY GATE: {ok}/{len(entries)} — FAIL (ok must equal entries)")
        sys.exit(1)

    # 7. land in download/ (the zip + the individual-files folder)
    os.makedirs(OUT, exist_ok=True)
    final_zip = os.path.join(OUT, ZIP_NAME)
    shutil.copyfile(zpath, final_zip)
    final_dir = os.path.join(OUT, ZIP_NAME.replace(".zip", ""))
    if os.path.exists(final_dir):
        shutil.rmtree(final_dir)
    shutil.copytree(extract_root, final_dir)
    zh = hashlib.sha256(open(final_zip, "rb").read()).hexdigest()
    print(f"DELIVERED: {final_zip} ({os.path.getsize(final_zip)} B, sha256 {zh})")
    print(f"DELIVERED: {final_dir} (individual files for the download UI)")
    print(f"FRESH-EXTRACTION VERIFICATION: {ok}/{len(entries)} OK — PASS" if not fail and not missing
          else "FRESH-EXTRACTION: FAIL")

if __name__ == "__main__":
    main()
