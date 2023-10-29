'use client';

import React from 'react';
import { QuickBarLayoutProps } from '.';
import { useScale, withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import { default as QuickBar } from './quick-bar';
import useQuickBar from '../use-quickbar';
import useClasses from '../use-classes';

const QuickBarLayout: React.FC<React.PropsWithChildren<QuickBarLayoutProps>> = ({ children, animationTime = 250 }) => {
  const [otherElements, quickBar] = pickChild(children, QuickBar);
  const { SCALES } = useScale();
  const { isEnabled } = useQuickBar();

  return (
    <>
      <div
        className={useClasses('quickbar-layout', {
          'quickbar-active': isEnabled,
        })}
      >
        <div className="quickbar-content">
          <div className="quickbar-content-inner">{otherElements}</div>
        </div>
        {quickBar}
      </div>
      <style jsx>{`
        .quickbar-layout {
          width: 100%;
          height: 100%;
          position: relative;
          --quickbar-width: ${SCALES.width(1, '60px')};
          --quickbar-transition: ${animationTime}ms;
          --quickbar-position: -${SCALES.width(1, '60px')};
          --quickbar-position-content: 0;
        }

        .quickbar-content {
          left: 0;
          top: 0;
          right: 0;
          height: 100%;
          position: absolute;
          transition: all var(--quickbar-transition) ease;
          transform: translate(0%, 0);
          width: 100%;
        }
        .quickbar-content-inner {
          height: 100%;
          overflow: hidden;
        }

        .quickbar-active {
          --quickbar-position: 0;
          --quickbar-position-content: calc(var(--quickbar-width));
        }

        .quickbar-active .quickbar-content {
          left: 0;
          width: calc(100% - var(--quickbar-width));
          transform: translate(var(--quickbar-position-content), 0);
        }
      `}</style>
    </>
  );
};

QuickBarLayout.displayName = 'HimalayaQuickBarLayout';
export default withScale(QuickBarLayout);
