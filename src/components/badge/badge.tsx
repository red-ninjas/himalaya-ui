'use client';

import { UIColorTypes } from '../themes/presets';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  type?: UIColorTypes;
  dot?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof Props>;
export type BadgeProps = Props & NativeAttrs;

const BadgeComponent: React.FC<React.PropsWithChildren<BadgeProps>> = ({
  type = 'default' as UIColorTypes,
  className = '',
  children,
  dot = false,
  ...props
}: BadgeProps) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const classes = useClasses('badge', { dot }, className, type ? 'color-' + type : null, CLASS_NAMES);

  return (
    <span className={classes} {...props}>
      {!dot && children}
      <style jsx>{`
        .badge {
          display: inline-block;
          border-radius: 16px;
          font-variant: tabular-nums;
          vertical-align: middle;

          --badge-background: var(--color-base);
          --badge-color: var(--color-contrast);
          background-color: var(--badge-background);
          color: var(--badge-color);
          border: 0;
        }

        .badge.color-default {
          --badge-background: var(--color-contrast);
          --badge-color: var(--color-base);
        }

        .dot {
          border-radius: 50%;
          user-select: none;
        }

        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'badge')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'badge')}
        ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'badge')}
        ${SCALE.lineHeight(1, value => `line-height: ${value};`, undefined, 'badge')}

        ${SCALE.padding(
          { left: 0.4375, right: 0.4375, top: 0.25, bottom: 0.25 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'badge',
        )}

        ${SCALE.padding(
          { left: 0.25, right: 0.25, top: 0.25, bottom: 0.25 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'dot',
        )}

        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'badge')}

        ${UNIT('badge')}
      `}</style>
    </span>
  );
};

BadgeComponent.displayName = 'HimalayaBadge';
const Badge = withScale(BadgeComponent);
export default Badge;
