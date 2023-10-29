'use client';
import React from 'react';
import { IconPropsNative } from './';
const SkipForward = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m5 4 10 8-10 8V4zM19 5v14" />
    </svg>
  );
};
export default SkipForward;
