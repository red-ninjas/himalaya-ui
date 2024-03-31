'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

type iProps = {
  command?: boolean;
  shift?: boolean;
  option?: boolean;
  ctrl?: boolean;
  className?: string;
};

type NativeAttrs = Omit<React.KeygenHTMLAttributes<HTMLDivElement>, keyof iProps>;
export type KeyboardProps = iProps & NativeAttrs;

const KeyboardComponent: React.FC<React.PropsWithChildren<KeyboardProps>> = ({
  command = false,
  shift = false,
  option = false,
  ctrl = false,
  children,
  className,
  ...props
}: React.PropsWithChildren<KeyboardProps>) => {
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();

  return (
    <kbd className={useClasses('kbd', className, SCALE_CLASSES)} {...props}>
      {command && <span>⌘</span>}
      {shift && <span>⇧</span>}
      {option && <span>⌥</span>}
      {ctrl && <span>⌃</span>}
      {children && <span>{children}</span>}

      <style jsx>{`
        .kbd {
          line-height: 2em;
          text-align: center;
          display: inline-block;
          color: var(--color-background-400);
          background-color: var(--color-background-800);
          font-family: var(--theme-font-sans);
          border: 1px solid var(--color-background-700);
          min-width: 2em;
          min-height: 2em;
        }

        span {
          line-height: 2em;
          font-size: 1em;
          text-align: center;
        }

        span + span {
          margin-left: 0.3em;
        }

        ${RESPONSIVE.padding(
          {
            top: 0,
            right: 0.34,
            left: 0.34,
            bottom: 0,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'kbd',
        )}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'kbd')}
        ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'kbd')}

        ${RESPONSIVE.w(1, value => `width: ${value};`, 'fit-content', 'kbd')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'kbd')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'kbd')}
        ${SCALER('kbd')}
      `}</style>
    </kbd>
  );
};

KeyboardComponent.displayName = 'HimalayaKeyboard';
const Keyboard = withScale(KeyboardComponent);
export default Keyboard;
