'use client';
import React from 'react';
import useTheme from '../use-theme';
import useScale, { withScale } from '../use-scale';

type iProps = {
  command?: boolean;
  shift?: boolean;
  option?: boolean;
  ctrl?: boolean;
  className?: string;
};

type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof iProps>;
export type KeyboardProps = iProps & NativeAttrs;

const KeyboardComponent: React.FC<React.PropsWithChildren<KeyboardProps>> = ({
  command = false,
  shift = false,
  option = false,
  ctrl = false,
  children,
  className = '',
  ...props
}: React.PropsWithChildren<KeyboardProps>) => {
  const theme = useTheme();
  const { SCALES } = useScale();

  return (
    <kbd className={className} {...props}>
      {command && <span>⌘</span>}
      {shift && <span>⇧</span>}
      {option && <span>⌥</span>}
      {ctrl && <span>⌃</span>}
      {children && <span>{children}</span>}

      <style jsx>{`
        kbd {
          line-height: 2em;
          text-align: center;
          display: inline-block;
          color: ${theme.palette.accents_5};
          background-color: ${theme.palette.accents_1};
          font-family: ${theme.font.sans};
          border-radius: ${theme.style.radius};
          border: 1px solid ${theme.palette.accents_2};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'fit-content')};
          height: ${SCALES.height(1, 'auto')};
          min-width: 2em;
          min-height: 2em;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0.34)} ${SCALES.pb(0)} ${SCALES.pl(0.34)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        span {
          line-height: 2em;
          font-size: 1em;
          text-align: center;
        }

        span + span {
          margin-left: 0.3em;
        }
      `}</style>
    </kbd>
  );
};

KeyboardComponent.displayName = 'HimalayaKeyboard';
const Keyboard = withScale(KeyboardComponent);
export default Keyboard;
