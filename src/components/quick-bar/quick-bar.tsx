'use client';

import React, { PropsWithChildren } from 'react';
import useScale from '../use-scale';
import withScale from '../use-scale/with-scale';
import useTheme from '../use-theme';
interface NativeQuickBarProps {
  header?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof NativeQuickBarProps>;
export type QuickBarProps = NativeQuickBarProps & NativeAttrs;

const QuickBarComponent: React.FC<PropsWithChildren<QuickBarProps>> = ({ children, ...props }) => {
  const theme = useTheme();
  const { SCALES } = useScale();

  return (
    <div className="quick-bar" {...props}>
      <div className="quick-bar-inner">{children}</div>
      <style jsx>{`
        .quick-bar-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          height: ${SCALES.height(1, 'auto')};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          padding: ${SCALES.pt(0.75)} ${SCALES.pr(0.75)} ${SCALES.pb(0.75)} ${SCALES.pl(0.75)};
        }

        .quick-bar {
          width: calc(var(--quickbar-width) - 1px);
          left: var(--quickbar-position);
          top: 0;
          height: 100%;
          position: fixed;
          background: ${theme.palette.background};
          border-right: 1px solid ${theme.palette.border};
          transition: all var(--quickbar-transition) ease;
          transform: translateX(var(--quickbar-position, 0));
        }
      `}</style>
    </div>
  );
};

QuickBarComponent.displayName = 'HimalayaQuickBar';
const QuickBar = withScale(QuickBarComponent);
export default QuickBar;
