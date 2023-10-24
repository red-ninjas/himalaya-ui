'use client';
import React from 'react';
import { IconPropsNative } from './';
const Crop = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M6.13 1 6 16a2 2 0 0 0 2 2h15" />
      <path d="M1 6.13 16 6a2 2 0 0 1 2 2v15" />
    </svg>
  );
};
export default Crop;
