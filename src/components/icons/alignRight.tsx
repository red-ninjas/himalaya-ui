'use client';
import React from 'react';
import { IconPropsNative } from './';
const AlignRight = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M21 10H7M21 6H3M21 14H3M21 18H7" />
    </svg>
  );
};
export default AlignRight;
