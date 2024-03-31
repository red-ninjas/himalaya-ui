'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type BreadcrumbsSeparatorProps = Props & NativeAttrs;

const Separator: React.FC<React.PropsWithChildren<BreadcrumbsSeparatorProps>> = ({ children, className = '' }: BreadcrumbsSeparatorProps) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const classes = useClasses('separator', className, CLASS_NAMES);

  return (
    <div className={classes}>
      {children}
      <style jsx>{`
        .separator {
          display: inline-flex;
          user-select: none;
          pointer-events: none;
          align-items: center;
        }

        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'separator')}
        ${SCALE.margin(
          {
            top: 0,
            right: 0.5,
            left: 0.5,
            bottom: 0,
          },
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'separator',
        )}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'separator')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'separator')}
        ${UNIT('separator')}
      `}</style>
    </div>
  );
};

Separator.displayName = 'HimalayaBreadcrumbsSeparator';
const BreadcrumbsSeparator = withScale(Separator);
export default BreadcrumbsSeparator;
