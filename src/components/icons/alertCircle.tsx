'use client';
import React from 'react';
import { IconPropsNative } from './';
const AlertCircle = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path stroke="var(--ui-icon-background)" d="M12 8v4M12 16h.01" />
    </svg>
  );
};
export default AlertCircle;
