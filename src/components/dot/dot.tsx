'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { UIColorTypes } from '../themes/presets';

interface Props {
  type?: UIColorTypes;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type DotProps = Props & NativeAttrs;

const DotComponent: React.FC<React.PropsWithChildren<DotProps>> = ({
  type = 'default' as UIColorTypes,
  children,
  className = '',
  ...props
}: React.PropsWithChildren<DotProps>) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();
  const classes = useClasses('dot', className, SCALE_CLASSES, type ? 'color-' + type : null);

  return (
    <span className={classes} {...props}>
      <span className="icon" />
      <span className="label">{children}</span>
      <style jsx>{`
        .dot {
          display: inline-flex;
          align-items: center;

          --dot-background: var(--color-base);
          &.color-default {
            --dot-background: var(--color-contrast);
          }
        }
        .icon {
          width: 0.625em;
          height: 0.625em;
          min-width: calc(0.625 * 12px);
          min-height: calc(0.625 * 12px);
          line-height: 0.625em;
          border-radius: 50%;
          background-color: var(--dot-background);

          user-select: none;
        }

        .label {
          margin-left: 0.5em;
          font-size: 1em;
          line-height: 1em;
          text-transform: capitalize;
        }

        ${RESPONSIVE.font(1, value => `width: ${value}; height: ${value};`, undefined, 'dot')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'dot')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'dot')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'dot')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'dot')}
        ${SCALER('dot')}
      `}</style>
    </span>
  );
};

DotComponent.displayName = 'HimalayaDot';
const Dot = withScale(DotComponent);
export default Dot;
