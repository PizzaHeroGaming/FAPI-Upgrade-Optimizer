# 🥔 FAPI Upgrade Optimizer

A save-driven upgrade & build optimizer for **[Farmer Against Potatoes Idle](https://store.steampowered.com/app/2427700/Farmer_Against_Potatoes_Idle/)** — import your save and get exact "do this next" recommendations across every system, all the way through the endgame that other planners stop short of.

### ▶ [**Open the optimizer**](https://pizzaherogaming.github.io/FAPI-Upgrade-Optimizer/)

---

## What it does

Paste your save (or upload your `fapi-save.txt`) and the tool reads your exact state, then tells you the single best move in each system — named upgrades, buildings, cards, teams, and lines, ranked by how much they actually speed your Ascension.

- **Roadmap → "Do this now"** — a concrete, itemized buy list pulled from your save: which Sweet Potato upgrade, which town building, which assembly lines, which expedition teams, and more.
- **Per-system pages** — Sweet Potato, Cards (charge priority), Pets & Expeditions (auto-built teams + zone bonuses), Buildings, Portal, Skull perks, Talents, Assembly Lines, Equipment, Cow Shop, Transcendence, and the Ascension simulator.
- **Everything respects what you've unlocked** — it never recommends a purchase that's still locked behind an ascension gate or progression wall.

The recommendations are grounded in formulas decompiled from the game, and validated to reproduce the in-game numbers (card % gains, pet damage, sweet-potato costs, reincarnation-exp, zone bonuses, and more).

## How to use

1. Open the [optimizer](https://pizzaherogaming.github.io/FAPI-Upgrade-Optimizer/).
2. In-game, open the code box and type `copysave` — it copies your whole save to the clipboard. Paste it into the tool and hit **Read save**.
3. Or upload your save file directly from
   `…/AppData/LocalLow/Oni Gaming/Farmer Against Potatoes Idle/fapi-save.txt`.
4. Use the sidebar to browse each system, or start with the **Roadmap** for the prioritized plan.

🔒 **Your save is parsed entirely in your browser** — it never leaves your device. There is no server.

## Running locally

It's a single self-contained HTML file with no build step and no dependencies. Just open `index.html` in a browser, or serve the folder with any static server:

```bash
python -m http.server   # then visit http://localhost:8000
```

## Credits & disclaimer

- Built by **[Pizza Hero Gaming](https://pizzaherogaming.github.io/PizzaHeroGaming/)**.
- *Farmer Against Potatoes Idle* is made by **Oni Gaming**. This is an unofficial fan-made tool and is **not affiliated with or endorsed by Oni Gaming**. All game names and data belong to their respective owners.

## License

Released under the [MIT License](LICENSE).
