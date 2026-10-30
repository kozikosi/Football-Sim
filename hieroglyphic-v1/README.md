# HieroGlyphic v1

A cleaner, more modern architecture for the NFL Draft Simulator. Combines Claude's engine (from Colors) with refined UX inspired by w37/w38, reimagined with better code organization.

## Goals
- Clean separation of concerns (engine, UI, state)
- Engine remains pure (no DOM, no side effects)
- Modern architecture that can migrate to React/Svelte later
- Beautiful, polished UI inspired by w37/w38 but with cleaner implementation
- Preserve all core game mechanics and rules

## Structure
```
vlc-v1/
├── src/
│   ├── engine/     # Pure game engine (copied from Colors, extended)
│   ├── ui/         # UI components and rendering
│   ├── styles/     # CSS/styling
│   ├── components/ # Reusable UI components
│   ├── utils/      # Utilities
│   └── main.js     # Entry point
└── public/         # Static assets
```

## Philosophy
- Learn from w37/w38's beauty but fix their bugs
- Keep engine pure and testable
- Design for eventual framework migration
- Clean, maintainable code
