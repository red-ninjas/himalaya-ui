import { EventMap, Splide } from '@splidejs/splide';

import { ComponentConstructor, Options } from '@splidejs/splide';
import { DOMAttributes, HTMLAttributes } from 'react';

import { default as Carousel } from './carousel';
export { CarouselItem } from './carousel-item';

export type SliderOptions = Omit<Options, 'classes'>;
export type SplideEventHandlerMap = {
  onMounted: 'mounted';
  onReady: 'ready';
  onMove: 'move';
  onMoved: 'moved';
  onClick: 'click';
  onActive: 'active';
  onInactive: 'inactive';
  onVisible: 'visible';
  onHidden: 'hidden';
  onRefresh: 'refresh';
  onUpdated: 'updated';
  onResize: 'resize';
  onResized: 'resized';
  onDrag: 'drag';
  onDragging: 'dragging';
  onDragged: 'dragged';
  onScroll: 'scroll';
  onScrolled: 'scrolled';
  onDestroy: 'destroy';
  onArrowsMounted: 'arrows:mounted';
  onArrowsUpdated: 'arrows:updated';
  onPaginationMounted: 'pagination:mounted';
  onPaginationUpdated: 'pagination:updated';
  onNavigationMounted: 'navigation:mounted';
  onAutoplayPlay: 'autoplay:play';
  onAutoplayPlaying: 'autoplay:playing';
  onAutoplayPause: 'autoplay:pause';
  onLazyLoadLoaded: 'lazyload:loaded';
};

export interface SplideProps extends SplideHTMLAttributes, Partial<SplideEventHandlers> {
  options?: SliderOptions;
  extensions?: Record<string, ComponentConstructor>;
  transition?: ComponentConstructor;
  arrowSize?: number;
}

export interface SplideHTMLAttributes extends Partial<Omit<HTMLAttributes<HTMLDivElement>, keyof DOMAttributes<HTMLDivElement>>> {}

export type SplideEventHandlers = {
  [K in keyof SplideEventHandlerMap]: (
    splide: Splide,
    ...args: Parameters<EventMap[SplideEventHandlerMap[K]]>
  ) => ReturnType<EventMap[SplideEventHandlerMap[K]]>;
};

export default Carousel;
