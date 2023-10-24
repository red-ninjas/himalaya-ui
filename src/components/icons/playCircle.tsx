'use client';
import React from 'react';
import { IconPropsNative } from './';
const PlayCircle = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m10 8 6 4-6 4V8z" />
    </svg>
  );
};
export default PlayCircle;
