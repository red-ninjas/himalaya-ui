'use client';

import React from 'react';
import { classNames } from './utils';

export const CarouselItem: React.FC<React.JSX.IntrinsicElements['li']> = ({ children, className, ...props }) => {
  return (
    <li className={classNames('splide__slide', className)} {...props}>
      {children}
    </li>
  );
};
