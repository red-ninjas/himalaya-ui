'use client';

import React, { PropsWithChildren } from 'react';
import useTheme from '../use-theme';

const CarouseStyles: React.FC<
  PropsWithChildren<{
    arrowSize?: number;
  }>
> = ({ children, arrowSize = 36 }) => {
  const theme = useTheme();

  return (
    <div className="carousel-wrapper">
      {children}
      <style jsx>{`
        .carousel-wrapper {
          --carousel-pagination-item-bg: ${theme.palette.foreground};
          --carousel-arrow-bg: ${theme.palette.accents_4};
          --carousel-arrow-bg-color: ${theme.palette.accents_7};
          --carousel-arrow-hover: ${theme.palette.accents_6};
          --carousel-arrow-size: ${arrowSize}px;
        }
      `}</style>
      <style jsx global>{`
        .splide-inner {
          position: relative;
        }
        .splide__track--draggable {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .splide--rtl {
          direction: rtl;
        }

        .splide__container {
          box-sizing: border-box;
          position: relative;
        }

        .splide__pagination {
          -ms-flex-align: center;
          align-items: center;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          -ms-flex-pack: center;
          justify-content: center;
          margin: 0;
          pointer-events: none;
        }

        .splide__pagination li {
          display: inline-block;
          line-height: 1;
          list-style-type: none;
          margin: 0;
          pointer-events: auto;
          margin-inline: 4px;
        }

        .splide__pagination li:before {
          display: none;
        }

        .splide__pagination_item {
          height: 5px;
          width: 16px;
          background: var(--carousel-pagination-item-bg);
          border: 0;
          border-radius: 1px;
          outline: none;
          cursor: pointer;
          opacity: 0.3;
          transition: all 0.3s;
        }

        .splide__pagination_item.is-active {
          width: 24px;
          opacity: 1;
        }

        .splide__pagination_item:hover {
          opacity: 1;
        }

        .splide__pagination {
          margin-top: 24px;
        }

        .splide:not(.is-overflow) .splide__pagination {
          display: none;
        }

        .splide {
          position: relative;
          visibility: hidden;
        }

        .splide.is-initialized,
        .splide.is-rendered {
          visibility: visible;
        }

        .splide__sr {
          clip: rect(0 0 0 0);
          border: 0;
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
        }

        .splide__toggle.is-active .splide__toggle__play,
        .splide__toggle__pause {
          display: none;
        }

        .splide__toggle.is-active .splide__toggle__pause {
          display: inline;
        }

        .splide__slide {
          backface-visibility: hidden;
          box-sizing: border-box;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          list-style-type: none !important;
          margin: 0;
          padding: 0;
          position: relative;
          line-height: normal;
        }

        .splide__slide:before {
          display: none;
        }

        .splide__track--fade > .splide__list > .splide__slide {
          margin: 0 !important;
          opacity: 0;
          z-index: 0;
        }

        .splide__track--fade > .splide__list > .splide__slide.is-active {
          opacity: 1;
          z-index: 1;
        }

        .splide__arrow {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          background: transparent;
          border: 0;
          padding: 0;
          margin: 0;
        }

        .splide__arrow--prev {
          left: auto;
          right: 0;
        }

        .splide__arrow__inner {
          border-radius: 50%;
          background: var(--carousel-arrow-bg);
          height: var(--carousel-arrow-size);
          width: var(--carousel-arrow-size);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--arrow-bg-color);
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .splide-inner:hover .splide__arrow__inner {
          opacity: 0.85;
        }

        .splide__arrow__inner:hover {
          background: var(--carousel-pagination-item-bg);
          color: var(--carousel-arrow-hover);
          cursor: pointer;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

CarouseStyles.displayName = 'HimalayaCarouseStyles';
export default CarouseStyles;
