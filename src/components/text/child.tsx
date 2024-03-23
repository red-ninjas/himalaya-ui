'use client';

import React, { useMemo } from 'react';
import { GradientPositions, GradientPositionsEnum, UIThemesPalette } from '../themes/presets';
import useClasses from '../use-classes';
import useScale from '../use-scale';
import useTheme from '../use-theme';
import { NormalTypes } from '../utils/prop-types';
import { TextColor } from './shared';

export interface Props {
  tag: keyof React.JSX.IntrinsicElements;
  type?: NormalTypes;
  stroke?: number | string;
  className?: string;
  color?: TextColor;
  gradientDegress?: GradientPositions;
  xs?: number;
  lineHeight?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const getTypeColor = (type: NormalTypes, palette: UIThemesPalette) => {
  const colors: { [key in NormalTypes]: string } = {
    default: 'inherit',
    secondary: palette.secondary.hex_1000,
    success: palette.success.hex_1000,
    warning: palette.warning.hex_1000,
    error: palette.error.hex_1000,
    primary: palette.primary.hex_1000,
    tertiary: palette.tertiary.hex_1000,
  };

  return colors[type] || colors.default;
};

type NativeAttrs = Omit<React.DetailsHTMLAttributes<any>, keyof Props>;
export type TextChildProps = Props & NativeAttrs;

const TextChild: React.FC<React.PropsWithChildren<TextChildProps>> = ({
  children,
  tag,
  className = '',
  stroke,
  color,
  gradientDegress = GradientPositionsEnum.right,
  type = 'default' as NormalTypes,
  ...props
}: React.PropsWithChildren<TextChildProps>) => {
  const Component = tag;
  const theme = useTheme();

  const { getScaleProps, RESPONSIVE } = useScale();
  const font = getScaleProps('font');
  const lineHeight = getScaleProps('lineHeight');

  const mx = getScaleProps(['m', 'ml', 'mr', 'mx', 'ml', 'mr']);
  const my = getScaleProps(['m', 'mt', 'mb', 'my', 'mt', 'mb']);
  const px = getScaleProps(['p', 'pl', 'pr', 'pl', 'pr', 'px']);
  const py = getScaleProps(['p', 'pt', 'pb', 'pt', 'pb', 'py']);

  const defaultColor = useMemo(() => {
    if (color && typeof color === 'string') {
      return `color: ` + color + ';';
    } else if (color && color['from'] !== undefined && color['to'] !== undefined) {
      const gradientDirection = typeof gradientDegress === 'number' ? gradientDegress + 'deg' : 'to ' + gradientDegress;

      return `background: linear-gradient(
        ${gradientDirection},
        ${color['from']},
        ${color['to']}
      );
      background-size: 100%;
      background-repeat: repeat;
      background-clip: text;
      text-fill-color: transparent;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;`;
    }

    return `color: ` + getTypeColor(type, theme.palette) + ';';
  }, [type, theme.palette, color, gradientDegress]);
  const classNames = useMemo<string>(() => {
    const keys = [
      { value: mx, className: 'mx' },
      { value: my, className: 'my' },
      { value: px, className: 'px' },
      { value: py, className: 'py' },
      { value: font, className: 'font' },
      { value: lineHeight, className: 'lineHeight' },
      { value: stroke, className: 'stroke' },
    ];
    const scaleClassNames = keys.reduce((pre, next) => {
      if (typeof next.value === 'undefined') return pre;
      return `${pre} ${next.className}`;
    }, '');
    return `${scaleClassNames} ${className}`.trim();
  }, [mx, my, px, py, font, className, stroke, lineHeight]);

  return (
    <Component className={useClasses(classNames, 'width height')} {...props}>
      {children}
      <style jsx>{`
        .stroke {
          color: transparent;
          -webkit-text-stroke: ${Number(stroke) ? stroke + 'px' : stroke} ${defaultColor !== 'inherit' ? theme.palette.foreground.hex_1000 : defaultColor};
        }

        ${tag} {
          ${defaultColor}
        }

        ${RESPONSIVE.ml(0, value => `margin-left: ${value};`, 'revert', 'mx')}
        ${RESPONSIVE.mr(0, value => `margin-right: ${value};`, 'revert', 'mx')}

        ${RESPONSIVE.mt(0, value => `margin-top: ${value};`, 'revert', 'my')}
        ${RESPONSIVE.mb(0, value => `margin-bottom: ${value};`, 'revert', 'my')}

        ${RESPONSIVE.pl(0, value => `padding-left: ${value};`, 'revert', 'px')}
        ${RESPONSIVE.pr(0, value => `padding-right: ${value};`, 'revert', 'px')}

        ${RESPONSIVE.pt(0, value => `padding-top: ${value};`, 'revert', 'py')}
        ${RESPONSIVE.pb(0, value => `padding-bottom: ${value};`, 'revert', 'py')}

        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto')}

        ${RESPONSIVE.font(1, value => `font-size: ${value}; --font-size: ${value};`, 'inherit')}
        ${RESPONSIVE.lineHeight(1, value => `line-height: ${value};`, 'inherit')}
      `}</style>
    </Component>
  );
};

TextChild.displayName = 'HimalayaTextChild';
export default TextChild;
