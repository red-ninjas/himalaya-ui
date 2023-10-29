'use client';
import React from 'react';
import { IconPropsNative } from './';
const CheckInDashedCircle = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path
        stroke="#888"
        d="m8 11.857 2.5 2.5L15.857 9M21.77 14.18c.16-.7.24-1.43.24-2.17s-.09-1.47-.24-2.17M3.58 17.37c.79 1.23 1.83 2.28 3.07 3.07m3.19 1.33c.7.16 1.43.24 2.17.24s1.47-.09 2.17-.24m3.19-1.33c1.23-.79 2.28-1.83 3.07-3.07M6.65 3.58c-1.23.79-2.28 1.83-3.07 3.07M2.25 9.84c-.16.7-.24 1.43-.24 2.17s.09 1.47.24 2.17M14.18 2.25c-.7-.16-1.43-.24-2.17-.24s-1.47.09-2.17.24m10.6 4.4c-.79-1.23-1.83-2.28-3.07-3.07"
      />
    </svg>
  );
};
export default CheckInDashedCircle;
