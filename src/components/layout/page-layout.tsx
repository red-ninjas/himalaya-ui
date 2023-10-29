'use client';

import React from 'react';
import { withScale } from '../use-scale';
import useTheme from '../use-theme';

const ContentLayoutComponent: React.FC<React.PropsWithChildren<{}>> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <div className="content-layout" {...props}>
      {children}
      <style jsx>{`
        .content-layout {
          width: 100%;
          background: ${theme.palette.background};
          color: ${theme.palette.foreground};
        }
      `}</style>
    </div>
  );
};
ContentLayoutComponent.displayName = 'HimalayaPageLayout';
const PageLayout = withScale(ContentLayoutComponent);
export default PageLayout;
