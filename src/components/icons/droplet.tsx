'use client';
import React from 'react';
import { IconPropsNative } from './';
const Droplet = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m12 2.69 5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
};
export default Droplet;
