'use client';
import React from 'react';
import { IconPropsNative } from './';
const ChevronUpDown = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M17 8.517 12 3 7 8.517m0 6.963 5 5.517 5-5.517" />
    </svg>
  );
};
export default ChevronUpDown;
