'use client';
import React from 'react';
import { IconPropsNative } from './';
const ArrowUpLeft = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M17 17 7 7M7 17V7h10" />
    </svg>
  );
};
export default ArrowUpLeft;
