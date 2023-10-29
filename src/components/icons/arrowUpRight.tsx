'use client';
import React from 'react';
import { IconPropsNative } from './';
const ArrowUpRight = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
};
export default ArrowUpRight;
