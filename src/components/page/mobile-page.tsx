'use client';

import useTheme from '../use-theme';
import React from 'react';
import useLayout from '../use-layout';

const MobilePage: React.FC<React.PropsWithChildren<{}>> = React.memo(({ children }) => {
  const theme = useTheme();
  const layout = useLayout();
  return (
    <>
      <div className="sub-page">{children}</div>
      <style jsx>{`
        @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
          .sub-page {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            background: ${theme.palette.background};
            z-index: 10;
          }
        }
      `}</style>
    </>
  );
});

MobilePage.displayName = 'HimalayaMobilePage';
export default MobilePage;
