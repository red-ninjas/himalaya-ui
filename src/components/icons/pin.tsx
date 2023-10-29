'use client';
import React from 'react';
import { IconPropsNative } from './';
const Pin = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m6.52 10.2 4.24 5.65m.01-9.9a2 2 0 0 0 0-2.83l-.7-.71L3 9.49l.7.7a1.998 1.998 0 0 0 2.83 0m4.24 5.66 5.66-5.66m-5.66 5.66s-1.76 2.47.71 4.95l9.89-9.9c-2.47-2.48-4.95-.7-4.95-.7m-5.65 5.65 5.65-5.65m0 0-5.66-4.25m5.66 9.9 4.24 4.24" />
    </svg>
  );
};
export default Pin;
