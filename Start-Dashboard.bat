@echo off
title ProCompare - Thesis Dashboard (React)
cd /d "%~dp0"

echo ============================================================
echo   ProCompare - Messi vs Ronaldo Thesis Dashboard
echo ------------------------------------------------------------
echo   Backend (FastAPI, port 8000) + React frontend (port 3000)
echo ============================================================

echo.
echo   [1/3] Installing Python dependencies (first run only)...
py -m pip install -r requirements.txt 2>nul || python -m pip install -r requirements.txt

echo   [2/3] Starting the backend server (port 8000)...
start "QG Backend (keep open)" cmd /k "py api_server.py 2>nul || python api_server.py"

echo   [3/3] Preparing the React frontend...
cd frontend
if not exist "node_modules" (
  echo         Installing frontend packages (first run only, please wait)...
  call npm install
)
echo         Starting the React dev server (port 3000)...
start "QG Frontend (keep open)" cmd /k "npm run dev"

echo   Waiting for the dev server to come up...
timeout /t 8 >nul
start "" http://localhost:3000

echo.
echo   Done. The React dashboard is at http://localhost:3000
echo   (The original single-file dashboard is still at http://localhost:8000)
echo   To STOP: close the "QG Backend" and "QG Frontend" windows.
echo.
pause
