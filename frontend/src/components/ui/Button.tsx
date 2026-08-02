import React from 'react';

type Variant = 'default' | 'full' | 'mini';
const cls: Record<Variant, string> = { default: 'btn', full: 'btn full', mini: 'btn mini' };

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }>
  = ({ variant = 'default', className, children, ...rest }) => (
    <button className={`${cls[variant]} ${className || ''}`} {...rest}>{children}</button>
  );
