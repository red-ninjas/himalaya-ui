'use client';
import React from 'react';
import { IconPropsNative } from './';
const Edge = ({ size = 24, color, style, ...props }: IconPropsNative) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 20 20"
      {...props}
      height={size}
      width={size}
      style={{ ...style, color: color }}
    >
      <path
        fill="var(--ui-icon-foreground)"
        fillRule="evenodd"
        stroke="var(--ui-icon-foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".2"
        d="M10.657 2.908a.248.248 0 0 0-.409-.083L5.814 7.36a.248.248 0 0 0 .273.403l3.815-1.582 3.99 6.383a.248.248 0 0 0 .443-.222l-3.678-9.435ZM8.24 9.082a.248.248 0 0 0-.401-.289l-6.027 6.84a.248.248 0 0 0 .13.405l6.027 1.386a.248.248 0 0 0 .204-.442L5.01 14.644l3.23-5.562Zm8.003 1.626a.248.248 0 0 0-.483.08v3.897l-7.356.144a.248.248 0 0 0-.035.493l9.593 1.565a.248.248 0 0 0 .275-.326l-1.994-5.853Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
export default Edge;
