'use client';
import React from 'react';
import { IconPropsNative } from './';
const Lambda = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
      <path d="M6.998 3.5c-.216 0-.364.142-.364.314 0 .171.146.315.337.315l.228.002c.902.016 1.41.135 1.833.437.416.298.784.798 1.277 1.724l.227.44 1.591 3.543-.137.225-6.445 10.528a.299.299 0 0 0-.005.306c.057.1.167.164.288.166a.338.338 0 0 0 .295-.158l6.334-10.347.392.852 3.042 6.627.496 1.126.11.236c.2.424.373.714.575.944.429.49.98.692 1.88.717l.182.004.08-.004a.321.321 0 0 0 .286-.312c0-.17-.147-.314-.34-.314l-.193-.003c-.728-.02-1.094-.16-1.392-.501l-.06-.073a3.994 3.994 0 0 1-.41-.715c-.048-.1-.098-.208-.155-.336l-.447-1.017-3.696-8.052-1.662-3.698-.158-.31c-.574-1.103-1.016-1.714-1.553-2.098-.551-.396-1.19-.548-2.208-.566L6.998 3.5Z" />
    </svg>
  );
};
export default Lambda;
