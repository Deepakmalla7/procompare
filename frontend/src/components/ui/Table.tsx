import React from 'react';

/** Monospace dark data table wrapper. */
export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <table className="dt">{children}</table>
);
