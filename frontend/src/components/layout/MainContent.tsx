import React from 'react';

/** Scrollable main content area; drops the sidebar offset when it's hidden. */
export const MainContent: React.FC<{ full?: boolean; children: React.ReactNode }> = ({ full, children }) => (
  <main className={`main${full ? ' full' : ''}`}>{children}</main>
);
