'use client';
import React from 'react';
import { IconPropsNative } from './';
const Navigation = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m3 11 19-9-9 19-2-8-8-2z" />
    </svg>
  );
};
export default Navigation;
