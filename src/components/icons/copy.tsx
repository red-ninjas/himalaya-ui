'use client';
import React from 'react';
import { IconPropsNative } from './';
const Copy = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M6 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.732 1M11 21h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
    </svg>
  );
};
export default Copy;
