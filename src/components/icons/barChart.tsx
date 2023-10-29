'use client';
import React from 'react';
import { IconPropsNative } from './';
const BarChart = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M12 20V10M18 20V4M6 20v-4" />
    </svg>
  );
};
export default BarChart;
