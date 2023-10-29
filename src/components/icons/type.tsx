'use client';
import React from 'react';
import { IconPropsNative } from './';
const Type = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  );
};
export default Type;
