'use client';
import React from 'react';
import { IconPropsNative } from './';
const Function = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M8 10.854h3.798M8 21c2.578 0 3.798-1.494 3.798-4.19v-5.956m0 0h3.75m-3.75 0V7.476c0-2.906 1.379-4.898 4.202-4.4" />
    </svg>
  );
};
export default Function;
