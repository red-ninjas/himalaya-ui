'use client';
import React, { useMemo } from 'react';
import { COLOR_TYPES, DividerAlign } from '../utils/prop-types';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export type DividerTypes = COLOR_TYPES;

interface Props {
  type?: DividerTypes;
  align?: DividerAlign;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type DividerProps = Props & NativeAttrs;

const DividerComponent: React.FC<React.PropsWithChildren<DividerProps>> = ({
  type = 'default' as DividerTypes,
  align = 'center' as DividerAlign,
  children,
  className,
  ...props
}: React.PropsWithChildren<DividerProps>) => {
  const { RESPONSIVE, SCALER } = useScale();
  const classes = useClasses('divider', className, type ? 'color-' + type : null);

  const alignClassName = useMemo(() => {
    if (!align || align === 'center') return '';
    if (align === 'left' || align === 'start') return 'start';
    return 'end';
  }, [align]);

  const alignClasses = useClasses('text', alignClassName);
  const textColor = type === 'default' ? 'var(--color-contrast)' : 'var(--color-base)';

  return (
    <div role="separator" className={classes} {...props}>
      {children && <span className={alignClasses}>{children}</span>}
      <style jsx>{`
        .divider {
          max-width: 100%;
          --divider-bg: var(--color-base);
          background-color: var(--divider-bg);
          position: relative;
        }

        .divider.color-default {
          --divider-bg: var(--color-background-800);
        }

        .text {
          position: absolute;
          left: 50%;
          top: 50%;
          min-height: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transform: translate(-50%, -50%);
          padding: 0 0.75em;
          font-size: inherit;
          font-weight: bold;
          text-transform: capitalize;
          background-color: var(--color-background-1000);
          color: ${textColor};
          z-index: 10;
        }

        .text.start {
          transform: translateY(-50%);
          left: 7%;
        }

        .text.end {
          transform: translateY(-50%);
          left: auto;
          right: 7%;
        }

        ${RESPONSIVE.font(1, value => `font-size: ${value};`, undefined, 'divider')}
        ${RESPONSIVE.w(1.75, value => `width: ${value};`, 'auto', 'divider')}
        ${RESPONSIVE.h(0.0625, value => `height: ${value};`, undefined, 'divider')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'divider')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'divider')}
        ${SCALER('divider')}
      `}</style>
    </div>
  );
};

DividerComponent.displayName = 'HimalayaDivider';
const Divider = React.memo(withScale(DividerComponent));
export default Divider;
