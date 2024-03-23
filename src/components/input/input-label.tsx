'use client';
import React from 'react';
import useTheme from '../use-theme';
import useLayout from '../use-layout';

export interface InputLabel {
  isRight?: boolean;
}

const InputLabel: React.FC<React.PropsWithChildren<InputLabel>> = ({ children, isRight }) => {
  const theme = useTheme();
  const layout = useLayout();

  return (
    <span className={isRight ? 'right' : ''}>
      {children}
      <style jsx>{`
        span {
          display: inline-flex;
          width: initial;
          height: 100%;
          align-items: center;
          pointer-events: none;
          margin: 0;
          padding: 0 ${layout.gapHalf};
          color: var(--theme-color-background-500);
          background-color: var(--theme-color-background-800);
          border-top-left-radius: ${theme.style.radius};
          border-bottom-left-radius: ${theme.style.radius};
          border-top: 1px solid var(--theme-color-border-1000);
          border-left: 1px solid var(--theme-color-border-1000);
          border-bottom: 1px solid var(--theme-color-border-1000);
          font-size: inherit;
          line-height: 1;
        }

        span.right {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: ${theme.style.radius};
          border-bottom-right-radius: ${theme.style.radius};
          border-left: 0;
          border-right: 1px solid var(--theme-color-border-1000);
        }
      `}</style>
    </span>
  );
};

const MemoInputLabel = React.memo(InputLabel);

export default MemoInputLabel;
