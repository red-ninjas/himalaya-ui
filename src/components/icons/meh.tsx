'use client';
import React from 'react';
import { IconPropsNative } from './';
const Meh = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15h8M9 9h.01M15 9h.01" />
    </svg>
  );
};
export default Meh;
