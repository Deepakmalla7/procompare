# ProCompare — Player Comparison Framework

Interactive companion tool for the data-science thesis **"A Multi-Dimensional
Framework for Objective Player Comparison in Professional Football: Integrating
Performance Metrics, Statistical Profiling, and Machine Learning"** — a case
study of Lionel Messi and Cristiano Ronaldo.

- **Institution:** Softwarica College of IT & E-Commerce
- **Author:** Dipak Malla (Student ID: 14810866) · **Module Leader:** Manoj Shrestha

The lab runs **locally, with no database**. It bundles the player-comparison UI
(profile + performance radar, AHP/TOPSIS similarity, 3-way career trajectory,
hidden gems, market value) into a static `app.js`/`app.css` and serves it from a
small FastAPI server backed by the analysis engine over a CSV snapshot of the
data. No Node needed to run it — the UI is pre-built.

The tool operationalises the same techniques the thesis develops: **Per-90 and
Z-score normalisation, six-dimensional performance vectors, the Minkowski
distance family, cosine/Pearson similarity, AHP weight derivation (consistency
ratio) and TOPSIS closeness scoring.**

## Run it

```bash
pip install -r requirements.txt
python api_server.py
# open http://localhost:8000
```

That's it. `data/players.csv.gz` + `data/supplementary.csv.gz` are loaded on
startup into an in-memory SQLite database.

## What's in here

| File | What it is |
|---|---|
| `api_server.py` | FastAPI server: loads the CSVs, serves the bundled lab (`app.js`/`app.css`) + the `/api/data-scout` command API + `/upload` + `/status`. |
| `scout_engine.py` | The analysis engine. All its DB access goes through `get_connection()`, which `api_server.py` overrides to point at a local SQLite store — so every command (composite index, similarity + AHP/TOPSIS, the hidden-gem signals, market-value heuristic, career history) runs unchanged. |
| `index.html` | Thesis-branded shell: the header, the data-upload panel, and a `#root` div where the lab mounts. |
| `app.js`, `app.css` | The pre-built player-comparison UI (rethemed to the thesis navy/gold palette): profile + radar, similar players with the AHP/TOPSIS popup, 3-way career-trajectory compare, Hidden Gems. |
| `data/*.csv.gz` | Gzipped CSV snapshot of the two tables the engine reads (`league_season_team_player_data`, `player_supplementary_data`), spanning 1991–2026 — includes the full career histories of Messi and Ronaldo. |
| `requirements.txt` | pandas, numpy, scipy, scikit-learn, fastapi, uvicorn. |
| `CODE_EXPLAINED.pdf` / `.md` | The complete annotated source: `api_server.py` and the whole engine, every block shown as real code with a plain-English note (composite index, AHP+TOPSIS, the hidden-gem signals, market value, and more). |
| `_original_backup/` | Pristine copies of the source files before thesis personalisation. |

## The thesis case study (Messi vs Ronaldo)

The home page opens directly on the case study:

- A self-contained **"Case study — Messi vs Ronaldo"** panel (top of the page)
  pulls both 2018-19 season profiles from the engine API and renders a navy/gold
  side-by-side (composite index, goals, assists, minutes, xG, xA, per-90 rates)
  plus a 6-axis performance-radar overlay. It also cites the thesis career-level
  TOPSIS verdict (Messi 0.805 vs Ronaldo 0.195).
- The interactive lab below **auto-loads Lionel Messi** (Barcelona, 2018-19) on
  each page load, so his profile, radar and AHP/TOPSIS comparables render without
  any clicks. Both are wired up in `index.html`.

Both players are present across their full careers, so you can reproduce any
comparison directly. For example, via the API:

```bash
curl -s http://localhost:8000/api/data-scout -H 'Content-Type: application/json' \
  -d '{"command":"get_career_history","player":"Lionel Messi"}'
```

## Uploading data

If the server prints *"No data/…found"*, or you want a different export, use the
**Data snapshot** panel at the top of the web UI — upload each file separately
(each replaces just its own table). Or from the command line:

```bash
curl -F players=@players.csv.gz http://localhost:8000/upload
curl -F supplementary=@supplementary.csv.gz http://localhost:8000/upload
```

`GET /status` reports how many rows are currently loaded. The CSVs must have the
same columns as the shipped ones.

## The API directly

Every command the lab uses is available at `POST /api/data-scout` with a JSON
body `{ "command": "...", ... }`, e.g.:

```bash
curl -s http://localhost:8000/api/data-scout -H 'Content-Type: application/json' \
  -d '{"command":"get_player_profile","season":"2024-2025","league":"la-liga","team":"Real Madrid","player":"Jude Bellingham"}'
```

Commands: `get_leagues`, `get_teams`, `get_players`, `get_player_profile`,
`get_similar_players`, `compare_players`, `get_hidden_gems`, `get_market_value`,
`get_moneyball_score`, `get_career_history`, and more (see `scout_engine.COMMANDS`).

## Note

The in-memory database is ~400 MB uncompressed, so expect ~1 GB of RAM while
running. Startup takes a few seconds to load the CSVs.
