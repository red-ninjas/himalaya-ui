'use client';
import React from 'react';
import { IconPropsNative } from './';
const Document = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M7.069 21.6h9.15a4.67 4.67 0 0 0 4.669-4.669V5.87A4.67 4.67 0 0 0 16.219 1.2h-9.15A4.67 4.67 0 0 0 2.4 5.869V16.93A4.67 4.67 0 0 0 7.069 21.6ZM15.395 15.842H7.892m7.503-4.597H7.892m2.863-4.586H7.892" />
    </svg>
  );
};
export default Document;
