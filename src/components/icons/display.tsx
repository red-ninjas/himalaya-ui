'use client';
import React from 'react';
import { IconPropsNative } from './';
const Display = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M2 13.381h20M8.66 19.05V22m6.84-2.95V22m-8.955 0h10.932M4 19.05h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.05a2 2 0 0 0 2 2z" />
    </svg>
  );
};
export default Display;
