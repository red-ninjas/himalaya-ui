'use client';
import React from 'react';
import { IconPropsNative } from './';
const GitCommit = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M1.05 12H7M17.01 12h5.95" />
    </svg>
  );
};
export default GitCommit;
