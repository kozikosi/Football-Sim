#!/usr/bin/env python3
"""Wave-12 runner: apply zpb_v12.apply() to the current deliverable and write the new one."""
import importlib.util, hashlib, sys

MOD = "/home/z/my-project/desktop/wt/zai/_agents/zai/tools/zpb_v12.py"
SRC = "/home/z/my-project/download/Football-Sim-Z-post-blue.html"
OUT = "/home/z/my-project/desktop/wt/zai/Football-Sim-Z-post-blue.html"

spec = importlib.util.spec_from_file_location("zpb_v12", MOD)
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

html = open(SRC, encoding="utf-8").read()
out, EXACT, REMOVED = m.apply(html)
data = out.encode("utf-8")
open(OUT, "wb").write(data)
print(f"[done] reps applied: {len(EXACT)}  | removals/cuts recorded: {len(REMOVED)}")
print(f"[done] OUT: {OUT}  bytes: {len(data)}  md5: {hashlib.md5(data).hexdigest()}")
