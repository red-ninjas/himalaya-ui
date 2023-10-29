'use client';

import React from 'react';
import { classNames } from './utils';

export const CarouselTrack: React.FC<React.JSX.IntrinsicElements['div']> = ({ children, className, ...props }) => {
  return (
    <div className={classNames('splide__track', className)} {...props}>
      <ul className="splide__list">{children}</ul>

      <style jsx global>{`
        .splide__track {
          overflow: hidden;
          position: relative;
          z-index: 0;
          width: 100%;
        }

        .splide__list {
          backface-visibility: hidden;
          display: -ms-flexbox;
          display: flex;
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
        }

        .splide__track--ttb > .splide__list {
          display: block;
        }

        .splide.is-initialized:not(.is-active) .splide__list {
          display: block;
        }
      `}</style>
    </div>
  );
};
