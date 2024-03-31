'use client';
import React from 'react';
import { UIColorTypes } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { ScaleResponsiveParameter, customResponsiveAttribute, withScale } from '../use-scale';
import { useProportions } from '../utils/calculations';
import useLayout from '../use-layout';
import { isCSSNumberValue } from '../utils/collections';

export type GaugeColors = {
  [key: number]: string;
};

interface Props {
  value?: number;
  max?: number;
  colors?: GaugeColors;
  type?: UIColorTypes;
  showValue?: boolean;
  size?: ScaleResponsiveParameter<number>;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type GaugeProps = Props & NativeAttrs;

const GaugeComponent: React.FC<GaugeProps> = ({
  value = 0,
  max = 100,
  className = '',
  type = 'default' as UIColorTypes,
  colors,
  showValue = false,
  size = 3.1,
  ...props
}: GaugeProps) => {
  const { SCALE_CLASSES, SCALER } = useScale();

  const percentValue = useProportions(value, max);
  const classes = useClasses('gauge', className, SCALE_CLASSES, type ? 'color-' + type : null);
  const layout = useLayout();
  const radius = 24 / 2;
  const strokeWidth = radius / 7;
  const circumference = 2 * Math.PI * (radius - strokeWidth / 2);
  const dashArray = circumference;
  const dashOffset = (1 - value / 100) * dashArray;

  const getCurrentColor = (ratio: number, defaultColor: string, colors?: GaugeColors): string => {
    if (!colors) {
      return defaultColor;
    }

    const colorKeys = Object.keys(colors);
    if (colorKeys.length === 0) return defaultColor;

    const customColorKey = colorKeys.find(key => ratio <= +key);
    if (!customColorKey || Number.isNaN(+customColorKey)) return defaultColor;
    return colors[+customColorKey];
  };

  const currentColor = getCurrentColor(percentValue, 'var(--fill-color)', colors);

  return (
    <div className={classes} {...props}>
      <svg viewBox={`0 0 24 24`}>
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke={`var(--color-background-900)`}
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
          --fill-color: var(--color-base);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;

          font-size: calc(var(--gauge-size) / 4);
          font-weight: 500;

          * {
            transition: all 1s ease;
          }

          svg {
            width: var(--gauge-size);
            height: var(--gauge-size);
          }

          .gauge-content {
            animation: gauge-fadein 1s ease forwards;
            animation-delay: 0s;
            display: flex;
            opacity: 0;
            position: absolute;
          }
        }

        .gauge.color-default {
          --fill-color: var(--color-foreground-1000);
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

        ${customResponsiveAttribute(size, 'gauge', layout.breakpoints, value =>
          !isCSSNumberValue(value) ? `--gauge-size: ${value};` : `--gauge-size: calc(var(--scale-unit-scale) * ${value});`,
        )}
        ${SCALER('gauge')}
      `}</style>
    </div>
  );
};

GaugeComponent.displayName = 'HimalayGauge';
const Gauge = withScale(GaugeComponent);
export default Gauge;
