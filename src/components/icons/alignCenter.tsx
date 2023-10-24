'use client';
import React from 'react';
import { IconPropsNative } from './';
const AlignCenter = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M18 10H6M21 6H3M21 14H3M18 18H6" />
    </svg>
  );
};
export default AlignCenter;
