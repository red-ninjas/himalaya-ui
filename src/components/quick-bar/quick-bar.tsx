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
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();
  const layout = useLayout();

  return (
    <div className={useClasses('quickbar', className, SCALE_CLASSES)} {...props}>
      {children}
      <style jsx>{`
        .quickbar {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'quickbar')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'quickbar')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'quickbar')}
        ${RESPONSIVE.padding(0.75, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'quickbar')}

        ${customResponsiveAttribute(gap, 'quickbar', layout.breakpoints, value =>
          !isCSSNumberValue(value) ? `gap: ${value};` : `gap: calc(var(--scale-unit-scale) * ${value})`,
        )}

        ${SCALER('quickbar')}
      `}</style>
    </div>
  );
};

QuickBarComponent.displayName = 'HimalayaQuickBar';
const QuickBar = withScale(QuickBarComponent);
export default QuickBar;
