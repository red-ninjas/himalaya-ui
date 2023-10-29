'use client';
import React from 'react';
import { IconPropsNative } from './';
const Volume = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
    </svg>
  );
};
export default Volume;
