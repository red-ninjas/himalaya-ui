'use client';
import React, { useMemo } from 'react';
import { DividerAlign } from '../utils/prop-types';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
import { UIColorTypes } from '../themes/presets';

interface Props {
  type?: UIColorTypes;
  align?: DividerAlign;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type DividerProps = Props & NativeAttrs;

const DividerComponent: React.FC<React.PropsWithChildren<DividerProps>> = ({
  type = 'default' as UIColorTypes,
  align = 'center' as DividerAlign,
  children,
  className,
  ...props
}: React.PropsWithChildren<DividerProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const classes = useClasses('divider', className, type ? 'color-' + type : null, CLASS_NAMES);

  const alignClassName = useMemo(() => {
    if (!align || align === 'center') return '';
    if (align === 'left' || align === 'start') return 'start';
    return 'end';
  }, [align]);

  const alignClasses = useClasses('text', alignClassName);

  return (
    <div role="separator" className={classes} {...props}>
      {children && <span className={alignClasses}>{children}</span>}
      <style jsx>{`
        .divider {
          max-width: 100%;
          --divider-bg: var(--color-base);
          --divider-color: var(--color-base);
          background-color: var(--divider-bg);
          position: relative;
        }

        .divider.color-default {
          --divider-bg: var(--color-border-1000);
          --divider-color: var(--color-foreground-1000);
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
          color: var(--divider-color);
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

        ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'divider')}
        ${SCALE.w(1.75, value => `width: ${value};`, 'auto', 'divider')}
        ${SCALE.h(0.0625, value => `height: ${value};`, undefined, 'divider')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'divider')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'divider')}
        ${UNIT('divider')}
      `}</style>
    </div>
  );
};

DividerComponent.displayName = 'HimalayaDivider';
const Divider = React.memo(withScale(DividerComponent));
export default Divider;
