'use client';
import useClasses from '../use-classes';
import React from 'react';
import useScale, { withScale } from '../use-scale';

interface Props {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type FieldsetFooterProps = Props & NativeAttrs;

const FieldsetFooterComponent: React.FC<React.PropsWithChildren<FieldsetFooterProps>> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<FieldsetFooterProps>) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  return (
    <footer className={useClasses('footer', className, SCALE_CLASSES)} {...props}>
      {children}
      <style jsx>{`
        .footer {
          background-color: var(--color-background-900);
          border-top: 1px solid var(--color-border-1000);
          border-bottom-left-radius: var(--layout-radius);
          border-bottom-right-radius: var(--layout-radius);
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          color: var(--color-background-300);
          padding: var(--layout-gap-half) var(--layout-gap);
          box-sizing: border-box;
        }

        ${RESPONSIVE.h(2.875, value => `height: ${value};`, undefined, 'footer')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'footer')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'footer')}
        ${RESPONSIVE.padding(
          {
            top: 0.625,
            right: 1.31,
            bottom: 0.625,
            left: 1.31,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'footer',
        )}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'footer')}
        ${SCALER('footer')}
      `}</style>
    </footer>
  );
};

FieldsetFooterComponent.displayName = 'HimalayaFieldsetFooter';
const FieldsetFooter = React.memo(withScale(FieldsetFooterComponent));
export default FieldsetFooter;
