'use client';
import React from 'react';
import { IconPropsNative } from './';
const CheckInCircleFill = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path fill="currentColor" stroke="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" />
      <path fill="none" stroke="var(--ui-icon-background)" d="m8 11.857 2.5 2.5L15.857 9" />
    </svg>
  );
};
export default CheckInCircleFill;
