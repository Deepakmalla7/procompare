# ProCompare

Interactive companion tool for the data-science thesis *"A Multi-Dimensional
Framework for Objective Player Comparison in Professional Football: Integrating
Performance Metrics, Statistical Profiling, and Machine Learning"* -- a case
study of Lionel Messi and Cristiano Ronaldo.

- **Institution:** Softwarica College of IT & E-Commerce
- **Author:** Dipak Malla (Student ID: 14810866)

## Status

Early scaffolding. The plan:

1. `scout_engine.py` -- the analysis engine (per-90 and z-score normalisation,
   six-dimensional performance vectors, Minkowski distance, cosine/Pearson
   similarity, AHP weight derivation and TOPSIS closeness scoring).
2. `api_server.py` -- a small FastAPI server that runs the engine over a local
   CSV snapshot, so results reproduce on any machine with no database.
3. `frontend/` -- a Vite + React + TypeScript dashboard on top of the API.

## Setup

```bash
pip install -r requirements.txt
```
