"""
ProCompare - Player Comparison Lab (standalone server).

Serves the interactive player-comparison lab for the "ProCompare"
data-science thesis (Softwarica College; author: Dipak Malla). Runs the analysis
engine over a local CSV snapshot instead of a database - so the lab (profile +
radar, AHP/TOPSIS similarity, career trajectory, hidden gems, market value) can be
reproduced with identical numbers on any machine.

    pip install -r requirements.txt
    python api_server.py
    # then open http://localhost:8000

All of the engine's database access funnels through get_connection(); here we
override that to point at an in-memory SQLite database loaded from the CSVs in
./data, so every command runs unchanged. Provide your own snapshot any time via
POST /upload.
"""
import io
import json
import os
import sqlite3
import threading

import pandas as pd
from fastapi import FastAPI, File, Request, Response, UploadFile
from fastapi.responses import FileResponse, HTMLResponse

import scout_engine as eng

HERE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(HERE, "data")
_LOCK = threading.Lock()

# One shared in-memory SQLite connection; the engine is serialised behind _LOCK
# (single local user), so cross-thread use is safe.
_db = sqlite3.connect(":memory:", check_same_thread=False)


# --- psycopg2-style shim over SQLite: translate %s placeholders to ? ----------
class _Cur:
    def __init__(self, cur):
        self._cur = cur

    def execute(self, sql, params=None):
        sql = sql.replace("%s", "?")
        self._cur.execute(sql, list(params) if params else [])
        return self

    def fetchall(self):
        return self._cur.fetchall()

    def fetchone(self):
        return self._cur.fetchone()

    @property
    def description(self):
        return self._cur.description

    def close(self):
        self._cur.close()


class _Conn:
    def cursor(self):
        return _Cur(_db.cursor())

    def execute(self, sql, params=None):
        return self.cursor().execute(sql, params)

    def commit(self):
        pass

    def rollback(self):
        pass

    def close(self):
        # keep the shared in-memory db alive across requests
        pass

    def __enter__(self):
        return self

    def __exit__(self, *a):
        pass


eng.get_connection = lambda: _Conn()


def _clear_caches():
    for name in ("_ALL_LEAGUES_CACHE", "_MS_POOL_CACHE"):
        c = getattr(eng, name, None)
        if isinstance(c, dict):
            c.clear()


def load_players_frame(players: pd.DataFrame):
    """Replace just the players table + its indexes, and refresh the engine caches."""
    with _LOCK:
        players.to_sql(
            "league_season_team_player_data", _db, if_exists="replace", index=False
        )
        cur = _db.cursor()
        cur.execute(
            "CREATE INDEX IF NOT EXISTS ix_season "
            "ON league_season_team_player_data(season)"
        )
        cur.execute(
            "CREATE INDEX IF NOT EXISTS ix_season_league "
            "ON league_season_team_player_data(season, league)"
        )
        cur.execute(
            "CREATE INDEX IF NOT EXISTS ix_player "
            "ON league_season_team_player_data(player)"
        )
        _db.commit()
        _clear_caches()
