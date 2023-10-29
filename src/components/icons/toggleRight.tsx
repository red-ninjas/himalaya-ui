'use client';
import React from 'react';
import { IconPropsNative } from './';
const ToggleRight = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <rect width="22" height="14" x="1" y="5" rx="7" ry="7" />
      <circle cx="16" cy="12" r="3" />
    </svg>
  );
};
export default ToggleRight;
