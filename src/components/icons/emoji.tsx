'use client';
import React from 'react';
import { IconPropsNative } from './';
const Emoji = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path fill="currentColor" d="M7 14.5s0 4 5 4 5-4 5-4" />
      <path d="M7 14.5s0 4 5 4 5-4 5-4H7z" />
      <circle cx="15.5" cy="9.5" r=".8" />
      <circle cx="8.5" cy="9.5" r=".8" />
    </svg>
  );
};
export default Emoji;
