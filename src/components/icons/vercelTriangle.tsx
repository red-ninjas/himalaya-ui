'use client';
import React from 'react';
import { IconPropsNative } from './';
const VercelTriangle = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M12 3 2 19h20L12 3Z" />
    </svg>
  );
};
export default VercelTriangle;
