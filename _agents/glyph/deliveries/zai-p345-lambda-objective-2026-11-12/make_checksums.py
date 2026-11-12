#!/usr/bin/env python3
"""REV 3 checksum maker — walks the folder, hashes each file in binary mode at its
shipped path, writes one '<sha256>  <size>  <path>' line per file. CHECKSUMS.txt
itself is self-excluded by convention."""
import hashlib
import os
import sys

folder = sys.argv[1] if len(sys.argv) > 1 else "."
lines = []
for root, dirs, files in os.walk(folder):
    dirs.sort()
    for fn in sorted(files):
        p = os.path.join(root, fn)
        rel = os.path.relpath(p, folder)
        if rel == "CHECKSUMS.txt":
            continue
        h = hashlib.sha256()
        with open(p, "rb") as f:
            for chunk in iter(lambda: f.read(1 << 20), b""):
                h.update(chunk)
        lines.append(f"{h.hexdigest()}  {os.path.getsize(p):>9}  {rel}")
out = os.path.join(folder, "CHECKSUMS.txt")
with open(out, "w") as f:
    f.write("# CHECKSUMS.txt — computed on the SHIPPED bytes (binary read, no conversion)\n")
    f.write("# ALGORITHM: sha256 (labelled per the batch rule)\n")
    f.write("# STEP: python3 make_checksums.py <folder> — one '<sha256>  <size>  <path>' line per file; CHECKSUMS.txt self-excluded.\n#\n")
    f.write("\n".join(lines) + "\n")
print(f"wrote {out} with {len(lines)} entries")
