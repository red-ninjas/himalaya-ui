'use client';
import React from 'react';
import { IconPropsNative } from './';
const ChevronDownCircleFill = ({ size = 24, color, style, ...props }: IconPropsNative) => {
  return (
    <svg
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
      <path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path fill="none" stroke="var(--ui-icon-background)" d="m8 10.679 4 4 4-4" />
    </svg>
  );
};
export default ChevronDownCircleFill;
