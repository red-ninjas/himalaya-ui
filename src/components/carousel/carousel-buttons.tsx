'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from '../icons';

export const CarouselButtons: React.FC<React.JSX.IntrinsicElements['div']> = ({children}) => {
    const defaultArrows = <div className="splide__arrows">
                                <button className="splide__arrow splide__arrow--prev" type="button">
                                    <div className="splide__arrow__inner">
                                        <ArrowLeft />
                                    </div>
                                </button>
                                <button className="splide__arrow splide__arrow--next" type="button">
                                    <div className="splide__arrow__inner">
                                        <ArrowRight />
                                    </div>
                                </button>
                            </div>

    const arrows = React.Children.count(children) > 0 ? children : defaultArrows
  return (
        <>
            {arrows}
        </>
    );
};
