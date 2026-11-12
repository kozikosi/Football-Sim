#!/usr/bin/env python3
"""ROOT-CAUSE FIX for Fix 4 (P-346 Part A): the checksum step now hashes the files EXACTLY
AS SHIPPED — binary read of the file at its delivered path, no newline conversion, no
copy, no re-dump. This script IS the step (stated in the REV 3 note so the next reviewer
can check the step, not trust it).

CHECKSUMS.txt format (unchanged):  <sha256>  <byte size>  <relative path>
Self-excluded by convention. Algorithm labelled sha256 in the header (generated here).
"""
import hashlib
import os
import sys


def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:          # binary read — the shipped bytes, nothing else
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def build(root):
    entries = []
    for dirpath, _dirs, files in os.walk(root):
        for fn in sorted(files):
            if fn == "CHECKSUMS.txt":
                continue                 # self-excluded by convention
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, root)
            entries.append((sha256_file(full), os.path.getsize(full), rel))
    entries.sort(key=lambda e: e[2])
    lines = [
        "# CHECKSUMS.txt — computed on the SHIPPED bytes (binary read, no conversion)",
        "# ALGORITHM: sha256 (labelled per the batch rule)",
        "# STEP (REV 3, the root-cause fix): python3 make_checksums.py <folder> walks the folder,",
        "#   hashes each file in binary mode at its shipped path (no newline conversion, no copy,",
        "#   no re-dump), and writes one '<sha256>  <size>  <path>' line per file.",
        "#   CHECKSUMS.txt itself is self-excluded by convention.",
        "#",
    ]
    for h, size, rel in entries:
        lines.append(f"{h}  {size:>9}  {rel}")
    out = os.path.join(root, "CHECKSUMS.txt")
    with open(out, "w", newline="") as f:  # newline='' — the file's own bytes, LF as written
        f.write("\n".join(lines) + "\n")
    return len(entries)


def main():
    n = 0
    for root in sys.argv[1:]:
        k = build(root)
        print(f"{root}: {k} files hashed as shipped -> CHECKSUMS.txt")
        n += k
    return 0


if __name__ == "__main__":
    sys.exit(main())
