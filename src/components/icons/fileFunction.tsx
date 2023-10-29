'use client';
import React from 'react';
import { IconPropsNative } from './';
const FileFunction = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M13 2H6a2 2 0 0 0-2 2v16m0 0a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M4 20V9m16 11V9m0 11V4a2 2 0 0 0-2-2h-7" />
      <path d="M9 11.236h2.848M9 18c1.934 0 2.848-.996 2.848-2.793v-3.97m0 0h2.813m-2.813 0V8.983c0-1.937 1.034-3.265 3.152-2.933" />
    </svg>
  );
};
export default FileFunction;
