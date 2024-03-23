'use client';

import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { SnippetTypes } from '../utils/prop-types';
import { UIThemesPalette } from '../themes/presets';
import useScale, { withScale } from '../use-scale';

export type TagTypes = SnippetTypes;
interface Props {
  type?: TagTypes;
  invert?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TagProps = Props & NativeAttrs;

export type TagColors = {
  color: string;
  bgColor: string;
  borderColor: string;
};

const getColors = (type: TagTypes, palette: UIThemesPalette, invert: boolean) => {
  const colors: {
    [key in TagTypes]: Pick<TagColors, 'color'> & Partial<TagColors>;
  } = {
    tertiary: {
      color: palette.tertiary.hex_1000,
    },
    primary: {
      color: palette.primary.hex_1000,
    },
    default: {
      color: palette.foreground.hex_1000,
    },
    success: {
      color: palette.success.hex_1000,
    },
    warning: {
      color: palette.warning.hex_1000,
    },
    error: {
      color: palette.error.hex_1000,
    },
    secondary: {
      color: palette.secondary.hex_1000,
    },
    dark: {
      color: palette.foreground.hex_1000,
      bgColor: palette.background.hex_1000,
    },
    lite: {
      color: palette.foreground.hex_1000,
      bgColor: palette.background.hex_700,
    },
  };
  const hideBorder = invert || type === 'lite';

  const cardStyle = {
    ...colors[type],
    bgColor: colors[type].bgColor || palette.background.hex_1000,
    borderColor: hideBorder ? 'transparent' : colors[type].color,
  };

  return !invert ? cardStyle : { ...cardStyle, color: cardStyle.bgColor, bgColor: cardStyle.color };
};

const TagComponent: React.FC<React.PropsWithChildren<TagProps>> = ({
  type = 'default' as TagTypes,
  children,
  className = '',
  invert = false,
  ...props
}: React.PropsWithChildren<TagProps>) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const { color, bgColor, borderColor } = useMemo(() => getColors(type, theme.palette, invert), [type, theme.palette, invert]);

  return (
    <span className={className} {...props}>
      {children}
      <style jsx>{`
        span {
          display: inline-block;
          border: 1px solid ${borderColor};
          background-color: ${bgColor};
          color: ${color};
          box-sizing: border-box;
          line-height: 1em;
          border-radius: ${SCALES.h(0.3125)};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.w(1, 'auto')};
          height: ${SCALES.h(1.75)};
          padding: ${SCALES.pt(0.375)} ${SCALES.pr(0.375)} ${SCALES.pb(0.375)} ${SCALES.pl(0.375)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </span>
  );
};

TagComponent.displayName = 'HimalayaTag';
const Tag = withScale(TagComponent);
export default Tag;
