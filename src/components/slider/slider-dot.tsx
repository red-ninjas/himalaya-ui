'use client';
import React from 'react';
import useTheme from '../use-theme';
import useClasses from '../use-classes';

interface Props {
  left: number;
  disabled?: boolean;
  isClick?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type SliderDotProps = Props & NativeAttrs;

const SliderDot = React.forwardRef<HTMLDivElement, React.PropsWithChildren<SliderDotProps>>(
  ({ children, disabled = false, left = 0, isClick = false }: React.PropsWithChildren<SliderDotProps>, ref: React.Ref<HTMLDivElement>) => {
    const theme = useTheme();
    const classes = useClasses('dot', { disabled, click: isClick });

    return (
      <div className={classes} ref={ref}>
        {children}
        <style jsx>{`
          .dot {
            position: absolute;
            left: ${left}%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: calc(var(--slider-font-size) * 1.25);
            min-width: calc(var(--slider-font-size) * 1.25);
            line-height: calc(var(--slider-font-size) * 1.25);
            border-radius: calc(var(--slider-font-size) * 0.625);
            user-select: none;
            font-weight: 700;
            font-size: calc(var(--slider-font-size) * 0.75);
            z-index: 100;
            background-color: ${theme.palette.primary.value};
            color: ${theme.palette.background};
            text-align: center;
            padding: 0 calc(0.57 * var(--slider-font-size));
          }

          .dot.disabled {
            cursor: not-allowed !important;
            background-color: ${theme.palette.accents_2};
            color: ${theme.palette.accents_4};
          }

          .dot.click {
            transition: all 200ms ease;
          }

          .dot:hover {
            cursor: grab;
          }

          .dot:active {
            cursor: grabbing;
          }
        `}</style>
      </div>
    );
  },
);

SliderDot.displayName = 'HimalayaSliderDot';
export default SliderDot;
