'use client';

import React from 'react';
import { QuickBarLayoutProps } from '.';
import { InnerScroll } from '../scroll';
import useClasses from '../use-classes';
import useQuickBar from '../use-quickbar';
import { customResponsiveAttribute, useScale, withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import { default as QuickBar } from './quick-bar';
import useLayout from '../use-layout';

const QuickBarLayout: React.FC<React.PropsWithChildren<QuickBarLayoutProps>> = ({
  children,
  hasBorder = true,
  disabled,
  className,
  animationTime = 200,
  ...props
}) => {
  const [otherElements, quickBar] = pickChild(children, QuickBar);
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();
  const { isEnabled } = useQuickBar();
  const layout = useLayout();
  return (
    <>
      <div
        {...props}
        className={useClasses(
          'quickbar-layout',
          className,
          {
            enabled: isEnabled === true,
            disabled: isEnabled === false,
          },
          SCALE_CLASSES,
        )}
      >
        {quickBar && (
          <div className="quickbar-inner">
            <InnerScroll h={'100%'} w={'100%'} type="vertical">
              {quickBar}
            </InnerScroll>
          </div>
        )}
        <div className="quickbar-content">{otherElements}</div>
      </div>
      <style jsx>{`
        .quickbar-layout {
          width: 100%;
          height: 100vh;
          position: relative;
          width: 100%;
          overflow: hidden;
          --quickbar-transition: ${animationTime}ms;
          box-sizing: border-box;
          --quickbar-left: var(--quickbar-width);
          --quickbar-side: 0;
          clip-path: inset(0);
        }

        .quickbar-content {
          height: 100%;
          overflow: hidden;
          transition: all var(--quickbar-transition) ease;
          width: calc(100% - var(--quickbar-left));
          box-sizing: border-box;
          transform: translate(var(--quickbar-left));
          display: flex;
          flex-direction: column;
        }

        .quickbar-inner {
          position: fixed;
          left: 0;
          top: 0;
          transition: all var(--quickbar-transition) ease;
          transform: translateX(var(--quickbar-side));
          width: var(--quickbar-width);

          height: 100%;

          border-color: var(--color-border-1000);
          border-width: ${hasBorder ? '1px' : '0'};
          border-style: solid;
        }

        quickbar-layout.enabled {
          --quickbar-left: var(--quickbar-width);
          --quickbar-side: 0;
        }

        quickbar-layout.disabled {
          --quickbar-left: 0;
          --quickbar-side: calc(var(--quickbar-width) * -1);
        }

        ${RESPONSIVE.w(3.75, value => `--quickbar-width: ${value};`, undefined, 'quickbar-layout')}
        ${SCALER('quickbar-layout')}

        ${customResponsiveAttribute(disabled, 'quickbar-layout', layout.breakpoints, (value, key) =>
          value === true
            ? `--quickbar-left: 0; --quickbar-side: calc(var(--quickbar-width) * -1);`
            : `--quickbar-left: var(--quickbar-width);  --quickbar-side: 0;`,
        )}
      `}</style>
    </>
  );
};

QuickBarLayout.displayName = 'HimalayaQuickBarLayout';
export default withScale(QuickBarLayout);
