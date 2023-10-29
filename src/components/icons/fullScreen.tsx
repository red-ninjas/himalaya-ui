'use client';
import React from 'react';
import { IconPropsNative } from './';
const FullScreen = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M15 3h6m0 0v6m0-6-7 7M9 21H3m0 0v-6m0 6 7-7M3 9V3m0 0h6M3 3l7 7m11 5v6m0 0h-6m6 0-7-7" />
    </svg>
  );
};
export default FullScreen;
