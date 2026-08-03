import React, { useState } from 'react';
import { PHOTOS } from '../../utils/calculations';
import { initials } from '../../utils/formatters';

/** Circular player photo with a glowing frame; falls back to stylised initials. */
export const PlayerPhoto: React.FC<{ name: string; side: 'a' | 'b' }> = ({ name, side }) => {
  const [failed, setFailed] = useState(false);
  const url = PHOTOS[name];
  const wrap = side === 'a' ? 'wrapA' : 'wrapB';
  if (url && !failed) {
    return <img className={`photo ${wrap}`} src={url} alt={name} onError={() => setFailed(true)} />;
  }
  return <div className={`photo ${wrap} initials ${side}`}>{initials(name)}</div>;
};
