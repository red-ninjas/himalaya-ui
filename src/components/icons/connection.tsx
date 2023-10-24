'use client';
import React from 'react';
import { IconPropsNative } from './';
const Connection = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M9.121 14.879 14.88 9.12M10 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM20 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
};
export default Connection;
