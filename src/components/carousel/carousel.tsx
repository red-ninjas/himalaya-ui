'use client';

import { Splide as SplideCore } from '@splidejs/splide';
import React, { useEffect, useLayoutEffect } from 'react';
import { SliderOptions, SplideProps } from '.';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import { CarouselItem } from './carousel-item';
import CarouseStyles from './carousel-styles';
import { CarouselTrack } from './carousel-track';
import { EVENTS } from './constants/events';
import { classNames, merge } from './utils';
import { omit } from 'lodash';
import { CarouselButtons } from './carousel-buttons';

const classOverride = {
  arrows: 'carousel_arrows',
  arrow: 'carousel_arrow',
  prev: 'carousel_arrow--prev',
  next: 'carousel_arrow--next',

  pagination: 'splide__pagination',
  page: 'splide__pagination_item',
};

const CarouselComponent: React.FC<React.PropsWithChildren<SplideProps>> = ({
  children,
  options = {},
  extensions,
  transition,
  className,
  arrowSize = 38,
  ...props
}) => {
  const { SCALES } = useScale();
  const splideRef = React.createRef<HTMLDivElement>();
  const [buttons, slides] = pickChild(children, CarouselItem);
  let splide: SplideCore | undefined = undefined;

  const cleanUp = () => {
    if (splide) {
      splide.destroy();
      splide = undefined;
    }
  };

  const init = () => {
    if (splideRef && splideRef.current) {
      cleanUp();

      const overrideOptions: SliderOptions = merge({ classes: classOverride }, options || {});
      splide = new SplideCore(splideRef.current, overrideOptions);
      bind();
      splide.mount(extensions, transition);
    }
  };

  const bind = () => {
    EVENTS.forEach(([event, name]) => {
      if (typeof name === 'string') {
        const handler = props[name];

        if (typeof handler === 'function' && splide) {
          splide.on(event, (...args: any[]) => {
            if (splide) {
              handler(splide, ...args);
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    init();
    return () => {
      cleanUp();
    };
  }, []);

  useEffect(() => {
    if (splide) {
      const overrideOptions: SliderOptions = merge({ classes: classOverride }, options || {});
      splide.options = overrideOptions;
    }
  }, [options]);

  useLayoutEffect(() => {
    if (splide) {
      splide.refresh();
    }
  }, [slides]);

  const htmlOps = omit(props, [...EVENTS.map(event => event[1])]);

  return (
    <CarouseStyles arrowSize={arrowSize}>
      <div className={classNames('splide', className)} ref={splideRef} {...htmlOps}>
        <div className="splide-inner">
          <CarouselTrack>{slides}</CarouselTrack>

          <CarouselButtons>{buttons}</CarouselButtons>
        </div>
        <ul className="splide__pagination"></ul>
      </div>

      <style jsx>{`
        .splide {
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </CarouseStyles>
  );
};

CarouselComponent.displayName = 'HimalayaCarousel';
const Carousel = withScale(CarouselComponent);
export default Carousel;
