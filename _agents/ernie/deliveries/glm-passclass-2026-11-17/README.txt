The two pass logs are ~46 MB each and are NOT committed. Regenerate with:
  node --experimental-strip-types drive.mjs pools 12000   # writes /tmp/log-pools.json
  node --experimental-strip-types drive.mjs glm   12000   # writes /tmp/log-glm.json
then: node decomp.mjs  (the decomposition) and node pair.mjs  (the per-game pairing).
