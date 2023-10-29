'use client';
import React from 'react';
import { IconPropsNative } from './';
const Bluetooth = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11" />
    </svg>
  );
};
export default Bluetooth;
