'use client';
import React from 'react';
import { IconPropsNative } from './';
const Monitor = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <rect width="20" height="14" x="2" y="3" rx="2" ry="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
};
export default Monitor;
