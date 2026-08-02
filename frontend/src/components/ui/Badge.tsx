import React from 'react';

export const Badge: React.FC<{ variant?: 'a' | 'b' | 'ok' | 'warn'; className?: string; style?: React.CSSProperties; children: React.ReactNode }>
  = ({ variant = 'a', className, style, children }) => (
    <span className={`badge ${variant} ${className || ''}`} style={style}>{children}</span>
  );
