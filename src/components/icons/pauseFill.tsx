'use client';
import React from 'react';
import { IconPropsNative } from './';
const PauseFill = ({ size = 24, color, style, ...props }: IconPropsNative) => {
  return (
    <svg
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
      <path fill="currentColor" d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  );
};
export default PauseFill;
