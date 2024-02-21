'use client';
import React from 'react';
import { SwipeableDirectionCallbacks, SwipeCallback, TapCallback } from 'react-swipeable';
import { ConfigurationOptions, HandledEvents, SwipeEventData } from 'react-swipeable/es/types';

export type SwipeContextProps = Partial<
  SwipeableDirectionCallbacks & {
    onSwipeStart: SwipeCallback;
    onSwiped: SwipeCallback;
    onSwiping: SwipeCallback;
    onTap: TapCallback;
    onTouchStartOrOnMouseDown: TapCallback;
    onTouchEndOrOnMouseUp: TapCallback;
  } & ConfigurationOptions & {
      swipedToLeft: SwipeEventData | undefined;
      swipedToRight: SwipeEventData | undefined;
      swiped: SwipeEventData | undefined;
    }
>;

export const defaultConfigs: SwipeContextProps = {
  onSwipeStart: (event: SwipeEventData) => {},
  onSwiped: (event: SwipeEventData) => {},
  onSwiping: (event: SwipeEventData) => {},
  onTap: ({ event }: { event: HandledEvents }) => {},
  onTouchStartOrOnMouseDown: ({ event }: { event: HandledEvents }) => {},
  onTouchEndOrOnMouseUp: ({ event }: { event: HandledEvents }) => {},
};

export const SwipeContext = React.createContext<SwipeContextProps>(defaultConfigs);
export const useSwipe = (): SwipeContextProps => React.useContext(SwipeContext);
