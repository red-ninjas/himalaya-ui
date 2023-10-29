'use client';
import React from 'react';
import { IconPropsNative } from './';
const XCircle = ({ size = 24, color, style, ...props }: IconPropsNative) => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
      {...props}
      height={size}
      width={size}
      style={{ ...style, color: color }}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path stroke="var(--ui-icon-background)" d="m15 9-6 6M9 9l6 6" />
    </svg>
  );
};
export default XCircle;
