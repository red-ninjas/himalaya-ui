'use client';

import React, { useMemo } from 'react';
import { UIThemesPalette } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { NormalTypes } from '../utils/prop-types';

export type BadgeTypes = NormalTypes;

interface Props {
  type?: BadgeTypes;
  dot?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type BadgeProps = Props & NativeAttrs;

const getBgColor = (type: NormalTypes, palette: UIThemesPalette) => {
  const colors: { [key in NormalTypes]: string } = {
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
  const theme = useTheme();
  const { SCALES } = useScale();
  const bg = useMemo(() => getBgColor(type, theme.palette), [type, theme.palette]);
  const color = useMemo(() => {
    if (!type || type === 'default') return theme.palette.background.hex_1000;
    return 'white';
  }, [type, theme.palette.background.hex_1000]);
  const classes = useClasses('badge', { dot }, className);

  return (
    <span className={classes} {...props}>
      {!dot && children}
      <style jsx>{`
        .badge {
          display: inline-block;
          border-radius: 16px;
          font-variant: tabular-nums;
          line-height: 1;
          vertical-align: middle;
          background-color: ${bg};
          color: ${color};
          border: 0;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.w(1, 'auto')};
          height: ${SCALES.h(1, 'auto')};
          padding: ${SCALES.pt(0.25)} ${SCALES.pr(0.4375)} ${SCALES.pb(0.25)} ${SCALES.pl(0.4375)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .dot {
          padding: ${SCALES.py(0.25)} ${SCALES.px(0.25)};
          border-radius: 50%;
          user-select: none;
        }
      `}</style>
    </span>
  );
};

BadgeComponent.displayName = 'HimalayaBadge';
const Badge = withScale(BadgeComponent);
export default Badge;
