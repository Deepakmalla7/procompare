import React from 'react';

/** Renders an SVG markup string produced by the chart generators. Kept in one
 *  place so every chart shares the same safe render path. */
export const SvgChart: React.FC<{ markup: string; className?: string }> = ({ markup, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: markup }} />
);
