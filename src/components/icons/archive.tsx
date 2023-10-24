'use client';
import React from 'react';
import { IconPropsNative } from './';
const Archive = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
    </svg>
  );
};
export default Archive;
