'use client';
import React, { useState } from 'react';
import { SwipeContext } from '../use-swipe/swipe-context';

import { SwipeEventData, useSwipeable } from 'react-swipeable';

const SwipeProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
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
    <div {...handlers} className="swiper-portal" {...props}>
      <SwipeContext.Provider value={{ swiped, swipedToLeft, swipedToRight }}>{children}</SwipeContext.Provider>

      <style jsx>{`
        .swiper-portal {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

SwipeProvider.displayName = 'HimalayaSwipeProvider';
export default SwipeProvider;
