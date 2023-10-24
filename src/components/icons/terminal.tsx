'use client';
import React from 'react';
import { IconPropsNative } from './';
const Terminal = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m4 17 6-6-6-6M12 19h8" />
    </svg>
  );
};
export default Terminal;
