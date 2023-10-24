'use client';
import React from 'react';
import { IconPropsNative } from './';
const Trello = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <path d="M7 7h3v9H7zM14 7h3v5h-3z" />
    </svg>
  );
};
export default Trello;
