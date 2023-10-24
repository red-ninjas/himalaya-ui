'use client';
import React from 'react';
import { IconPropsNative } from './';
const CornerLeftDown = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m14 15-5 5-5-5" />
      <path d="M20 4h-7a4 4 0 0 0-4 4v12" />
    </svg>
  );
};
export default CornerLeftDown;
