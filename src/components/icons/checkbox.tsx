'use client';
import React from 'react';
import { IconPropsNative } from './';
const Checkbox = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M16.09 3H7.91A4.91 4.91 0 0 0 3 7.91v8.18A4.909 4.909 0 0 0 7.91 21h8.18A4.909 4.909 0 0 0 21 16.09V7.91A4.909 4.909 0 0 0 16.09 3z" />
    </svg>
  );
};
export default Checkbox;
