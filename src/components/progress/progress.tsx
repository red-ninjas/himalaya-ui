'use client';
import React from 'react';
import useTheme from '../use-theme';
import { useProportions } from '../utils/calculations';
import { UIThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export type ProgressColors = {
  [key: number]: string;
};
export type ProgressTypes = NormalTypes;

interface Props {
  value?: number;
  max?: number;
  fixedTop?: boolean;
  fixedBottom?: boolean;
  colors?: ProgressColors;
  type?: ProgressTypes;
  className?: string;
  indeterminate?: boolean;
  radius?: number;
}

type NativeAttrs = Omit<React.ProgressHTMLAttributes<any>, keyof Props>;
export type ProgressProps = Props & NativeAttrs;

const getCurrentColor = (ratio: number, palette: UIThemesPalette, type: ProgressTypes, colors: ProgressColors = {}): string => {
  const defaultColors: { [key in ProgressTypes]: string } = {
    default: palette.foreground,
    success: palette.success.value,
    secondary: palette.secondary.value,
    primary: palette.primary.value,
    tertiary: palette.tertiary.value,
    warning: palette.warning.value,
    error: palette.error.value,
  };
  const colorKeys = Object.keys(colors);
  if (colorKeys.length === 0) return defaultColors[type];

  const customColorKey = colorKeys.find(key => ratio <= +key);
  if (!customColorKey || Number.isNaN(+customColorKey)) return defaultColors[type];
  return colors[+customColorKey];
};

const ProgressComponent: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  className = '',
  type = 'default' as ProgressTypes,
  colors,
  fixedTop = false,
  fixedBottom = false,
  indeterminate = false,
  radius,
  ...props
}: ProgressProps) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const percentValue = useProportions(value, max);
  const currentColor = getCurrentColor(percentValue, theme.palette, type, colors);
  const fixed = fixedTop || fixedBottom;
  const classes = useClasses('progress', { fixed }, className);

  return (
    <div className={classes}>
      <div
        className={useClasses('inner', {
          indeterminate: indeterminate,
        })}
        title={`${percentValue}%`}
      />
      <progress className={className} value={value} max={max} {...props} />
      <style jsx>{`
        progress {
          position: fixed;
          top: -1000px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .progress {
          position: relative;
          background-color: ${theme.palette.accents_2};
          border-radius: ${radius !== undefined ? radius : theme.style.radius};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(0.625)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .inner.indeterminate {
          background-color: ${currentColor};
          animation: indeterminate 1s infinite linear;
          transform-origin: 0% 50%;
          width: 100%;
        }

        .fixed {
          position: fixed;
          top: ${fixedTop ? 0 : 'unset'};
          bottom: ${fixedBottom ? 0 : 'unset'};
          left: 0;
          border-radius: 0;
        }

        @keyframes indeterminate {
          0% {
            transform: translateX(0) scaleX(0);
          }
          40% {
            transform: translateX(0) scaleX(0.4);
          }
          100% {
            transform: translateX(100%) scaleX(0.5);
          }
        }

        .fixed > .inner {
          border-radius: 0;
        }

        .inner {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          bottom: 0;
          transition: all 100ms ease-in;
          border-radius: ${radius !== undefined ? radius : theme.style.radius};
          background-color: ${currentColor};
          width: ${percentValue}%;
        }
      `}</style>
    </div>
  );
};

ProgressComponent.displayName = 'HimalayaProgress';
const Progress = withScale(ProgressComponent);
export default Progress;
