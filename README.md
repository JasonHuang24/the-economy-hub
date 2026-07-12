# The Economy Hub

Five volumes on how the world economy works — systems, history, countries, work, and failure modes — written for general readers. Every chapter answers a question and shows its evidence.

**Live site:** https://jasonhchronicles.com/the-economy-hub/

---

## About

The Economy Hub is a static reading site organized as five volumes. Each chapter poses a single question and answers it by walking through the mechanism and the evidence, then leaves the verdict to the reader. Big popular claims get put on trial: each carries a ruling, a stated confidence level, and sourced citations.

Volume I (Frameworks) is live with all ten chapters; the remaining volumes are in preparation.

---

## Volumes

| Vol | Title | Scope | Status |
|---|---|---|---|
| I | Frameworks | Economic systems, in theory and in practice | **Available** |
| II | History | Exchange and its institutions, from barter to the attention market | Forthcoming |
| III | Countries | Why national outcomes diverge | Forthcoming |
| IV | Work | Labor, hours, wages, and the purpose of a job | Forthcoming |
| V | Pathologies | Failure modes, and how economists know what they know | Forthcoming |

---

## Volume I — Frameworks

| Chapter | Question |
|---|---|
| 1 | Is the economy zero-sum? |
| 2 | What actually separates capitalism, socialism, and communism? |
| 3 | How have the rival systems performed in practice? |
| 4 | Why did the planned economies fall behind, and was it inevitable? |
| 5 | Why do monopolies persist in markets that are supposed to be competitive? |
| 6 | Why does the middleman often capture more value than the maker? |
| 7 | Why do healthcare and education keep getting more expensive while electronics get cheaper? |
| 8 | Why do subsidies outlive the industries they were built to protect? |
| 9 | Worker co-operatives survive as well as conventional firms, so why are there so few? |
| 10 | Which economic futures are actually plausible? |

`books/frameworks/index.html` is the volume cover and table of contents.

---

## Evidence

Claims that carry weight are presented as **verdicts** — a stated claim, a ruling (e.g. *Oversimplified*), a confidence level (e.g. *Moderate confidence*), and the sources behind it. The site reports mechanisms and evidence, and leaves judgment to the reader.

---

## Stack

- HTML · CSS · Vanilla JavaScript — no build step, served statically
- Self-hosted fonts: Fraunces (display), Source Serif 4 (body), IBM Plex Mono (mono)
- `js/include.js` injects the shared header/footer at runtime (site root derived from the script's own `src`, so pages resolve at any depth); `js/toc.js` drives the sticky chapter contents + scrollspy; `js/verdict.js` handles verdict source expanders and print
- `tools/*.py` generate the volume covers and OG images
- Hosted on GitHub Pages under the `jasonhchronicles.com` apex (served at `/the-economy-hub/`)
