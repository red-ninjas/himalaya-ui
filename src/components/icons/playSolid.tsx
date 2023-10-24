'use client';
import React from 'react';
import { IconPropsNative } from './';
const PlaySolid = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path fill="currentColor" d="m5 3 14 9-14 9V3z" />
    </svg>
  );
};
export default PlaySolid;
