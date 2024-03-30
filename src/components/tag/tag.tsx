'use client';

import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { SnippetTypes } from '../utils/prop-types';
import { UIThemesPalette } from '../themes/presets';
import useScale, { withScale } from '../use-scale';
import { useClasses } from 'components';

export type TagTypes = SnippetTypes;
interface Props {
  type?: TagTypes;
  invert?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof Props>;
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
  className,
  invert = false,
  ...props
}: React.PropsWithChildren<TagProps>) => {
  const theme = useTheme();
  const { RESPONSIVE, SCALE_CLASSES, SCALER } = useScale();
  const { color, bgColor, borderColor } = useMemo(() => getColors(type, theme.palette, invert), [type, theme.palette, invert]);

  return (
    <span className={useClasses('tag', className, SCALE_CLASSES)} {...props}>
      {children}
      <style jsx>{`
        .tag {
          display: inline-block;
          border: 1px solid ${borderColor};
          background-color: ${bgColor};
          color: ${color};
          box-sizing: border-box;
          line-height: 1em;
        }

        ${RESPONSIVE.h(1.75, value => `height: ${value};`, undefined, 'tag')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'tag')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'tag')}
        ${RESPONSIVE.r(0.3125, value => `border-radius: ${value};`, 'var(--layout-radius)', `tag`)}

        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tag')}
        ${RESPONSIVE.padding(0.375, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tag')}
        ${SCALER('tag')}
      `}</style>
    </span>
  );
};

TagComponent.displayName = 'HimalayaTag';
const Tag = withScale(TagComponent);
export default Tag;
