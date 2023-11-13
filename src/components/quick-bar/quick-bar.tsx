'use client';

import React, { PropsWithChildren } from 'react';
import { QuickBarProps } from './share';
import useTheme from '../use-theme';
import withScale from '../use-scale/with-scale';
import { InnerScroll } from '../scroll';
import useScale from '../use-scale';
import useQuickBar from '../use-quickbar';

const QuickBar: React.FC<PropsWithChildren<QuickBarProps>> = ({ children }) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const { isEnabled } = useQuickBar();

  return (
    <div className="quick-bar">
      <InnerScroll transparentBg={true} width={'100%'} height={'100%'} type="vertical">
        <div className="quick-bar-inner">{isEnabled && children}</div>
      </InnerScroll>
      <style jsx>{`
        .quick-bar-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          height: 100%;

          padding: ${SCALES.pt(0.75)} ${SCALES.pr(0.75)} ${SCALES.pb(0.75)} ${SCALES.pl(0.75)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
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

QuickBar.displayName = 'HimalayaQuickBar';
export default withScale(QuickBar);
