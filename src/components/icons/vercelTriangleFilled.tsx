'use client';
import React from 'react';
import { IconPropsNative } from './';
const VercelTriangleFilled = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path fill="currentColor" d="M12 2 2 19.778h20L12 2Z" />
    </svg>
  );
};
export default VercelTriangleFilled;
