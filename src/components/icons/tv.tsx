'use client';
import React from 'react';
import { IconPropsNative } from './';
const Tv = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
      <path d="m17 2-5 5-5-5" />
    </svg>
  );
};
export default Tv;
