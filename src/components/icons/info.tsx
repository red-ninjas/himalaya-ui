'use client';
import React from 'react';
import { IconPropsNative } from './';
const Info = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <circle cx="12" cy="12" r="10" fill="transparent" />
      <path stroke="currentColor" d="M12 16v-4M12 8h.01" />
    </svg>
  );
};
export default Info;
