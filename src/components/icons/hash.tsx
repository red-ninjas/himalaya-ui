'use client';
import React from 'react';
import { IconPropsNative } from './';
const Hash = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
    </svg>
  );
};
export default Hash;
