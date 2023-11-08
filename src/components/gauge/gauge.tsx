'use client';
import React from 'react';
import { UIThemesPalette } from '../themes/presets';
import useClasses from '../use-classes';
import useTheme from '../use-theme';
import { useProportions } from '../utils/calculations';
import { NormalTypes } from '../utils/prop-types';

export type GaugeColors = {
  [key: number]: string;
};
export type GaugeTypes = NormalTypes;

interface Props {
  value?: number;
  max?: number;
  colors?: GaugeColors;
  type?: GaugeTypes;
  showValue?: boolean;
  size?: number;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type GaugeProps = Props & NativeAttrs;

const getCurrentColor = (ratio: number, palette: UIThemesPalette, type: GaugeTypes, colors: GaugeColors = {}): string => {
  const defaultColors: { [key in GaugeTypes]: string } = {
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

const GaugeComponent: React.FC<GaugeProps> = ({
  value = 0,
  max = 100,
  className = '',
  type = 'default' as GaugeTypes,
  colors,
  showValue = false,
  size = 50,
  ...props
}: GaugeProps) => {
  const theme = useTheme();
  const percentValue = useProportions(value, max);
  const currentColor = getCurrentColor(percentValue, theme.palette, type, colors);
  const classes = useClasses('gauge', className);

  const radius = size / 2;
  // const textSizes = size === 'tiny' ? SCALES.font(1) : size === 'small' ? SCALES.font(1.5) : size === 'medium' ? SCALES.font(2) : SCALES.font(2.5);
  const strokeWidth = radius / 7;
  const circumference = 2 * Math.PI * (radius - strokeWidth / 2);
  const dashArray = circumference;
  const dashOffset = (1 - value / 100) * dashArray;

  return (
    <div className={classes} {...props}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke={theme.palette.accents_1}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
        />
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke={currentColor}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {showValue && <div className="gauge-content">{percentValue}</div>}
      <style jsx>{`
        svg {
          shape-rendering: crispEdges;

          > circle {
            shape-rendering: geometricprecision;
          }
        }
        .gauge {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;

          font-size: ${size / 4}px;
          font-weight: 500;

          * {
            transition: all 1s ease;
          }

          .gauge-content {
            animation: gauge-fadein 1s ease forwards;
            animation-delay: 0s;
            display: flex;
            opacity: 0;
            position: absolute;
          }
        }

        @keyframes gauge-fadein {
          to {
            opacity: 1;
          }
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
      `}</style>
    </div>
  );
};

GaugeComponent.displayName = 'HimalayGauge';
const Gauge = GaugeComponent;
export default Gauge;
