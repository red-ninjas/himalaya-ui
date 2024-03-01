'use client';
import React from 'react';
import { IconPropsNative } from '.';
const Telegram = ({ size = 24, color, style, ...props }: IconPropsNative) => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
      fillRule="evenodd"
      {...props}
      height={size}
      width={size}
      style={{ ...style, color: color }}
    >
      <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
    </svg>
  );
};
export default Telegram;
