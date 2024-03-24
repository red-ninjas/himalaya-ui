'use client';

import { COLOR_TYPES } from 'components/utils/prop-types';
import React from 'react';
import { UIThemesPalette } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

export type BadgeTypes = COLOR_TYPES;

interface Props {
  type?: BadgeTypes;
  dot?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type BadgeProps = Props & NativeAttrs;

const getBgColor = (type: COLOR_TYPES, palette: UIThemesPalette) => {
  const colors: { [key in COLOR_TYPES]: string } = {
    default: palette.foreground.hex_1000,
    success: palette.success.hex_1000,
    secondary: palette.secondary.hex_1000,
    primary: palette.primary.hex_1000,
    tertiary: palette.tertiary.hex_1000,
    warning: palette.warning.hex_1000,
    error: palette.error.hex_1000,
  };
  return colors[type];
};

const BadgeComponent: React.FC<React.PropsWithChildren<BadgeProps>> = ({
  type = 'default' as BadgeTypes,
  className = '',
  children,
  dot = false,
  ...props
}: BadgeProps) => {
  const { RESPONSIVE } = useScale();
  const classes = useClasses('badge', { dot }, className, type ? 'color-' + type : null);

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

        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'badge')}
        ${RESPONSIVE.h(1, value => `width: ${value};`, 'auto', 'badge')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'badge')}
        ${RESPONSIVE.lineHeight(1, value => `line-height: ${value};`, undefined, 'badge')}

        ${RESPONSIVE.padding(
          { left: 0.4375, right: 0.4375, top: 0.25, bottom: 0.25 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'badge',
        )}

        ${RESPONSIVE.padding(
          { left: 0.25, right: 0.25, top: 0.25, bottom: 0.25 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'dot',
        )}

        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'badge')}
      `}</style>
    </span>
  );
};

BadgeComponent.displayName = 'HimalayaBadge';
const Badge = withScale(BadgeComponent);
export default Badge;
