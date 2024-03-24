'use client';

import React from 'react';
import { withScale } from '../use-scale';
import useTheme from '../use-theme';

const ContentLayoutComponent: React.FC<React.PropsWithChildren<{}>> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <div className="page-layout" {...props}>
      {children}
      <style jsx>{`
        .page-layout {
          width: 100%;
          background: var(--color-background-1000);
          color: var(--color-foreground-1000);
        }
      `}</style>
    </div>
  );
};
ContentLayoutComponent.displayName = 'HimalayaPageLayout';
const PageLayout = withScale(ContentLayoutComponent);
export default PageLayout;
