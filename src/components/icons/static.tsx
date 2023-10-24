'use client';
import React from 'react';
import { IconPropsNative } from './';
const Static = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m12.35 4.602 5.346 5.183a1 1 0 0 1 .304.718v8.177a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.32a1 1 0 0 1 1-1h4.655a1 1 0 0 1 .696.282Z" />
      <path d="M11.4 4.32v6.3H18" />
    </svg>
  );
};
export default Static;
