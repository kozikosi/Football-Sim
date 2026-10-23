#!/usr/bin/env python3
"""MOC — validate an OpenChamber E2E result JSON against the repository's JSON Schema.

Why this exists
---------------
The run's own note claims "Schema validation: PASS (all 17 required fields, ...)" but that
was a hand-written check, not a schema validation. This script performs a FULL validation
with a real validator (python `jsonschema`, Draft 2020-12 + format checking) and, separately,
re-derives the artifact hash from the artifact file on disk.

The `artifactSha26` typo (in a snippet circulated in Lightning's report) is corrected here:
the schema's property is `artifactSha256` (see OPENCHAMBER-E2E-RESULT.schema.json, line 45).

Usage
-----
    python3 _agents/moc/tools/validate-e2e-result.py <result.json> [schema.json]

Exit codes: 0 = valid, 1 = schema violation, 2 = usage/IO error.
"""
import hashlib
import json
import os
import sys

from jsonschema import Draft202012Validator, FormatChecker
from jsonschema.exceptions import SchemaError

DEFAULT_SCHEMA = "tests/OPENCHAMBER-E2E-RESULT.schema.json"


def fail(msg, code=2):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(code)


def main(argv):
    if not 2 <= len(argv) <= 3:
        print(__doc__)
        return 2
    result_path = argv[1]
    schema_path = argv[2] if len(argv) == 3 else DEFAULT_SCHEMA
    for p in (result_path, schema_path):
        if not os.path.isfile(p):
            fail(f"no such file: {p}")

    with open(result_path, encoding="utf-8") as fh:
        instance = json.load(fh)
    with open(schema_path, encoding="utf-8") as fh:
        schema = json.load(fh)

    print("=" * 78)
    print("SCHEMA VALIDATION")
    print("=" * 78)
    print(f"schema   : {schema_path}")
    print(f"           $schema = {schema.get('$schema')}")
    print(f"           sha256  = {hashlib.sha256(open(schema_path,'rb').read()).hexdigest()}")
    print(f"instance : {result_path}")
    print(f"           sha256  = {hashlib.sha256(open(result_path,'rb').read()).hexdigest()}")
    print(f"           status  = {instance.get('status')}  suite = {instance.get('suite')}")
    print(f"           steps   = {len(instance.get('steps', []))}  "
          f"viewportChecks = {len(instance.get('viewportChecks', []))}  "
          f"screenshots = {len(instance.get('screenshots', []))}")
    print()

    # 1. the schema itself must be a valid Draft 2020-12 schema
    try:
        Draft202012Validator.check_schema(schema)
        print("[1] schema is a valid Draft 2020-12 schema: OK")
    except SchemaError as exc:
        print(f"[1] schema is a valid Draft 2020-12 schema: FAIL -> {exc.message}")
        return 1

    # 2. full instance validation, with format checking
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    errors = sorted(validator.iter_errors(instance), key=lambda e: list(e.absolute_path))
    print(f"[2] instance validation (Draft202012Validator, FormatChecker on): "
          f"{len(errors)} error(s)")
    for err in errors:
        where = "/".join(str(p) for p in err.absolute_path) or "<root>"
        print(f"    - at {where}: {err.message}")
    if errors:
        print()
        print("RESULT: INVALID")
        return 1
    print("    (no violations)")
    print()

    # 3. required fields present
    missing = [f for f in schema.get("required", []) if f not in instance]
    print(f"[3] required fields present: {len(schema.get('required', [])) - len(missing)}/"
          f"{len(schema.get('required', []))}"
          + (f"  MISSING: {missing}" if missing else "  (all present)"))
    if missing:
        return 1

    # 4. the artifact hash recorded in the result must match the artifact on disk.
    #    NOTE: the property is `artifactSha256` (the schema's name). The circulated
    #    snippet said `artifactSha26` -- a typo that would raise KeyError.
    print()
    print("=" * 78)
    print("ARTIFACT HASH RE-DERIVATION  (property: artifactSha256)")
    print("=" * 78)
    recorded = instance.get("artifactSha256")
    artifact_path = instance.get("artifactPath")
    print(f"artifactSha256 (recorded) : {recorded}")
    print(f"artifactPath   (recorded) : {artifact_path}")
    if not artifact_path or not os.path.isfile(artifact_path):
        print(f"artifact not present on this machine: {artifact_path}")
        print("cannot re-derive the hash here (the file is not on this checkout)")
        return 0
    with open(artifact_path, "rb") as fh:
        recomputed = hashlib.sha256(fh.read()).hexdigest()
    print(f"recomputed from file      : {recomputed}")
    print(f"bytes on disk             : {os.path.getsize(artifact_path)}")
    if recomputed == recorded:
        print("MATCH")
    else:
        print("MISMATCH")
        return 1

    # 5. the trace referenced by the result must exist and be non-empty
    trace = instance.get("trace")
    if trace:
        exists = os.path.isfile(trace)
        size = os.path.getsize(trace) if exists else 0
        print(f"trace referenced          : {trace}")
        print(f"trace present             : {exists}  ({size} bytes)")
        if not exists:
            return 1

    print()
    print("RESULT: VALID")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
