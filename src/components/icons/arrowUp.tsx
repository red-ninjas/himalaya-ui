'use client';
import React from 'react';
import { IconPropsNative } from './';
const ArrowUp = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
};
export default ArrowUp;
