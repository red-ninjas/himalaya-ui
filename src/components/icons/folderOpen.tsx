'use client';
import React from 'react';
import { IconPropsNative } from './';
const FolderOpen = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m5.4 7.7-3.8 9a1 1 0 0 0 1 1.3h17a1 1 0 0 0 1-.6L24 8.7a1 1 0 0 0-.9-1.4L6.3 7.1a1 1 0 0 0-1 .6z" />
      <path d="M20.3 7.2V5c0-.6-.4-1-1-1H9.7a1 1 0 0 1-.8-.6L7.8 1.5a1 1 0 0 0-.9-.5H2a1 1 0 0 0-1 1v16" />
    </svg>
  );
};
export default FolderOpen;
