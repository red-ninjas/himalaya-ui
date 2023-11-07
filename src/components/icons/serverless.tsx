'use client';
import React from 'react';
import { IconPropsNative } from './';
const Serverless = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <defs>
        <mask id="a">
          <path fill="#fff" d="M9.97 2.283 2.942 6.501v8.984l3.87-2.276 2.53.44L4 16.5l6.44 1.717 6.56-3.75V5.926l-4.686 2.276-3.126-.452L16.5 4 9.97 2.283Z" />
        </mask>
      </defs>
      <path
        stroke="var(--ui-icon-foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m5.615 15.026 3.705 1.238a1.821 1.821 0 0 0 1.46-.134l4.392-2.435c.579-.32.938-.93.938-1.592V7.382L4.048 13.175V8.01c0-.662.36-1.272.938-1.593l4.266-2.363a1.82 1.82 0 0 1 1.678-.046l2.914 1.416"
        mask="url(#a)"
      />
    </svg>
  );
};
export default Serverless;
