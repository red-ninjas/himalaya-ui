'use client';
import React from 'react';
import { IconPropsNative } from './';
const TrendingDown = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m23 18-9.5-9.5-5 5L1 6" />
      <path d="M17 18h6v-6" />
    </svg>
  );
};
export default TrendingDown;
