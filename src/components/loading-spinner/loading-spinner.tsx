'use client';

import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { UIColorTypes } from '../themes/presets';

interface Props {
  type?: UIColorTypes;
  className?: string;
  spaceRatio?: number;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type LoadingSpinnerProps = Props & NativeAttrs;

const LoadingSpinnerComponent: React.FC<React.PropsWithChildren<LoadingSpinnerProps>> = ({
  children,
  type = 'default' as UIColorTypes,
  className = '',
  spaceRatio = 1,
  ...props
}: React.PropsWithChildren<LoadingSpinnerProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const classes = useClasses('loading-container', className, type ? 'color-' + type : null, CLASS_NAMES);

  return (
    <div className={classes} {...props}>
      <span className="loading">
        {children && <label>{children}</label>}
        <i />
        <i />
        <i />
      </span>
      <style jsx>{`
        .loading-container {
          display: inline-flex;
          align-items: center;
          position: relative;

          min-height: 1em;
          --spinner-color: var(--color-base);

          &.color-default {
            --spinner-color: var(--color-contrast);
          }
        }

        label {
          margin-right: 0.5em;
          color: var(--color-background-400);
          line-height: 1;
        }

        label :global(*) {
          margin: 0;
        }

        .loading {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          user-select: none;
        }

        i {
          width: 0.25em;
          height: 0.25em;
          border-radius: 50%;
          background-color: var(--spinner-color);
          margin: 0 calc(0.25em / 2 * ${spaceRatio});
          display: inline-block;
          animation: loading-blink 1.4s infinite both;
        }

        i:nth-child(2) {
          animation-delay: 0.2s;
        }

        i:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes loading-blink {
          0% {
            opacity: 0.2;
          }

          20% {
            opacity: 1;
          }

          100% {
            opacity: 0.2;
          }
        }

        ${SCALE.h(1, value => `height: ${value};`, '100%', 'loading-container')}
        ${SCALE.w(1, value => `width: ${value}};`, `100%`, 'loading-container')}
        ${SCALE.font(1, value => `width: ${value}};`, undefined, 'loading-container')}

        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'loading-container')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'loading-container')}

        ${UNIT('loading-container')}
      `}</style>
    </div>
  );
};

LoadingSpinnerComponent.displayName = 'HimalayaLoadingSpinner';
const LoadingSpinner = withScale(LoadingSpinnerComponent);
export default LoadingSpinner;
