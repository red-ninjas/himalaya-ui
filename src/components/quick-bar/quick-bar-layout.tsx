'use client';

import React from 'react';
import { QuickBarLayoutProps } from '.';
import { InnerScroll } from '../scroll';
import useClasses from '../use-classes';
import useQuickBar from '../use-quickbar';
import { useScale, withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import { default as QuickBar } from './quick-bar';

const QuickBarLayout: React.FC<React.PropsWithChildren<QuickBarLayoutProps>> = ({ children, className, animationTime = 250, ...props }) => {
  const [otherElements, quickBar] = pickChild(children, QuickBar);
  const { RESPONSIVE, SCALER, HIDER } = useScale();
  const { isEnabled } = useQuickBar();

  return (
    <>
      <div
        {...props}
        className={useClasses(
          'quickbar-layout',
          className,
          {
            'quickbar-active': isEnabled,
          },
          HIDER,
        )}
      >
        <div className="quickbar-content">
          <div className="quickbar-content-inner">{otherElements}</div>
        </div>
        {quickBar && (
          <div className="quickbar-inner">
            <InnerScroll h={'100%'} w={'100%'} type="vertical">
              {quickBar}
            </InnerScroll>
          </div>
        )}
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

        .quickbar-inner {
          position: absolute;
          left: var(--quickbar-position);
          top: 0;
          transition: all var(--quickbar-transition) ease;
          transform: translateX(var(--quickbar-position, 0));
          height: 100%;
          border-right: 1px solid var(--color-border-1000);
          width: var(--quickbar-width);
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
