'use client';

import { isCSSNumberValue } from 'components/utils/collections';
import React, { PropsWithChildren } from 'react';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import useScale, { ScaleResponsiveParameter, customResponsiveAttribute } from '../use-scale';
import withScale from '../use-scale/with-scale';
interface NativeQuickBarProps {
  header?: React.ReactNode;
  gap?: ScaleResponsiveParameter<number | string>;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof NativeQuickBarProps>;
export type QuickBarProps = NativeQuickBarProps & NativeAttrs;

const QuickBarComponent: React.FC<PropsWithChildren<QuickBarProps>> = ({ children, gap = 0.375, className, ...props }) => {
  const { SCALER, RESPONSIVE } = useScale();
  const layout = useLayout();

  return (
    <div className={useClasses('quick-bar', className)} {...props}>
      <div className="quick-bar-inner">{children}</div>
      <style jsx>{`
        .quick-bar-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .quick-bar {
          width: calc(var(--quickbar-width) - 1px);
          left: var(--quickbar-position);
          top: 0;
          height: 100%;
          position: fixed;
          border-right: 1px solid var(--color-border-1000);
          transition: all var(--quickbar-transition) ease;
          transform: translateX(var(--quickbar-position, 0));
        }

        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'iquick-bar-inner')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'quick-bar-inner')}
        ${RESPONSIVE.padding(0.75, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'quick-bar-inner')}

        ${customResponsiveAttribute(gap, 'quick-bar', layout.breakpoints, value =>
          !isCSSNumberValue(value) ? `gap: ${value};` : `gap: calc(var(--scale-unit-scale) * ${value}))`,
        )}

        ${SCALER('quick-bar')}
      `}</style>
    </div>
  );
};

QuickBarComponent.displayName = 'HimalayaQuickBar';
const QuickBar = withScale(QuickBarComponent);
export default QuickBar;
