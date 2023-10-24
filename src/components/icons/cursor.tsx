'use client';
import React from 'react';
import { IconPropsNative } from './';
const Cursor = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m4 4 16 5.333L12 12l-2.667 8L4 4Z" />
    </svg>
  );
};
export default Cursor;
