#!/bin/sh
# Downloads nflverse play_by_play 2016-2025 (public GitHub releases, same files and sha256 as MUSE's P-344 manifest). ~200 MB.
D="${NFLVERSE_DIR:-$(cd "$(dirname "$0")" && pwd)/data}"; mkdir -p "$D"
for y in 2016 2017 2018 2019 2020 2021 2022 2023 2024 2025; do
  [ -s "$D/play_by_play_$y.parquet" ] || curl -sS --fail -L -m 300 -o "$D/play_by_play_$y.parquet" "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_$y.parquet" || echo "FAIL $y"
done
