'use client';
import React from 'react';
import { IconPropsNative } from './';
const CheckboxFill = ({ size = 24, color, style, ...props }: IconPropsNative) => {
  return (
    <svg
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
      <path
        fill="currentColor"
        stroke="none"
        d="M7.91 3h8.18a4.908 4.908 0 0 1 4.31 2.554l-8.273 8.377-2.592-2.638a.75.75 0 1 0-1.07 1.05l3.125 3.182a.75.75 0 0 0 1.069.002l8.281-8.386c.04.25.06.507.06.768v8.182A4.909 4.909 0 0 1 16.09 21H7.91A4.909 4.909 0 0 1 3 16.09V7.91A4.91 4.91 0 0 1 7.91 3z"
      />
    </svg>
  );
};
export default CheckboxFill;
