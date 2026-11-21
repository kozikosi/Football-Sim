# Reference image set — Pro Football Dynasty (rival product)

Stored 2026-11-21 at the Owner's directive ("browse them and store the images"). Read-only
reference material for the long-term visualization direction filed at
`inbox/20261121-0324-pickle-OWNER-RULINGS-rival-pfdynasty-longterm-visual.md`. **Not product
assets.** No image here is used in, or licensed for, our build; they are a record of a rival's UI.

## Provenance

- Source pages (Owner-supplied):
  - `https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/?l=english`
  - `https://store.steampowered.com/developer/sidelinesimstudios`
- Product: Pro Football Dynasty, app 4769350, developer/publisher SidelineSim Studios, planned
  release January 2027. From the makers of Football Coach: College Dynasty (2151290, 16 Jan 2025).
- Page HTML fetched 2026-11-21T03:2xZ (`curl`); all image URLs extracted from that HTML, including
  the 13 screenshot hashes embedded in the `ss_...` gallery JSON. All images downloaded from
  `shared.fastly.steamstatic.com/store_item_assets/steam/apps/4769350/...` with the `?t=1793905616`
  cache token from the page.

## Contents (26 files, 4.7 MB)

- `screenshots/` — 13 full-size 1920×1080 JPEG screenshots from the gallery, numbered 01–13.
  The hash in each filename is the source Steam screenshot hash, so any image can be traced back to
  its exact source URL: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4769350/<hash>/ss_<hash>.1920x1080.jpg?t=1793905616`
- `marketing/` — 13 store-page assets: header, 616×353 capsule, page background; five inline
  marketing extras (`.avif`), four `poster.avif` movie posters and one `poster.webp`.
- `CHECKSUMS.sha256` — SHA-256 for all 26 files. Verify with `shasum -a 256 -c CHECKSUMS.sha256`
  from this directory (expect 26 OK, exit 0).

## What to look for (REPORTED from the store copy, not independently verified from pixels)

The Owner's interest is narrow: playbooks, player + field visualization, and badge/spatial language
— explicitly NOT scouting or the full GM experience, and NOT player faces. The store text advertises
200+ offensive/defensive plays, an animation system with "different views", per-player stat tracking,
and human-made pixel-art portraits with billions of combinations (the faces the Owner rejects).

**Verification limit:** I stored and checksummed these files but could not visually inspect their
pixels (this model has no image input). The gallery at `index.html` renders them for the Owner and
Architect to judge. Any claim about what a specific screenshot depicts is UNVERIFIED until a seat or
the Owner actually looks at it.

`index.html` is a self-contained contact sheet over the local JPEGs; open it in a browser to browse
all 13 screenshots at once.
