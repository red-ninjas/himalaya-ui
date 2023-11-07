'use client';
import React from 'react';
import { IconPropsNative } from './';
const BoxWithRing = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 36">
        <path
          stroke="var(--ui-icon-foreground)"
          d="M6 23v2.14a3 3 0 0 0 1.65 2.7l12 6a3 3 0 0 0 2.685 0l12-6A3.001 3.001 0 0 0 36 25.155V23M6 14v-3.14a3 3 0 0 1 1.665-2.685l12-6a3 3 0 0 1 2.67 0l12 6A3 3 0 0 1 36 10.86V14"
        />
        <path stroke="var(--ui-icon-foreground)" d="M6.48 9.24 21 16.5l14.52-7.26M21 34.14V30m0-13.5V21" />
        <path stroke="var(--ui-icon-foreground)" d="m39 15.461 1.52.779L21 26 1.48 16.24 3 15.461" />
      </svg>
    </svg>
  );
};
export default BoxWithRing;
