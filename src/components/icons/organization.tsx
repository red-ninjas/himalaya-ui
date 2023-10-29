'use client';
import React from 'react';
import { IconPropsNative } from './';
const Organization = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="m17.466 10.818 2.632 1.118a1.892 1.892 0 0 1 1.152 1.741v6.127a.946.946 0 0 1-.946.946h-2.838V5.142a1.892 1.892 0 0 0-1.892-1.892H5.642A1.892 1.892 0 0 0 3.75 5.142V20.75m8.986 0v-3.784a.473.473 0 0 0-.473-.473h-3.31a.473.473 0 0 0-.473.473v3.784m0-13.716h.473m3.31 0h.473M8.48 9.872h.473m3.31 0h.473M8.48 12.71h.473m3.31 0h.473" />
    </svg>
  );
};
export default Organization;
