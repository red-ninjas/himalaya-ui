'use client';
import React from 'react';
import { IconPropsNative } from './';
const ArrowDownRight = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m7 7 10 10M17 7v10H7" />
    </svg>
  );
};
export default ArrowDownRight;
