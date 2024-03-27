'use client';

import React from 'react';
import { QuickBarLayoutProps } from '.';
import { useScale, withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import { default as QuickBar } from './quick-bar';
import useQuickBar from '../use-quickbar';
import useClasses from '../use-classes';

const QuickBarLayout: React.FC<React.PropsWithChildren<QuickBarLayoutProps>> = ({ children, className, animationTime = 250, ...props }) => {
  const [otherElements, quickBar] = pickChild(children, QuickBar);
  const { RESPONSIVE, SCALER } = useScale();
  const { isEnabled } = useQuickBar();

  return (
    <>
      <div
        {...props}
        className={useClasses('quickbar-layout', className, {
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
          --quickbar-transition: ${animationTime}ms;
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

        .quickbar-layout.quickbar-active {
          --quickbar-position: 0;
          --quickbar-position-content: calc(var(--quickbar-width));
        }

        .quickbar-layout.quickbar-active .quickbar-content {
          left: 0;
          width: calc(100% - var(--quickbar-width));
          transform: translate(var(--quickbar-position-content), 0);
        }

        ${RESPONSIVE.w(3.75, value => `--quickbar-width: ${value}; --quickbar-position: calc(${value} * -1)`, undefined, 'quickbar-layout')}
        ${SCALER('quickbar-layout')}
      `}</style>
    </>
  );
};

QuickBarLayout.displayName = 'HimalayaQuickBarLayout';
export default withScale(QuickBarLayout);
