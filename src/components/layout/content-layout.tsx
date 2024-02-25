'use client';

import React from 'react';
import { ContentLayoutProps } from '.';
import useLayout from '../use-layout';
import useScale, { withScale } from '../use-scale';

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof ContentLayoutProps>;
export type CardContentProps = ContentLayoutProps & NativeAttrs;

const ContentLayoutComponent: React.FC<React.PropsWithChildren<CardContentProps>> = ({ maxWidth, children, ...props }) => {
  const layout = useLayout();
  const { RESPONSIVE } = useScale();

  return (
    <div className="content-layout padding" {...props}>
      {children}
      <style jsx>{`
        .content-layout {
          flex: 1;
          max-width: ${maxWidth || layout.pageWidthWithMargin};
          margin: 0 auto;
          display: flex;
          box-sizing: border-box;
          width: 100%;
          flex-direction: column;
        }

        ${RESPONSIVE.padding(0, value => `font-size: ${value};`, layout.pageMargin)}
      `}</style>
    </div>
  );
};

ContentLayoutComponent.displayName = 'HimalayaContentLayout';
const ContentLayout = withScale(ContentLayoutComponent);
export default ContentLayout;
