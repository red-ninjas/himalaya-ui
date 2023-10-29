'use client';
import React from 'react';
import { IconPropsNative } from './';
const ChevronsRight = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
    </svg>
  );
};
export default ChevronsRight;
