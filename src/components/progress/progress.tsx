'use client';
import React, { useMemo } from 'react';
import { useProportions } from '../utils/calculations';
import { COLOR_TYPES } from '../utils/prop-types';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export type ProgressColors = {
  [key: number]: string;
};
export type ProgressTypes = COLOR_TYPES;

interface Props {
  value?: number;
  max?: number;
  fixedTop?: boolean;
  fixedBottom?: boolean;
  type?: ProgressTypes;
  className?: string;
  indeterminate?: boolean;
  colors?: ProgressColors;
}

type NativeAttrs = Omit<React.ProgressHTMLAttributes<HTMLProgressElement>, keyof Props>;
export type ProgressProps = Props & NativeAttrs;

const ProgressComponent: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  className = '',
  type = 'default' as COLOR_TYPES,
  fixedTop = false,
  fixedBottom = false,
  indeterminate = false,
  colors,
  ...props
}: ProgressProps) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();
  const percentValue = useProportions(value, max);
  const fixed = fixedTop || fixedBottom;
  const classes = useClasses('progress', { fixed }, className, type ? 'color-' + type : null, SCALE_CLASSES);

  const progressColor = useMemo(() => {
    if (!colors) return 'var( --progress-background)';
    const sortedKeys = Object.keys(colors)
      .map(Number)
      .sort((a, b) => a - b);
    let color = colors[sortedKeys[0]] || 'var(--color-background-500)';
    for (let i = 0; i < sortedKeys.length; i++) {
      if (value >= sortedKeys[i]) {
        color = colors[sortedKeys[i]];
      } else {
        break;
      }
    }
    return color;
  }, [value, colors]);

  return (
    <div className={classes}>
      <div
        className={useClasses('inner', {
          indeterminate: indeterminate,
        })}
        title={`${percentValue}%`}
        style={{ backgroundColor: progressColor }}
      />
      <progress className={className} value={value} max={max} {...props} />
      <style jsx>{`
        .progress {
          position: relative;
          background-color: var(--color-background-900);
        }

        progress {
          position: fixed;
          top: -1000px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .inner.indeterminate {
          background-color: var(--color-background-500);
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
          border-radius: var(--layout-radius);
          --progress-background: var(--color-base);
          background-color: var(--progress-background);
          width: ${percentValue}%;
        }

        .progress.color-default .inner {
          --progress-background: var(--color-contrast);
        }
        ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'progress')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'progress')}
        ${RESPONSIVE.h(0.625, value => `height: ${value};`, undefined, 'progress')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'progress')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'progress')}
        ${SCALER('progress')}
      `}</style>
    </div>
  );
};

ProgressComponent.displayName = 'HimalayaProgress';
const Progress = withScale(ProgressComponent);
export default Progress;
