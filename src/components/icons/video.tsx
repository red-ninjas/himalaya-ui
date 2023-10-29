'use client';
import React from 'react';
import { IconPropsNative } from './';
const Video = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m23 7-7 5 7 5V7z" />
      <rect width="15" height="14" x="1" y="5" rx="2" ry="2" />
    </svg>
  );
};
export default Video;
