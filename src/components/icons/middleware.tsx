'use client';
import React from 'react';
import { IconPropsNative } from './';
const Middleware = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m10.2 12-7.8 4.8V7.2l7.8 4.8ZM15.6 9.6v4.8M21.6 7.2v9.6" />
    </svg>
  );
};
export default Middleware;
