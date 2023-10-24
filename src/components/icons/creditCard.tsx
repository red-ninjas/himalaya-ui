'use client';
import React from 'react';
import { IconPropsNative } from './';
const CreditCard = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <rect width="22" height="16" x="1" y="4" rx="2" ry="2" />
      <path d="M1 10h22" />
    </svg>
  );
};
export default CreditCard;
