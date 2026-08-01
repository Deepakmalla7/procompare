import React from 'react';

/** The glassmorphism panel used throughout the dashboard. */
export const Card: React.FC<{
  title?: string; icon?: string; right?: React.ReactNode; className?: string; children: React.ReactNode;
}> = ({ title, icon, right, className, children }) => (
  <div className={`panel ${className || ''}`}>
    {title && (
      <h3>
        {icon ? `${icon} ` : ''}
        {title}
        {right && <span className="r">{right}</span>}
      </h3>
    )}
    {children}
  </div>
);

/** Italic descriptive text below a card (matches the reference style). */
export const CardDesc: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="desc">{children}</div>
);
