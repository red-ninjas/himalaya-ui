'use client';
import React from 'react';
import { IconPropsNative } from './';
const Battery = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <rect width="18" height="12" x="1" y="6" rx="2" ry="2" />
      <path d="M23 13v-2" />
    </svg>
  );
};
export default Battery;
