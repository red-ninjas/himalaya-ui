'use client';

import React, { useMemo } from 'react';
import { GradientPositions, GradientPositionsEnum, UIThemesPalette } from '../themes/presets';
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
}

const getTypeColor = (type: NormalTypes, palette: UIThemesPalette) => {
  const colors: { [key in NormalTypes]: string } = {
    default: 'inherit',
    secondary: palette.secondary.value,
    success: palette.success.value,
    warning: palette.warning.value,
    error: palette.error.value,
    primary: palette.primary.value,
    tertiary: palette.tertiary.value,
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
  const { SCALES, getScaleProps } = useScale();
  const font = getScaleProps('font');
  const mx = getScaleProps(['margin', 'marginLeft', 'marginRight', 'mx', 'ml', 'mr']);
  const my = getScaleProps(['margin', 'marginTop', 'marginBottom', 'my', 'mt', 'mb']);
  const px = getScaleProps(['padding', 'paddingLeft', 'paddingRight', 'pl', 'pr', 'px']);
  const py = getScaleProps(['padding', 'paddingTop', 'paddingBottom', 'pt', 'pb', 'py']);

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
      { value: stroke, className: 'stroke' },
    ];
    const scaleClassNames = keys.reduce((pre, next) => {
      if (typeof next.value === 'undefined') return pre;
      return `${pre} ${next.className}`;
    }, '');
    return `${scaleClassNames} ${className}`.trim();
  }, [mx, my, px, py, font, className, stroke]);

  return (
    <Component className={classNames} {...props}>
      {children}
      <style jsx>{`
        .stroke {
          color: transparent;
          -webkit-text-stroke: ${Number(stroke) ? stroke + 'px' : stroke} ${theme.palette.foreground};
        }
        ${tag} {
          ${defaultColor}
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
        }
        .font {
          font-size: ${SCALES.font(1, 'inherit')};
        }
        .mx {
          margin-left: ${SCALES.ml(0, 'revert')};
          margin-right: ${SCALES.mr(0, 'revert')};
        }
        .my {
          margin-top: ${SCALES.mt(0, 'revert')};
          margin-bottom: ${SCALES.mb(0, 'revert')};
        }
        .px {
          padding-left: ${SCALES.pl(0, 'revert')};
          padding-right: ${SCALES.pr(0, 'revert')};
        }
        .py {
          padding-top: ${SCALES.pt(0, 'revert')};
          padding-bottom: ${SCALES.pb(0, 'revert')};
        }
      `}</style>
    </Component>
  );
};

TextChild.displayName = 'HimalayaTextChild';
export default TextChild;
