import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { TopNav } from './components/layout/TopNav';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { DashboardPage } from './pages/DashboardPage';
import { DatabasePage } from './pages/DatabasePage';
import { MethodologyPage } from './pages/MethodologyPage';
import { VerdictBadge } from './components/VerdictBadge';
import { ActivePage } from './types';
import './styles/globals.css';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [activeSection, setActiveSection] = useState('overview');

  const openTopsis = () => { setActivePage('dashboard'); setActiveSection('topsis'); };

  return (
    <ThemeProvider>
      <ComparisonProvider>
        <TopNav activePage={activePage} onPageChange={setActivePage} />
        {activePage === 'dashboard' && <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />}
        <MainContent full={activePage !== 'dashboard'}>
          {activePage === 'dashboard' && <DashboardPage activeSection={activeSection} />}
          {activePage === 'database' && <DatabasePage onLoaded={() => { setActivePage('dashboard'); setActiveSection('overview'); }} />}
          {activePage === 'methodology' && (
            <MethodologyPage
              onLoaded={() => { setActivePage('dashboard'); setActiveSection('overview'); }}
              onUpload={() => setActivePage('database')}
            />
          )}
        </MainContent>
        <VerdictBadge onOpen={openTopsis} />
      </ComparisonProvider>
    </ThemeProvider>
  );
};

export default App;
