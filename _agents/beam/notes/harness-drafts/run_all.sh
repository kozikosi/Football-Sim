#!/bin/sh
# run_all.sh — composite runner (S-301, Beam draft)
# Usage: sh tests/run_all.sh [path/to/build.html]
# Exit codes: 0 all pass, 1 any finding, 2 baseline absent, 3 extraction, 4 usage.
# Run order (locked per tests/CONTRACT.md C5):
# 0. Environment/identity (sha256 check)
# 1. node --check on extracted core
# 2. manifest.txt presence + function-name check
# 3. pw4 (100-season regression, baseline-gated)
# 4. validate (2025 wins)
# 5. phone (390px overflow lint)

BUILD="${1:-NFL Draft Simulator v20 Claude.html}"
echo "RUN_ALL: build=$BUILD"

# Step 0: sha256 identity
echo "STEP 0: identity check"
node -e "const fs=require('fs');const c=require('crypto');console.log(c.createHash('sha256').update(fs.readFileSync('$BUILD')).digest('hex'))"

# Step 1: node --check (placeholder — needs SIM-CORE extraction)
echo "STEP 1: node --check (SKIPPED — SIM-CORE markers not yet present)"

# Step 2: manifest check (placeholder)
echo "STEP 2: manifest check (SKIPPED — manifest.txt not yet generated)"

# Step 3: pw4
if [ -f tests/pw4.js ]; then
  node tests/pw4.js "$BUILD"
else
  echo "PW4: SKIPPED (not delivered this round)"
fi

# Step 4: validate
if [ -f tests/validate.js ]; then
  node tests/validate.js "$BUILD"
else
  echo "VALIDATE: SKIPPED (not delivered this round)"
fi

# Step 5: phone
if [ -f tests/phone.js ]; then
  node tests/phone.js "$BUILD"
else
  echo "PHONE: SKIPPED (not delivered this round)"
fi

echo "RUN_ALL: PARTIAL (scripts not yet delivered)"
