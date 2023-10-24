'use client';
import React from 'react';
import { IconPropsNative } from './';
const FullScreenClose = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M4 14h6m0 0v6m0-6-7 7m17-11h-6m0 0V4m0 6 7-7m-7 17v-6m0 0h6m-6 0 7 7M10 4v6m0 0H4m6 0L3 3" />
    </svg>
  );
};
export default FullScreenClose;
