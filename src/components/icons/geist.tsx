'use client';
import React from 'react';
import { IconPropsNative } from './';
const Geist = ({ size = 24, color, style, ...props }: IconPropsNative) => {
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
        fill="currentColor"
        d="m9.67 6.612-.574 1.02 1.308.736.573-1.02a3.494 3.494 0 0 1-1.307-.736Zm3.353.736.573 1.02 1.308-.736-.574-1.02a3.494 3.494 0 0 1-1.307.736ZM6.419 20.75a3.513 3.513 0 0 0 0-1.5H7.5v1.5H6.42Zm-1.09-3.362.575-1.02-1.308-.736-.573 1.02c.49.15.934.403 1.307.736Zm12.252 1.862a3.516 3.516 0 0 0 0 1.5H16.5v-1.5h1.08Zm2.396-2.598c-.49.15-.934.403-1.307.736l-.574-1.02 1.308-.736.573 1.02ZM9.504 9.968l-.9 1.6-1.308-.736.9-1.6 1.308.736Zm-1.8 3.2-.9 1.6-1.308-.736.9-1.6 1.308.736Zm7.692-1.6-.9-1.6 1.308-.736.9 1.6-1.308.736Zm1.8 3.2-.9-1.6 1.308-.736.9 1.6-1.308.736ZM12.9 20.75h1.8v-1.5h-1.8v1.5Zm-3.6 0h1.8v-1.5H9.3v1.5Z"
      />
      <circle cx="12" cy="4" r="2" />
      <circle cx="3" cy="20" r="2" />
      <circle cx="21" cy="20" r="2" />
    </svg>
  );
};
export default Geist;
