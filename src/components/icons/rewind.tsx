'use client';
import React from 'react';
import { IconPropsNative } from './';
const Rewind = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m11 19-9-7 9-7v14zM22 19l-9-7 9-7v14z" />
    </svg>
  );
};
export default Rewind;
