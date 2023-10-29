'use client';
import React from 'react';
import { IconPropsNative } from './';
const ChevronsLeftRight = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m8.75 6-6 6 6 6M16.75 18l6-6-6-6" />
    </svg>
  );
};
export default ChevronsLeftRight;
