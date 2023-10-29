'use client';
import React from 'react';
import { IconPropsNative } from './';
const SkipBack = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M19 20 9 12l10-8v16zM5 19V5" />
    </svg>
  );
};
export default SkipBack;
