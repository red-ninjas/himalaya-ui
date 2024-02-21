'use client';
import React, { useState } from 'react';
import { SwipeContext } from '../use-swipe/swipe-context';

import { SwipeEventData, useSwipeable } from 'react-swipeable';

const SwipeProvider: React.FC<React.PropsWithChildren> = ({ children }: React.PropsWithChildren<{}>) => {
  const [swiped, setOnSwiping] = useState<SwipeEventData | undefined>(undefined);
  const [swipedToLeft, setSwipedLeft] = useState<SwipeEventData | undefined>(undefined);
  const [swipedToRight, setSwipeToRight] = useState<SwipeEventData | undefined>(undefined);
  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedRight: setSwipeToRight,
    onSwipedLeft: setSwipedLeft,
    onSwiping: setOnSwiping,
  });

  return (
    <>
      <SwipeContext.Provider value={{ ...handlers, swiped, swipedToLeft, swipedToRight }}>{children}</SwipeContext.Provider>
    </>
  );
};

SwipeProvider.displayName = 'HimalayaSwipeProvider';
export default SwipeProvider;
