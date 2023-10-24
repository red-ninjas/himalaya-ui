'use client';
import React from 'react';
import { IconPropsNative } from './';
const ChevronLeft = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};
export default ChevronLeft;
