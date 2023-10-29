'use client';
import React from 'react';
import { IconPropsNative } from './';
const LightningBolt = ({ size = 24, color, style, ...props }: IconPropsNative) => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      shapeRendering="geometricPrecision"
      viewBox="0 0 20 20"
      {...props}
      height={size}
      width={size}
      style={{ ...style, color: color }}
    >
      <path fill="currentColor" stroke="var(--ui-icon-background)" d="m11 1.667-8.333 10h7.5l-.834 6.666 8.334-10h-7.5L11 1.667Z" />
    </svg>
  );
};
export default LightningBolt;
