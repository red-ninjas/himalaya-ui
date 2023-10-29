'use client';
import React from 'react';
import { IconPropsNative } from './';
const Branch = ({ size = 24, color, style, ...props }: IconPropsNative) => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      shapeRendering="geometricPrecision"
      viewBox="0 0 20 20"
      {...props}
      height={size}
      width={size}
      style={{ ...style, color: color }}
    >
      <path d="M5 2.5v10m10-5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-10 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm10-10A7.5 7.5 0 0 1 7.5 15" />
    </svg>
  );
};
export default Branch;
