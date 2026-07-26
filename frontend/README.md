# ProCompare — React frontend

The dashboard rebuilt as a **React + TypeScript + Vite** application with clean
architecture. Same design, themes, charts, and thesis numbers as the original
single-file `index.html`; the FastAPI backend is unchanged.

## Run (dev)

The backend must be running first (from the project root):

```bash
python api_server.py          # backend on http://localhost:8000
```

Then, in this folder:

```bash
npm install                   # first time only
npm run dev                   # React app on http://localhost:3000
```

Open **http://localhost:3000**. `/api`, `/upload`, and `/status` are proxied to
the backend on `:8000` (see `vite.config.ts`), so there are no CORS issues.

Or just double-click **`Start-Dashboard.bat`** in the project root — it starts
both servers and opens the browser.

## Build (production)

```bash
npm run build       # type-checks then bundles to dist/
npm run preview     # serve the production build locally
```

## Architecture

```
src/
  main.tsx / App.tsx          entry + shell (providers, page routing)
  api/client.ts               ALL backend calls (separation of concerns)
  types/index.ts              TypeScript interfaces (match the real backend)
  context/
    ThemeContext.tsx          7-theme state, localStorage, system pref, keys 1-7
    ComparisonContext.tsx     shared head-to-head state across the app
  hooks/
    useTheme.ts               theme + chart colours
    useHeadToHead.ts          comparison state + data fetching (business logic)
    usePlayerData.ts          dataset status
  components/
    layout/                   TopNav, Sidebar, MainContent
    player/                   PlayerHero, PlayerCard, PlayerPhoto
    charts/                   DiamondRadar, CircularGauge, DarkBarChart,
                              GumbelCurve, CrossoverChart, PercentileBar
    ui/                       Card, Badge, Button, Slider, Table, ThemeSwitcher
    sections/                 the 10 analytical sectors
    VerdictBadge.tsx
  pages/                      DashboardPage, DatabasePage, MethodologyPage
  styles/                     themes.css (7 palettes), globals.css
  utils/                      calculations.ts (chart generators + data),
                              formatters.ts
```

### Notes
- **Charts** are pixel-exact SVG components (theme-aware via `useTheme`), kept
  faithful to the original design rather than swapped to a chart library.
- **Framer Motion** provides section fade-ins; the theme system uses CSS
  variables applied to `<html data-theme>`.
- **Messi vs Ronaldo (career)** uses the exact thesis values (0.805 / 0.195,
  CR 0.00, 63% sensitivity) offline; any other pair / CSV upload is computed by
  the backend via the same `head_to_head` command.
