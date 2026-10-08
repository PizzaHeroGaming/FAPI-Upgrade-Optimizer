# FAPI Reincarnation-Engine Simulator

A headless model of Farmer Against Potatoes Idle's **core ascension engine**,
built from the decompiled game formulas. It reads your save and reveals the
mechanic that drives the whole game.

## What it shows
- Your exact **reinc-exp gain** and **required-per-level** (decompiled `ReincarnationMain` formulas).
- **The reinc "wall"** — the level where required-per-level equals your gain, so progress stalls. The game places your **ascension requirement just below this wall**: you grind to the wall, ascend (which boosts gain), and the wall moves up.
- **The lump mechanic** — reinc-exp is *banked in a lump when you reincarnate* (not per-second), sized by your Time Bonus × the multiplier stack. When the pending lump crosses your ascension requirement, you reincarnate then ascend.

## Run it
```bash
node sim/reinc-engine-sim.mjs
```
Edit the save path at the top if your save isn't at the default
`…/AppData/LocalLow/Oni Gaming/Farmer Against Potatoes Idle/fapi-save.txt`.

*Fidelity note:* this faithfully models the reincarnation/ascension engine (pure
decompiled formulas). It does not simulate real-time combat (the player-power and
enemy-HP stacks are hundreds of interacting terms) — those are read from your save.
