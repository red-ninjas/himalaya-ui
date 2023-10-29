'use client';

import React from 'react';
import { ContentLayoutProps } from '.';
import useLayout from '../use-layout';
import useScale, { withScale } from '../use-scale';

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof ContentLayoutProps>;
export type CardContentProps = ContentLayoutProps & NativeAttrs;

const ContentLayoutComponent: React.FC<React.PropsWithChildren<CardContentProps>> = ({ maxWidth, children, ...props }) => {
  const layout = useLayout();
  const { SCALES } = useScale();

  return (
    <div className="content-layout" {...props}>
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
          padding: ${SCALES.pt(1)} ${SCALES.pr(1)} ${SCALES.pb(1)} ${SCALES.pl(1)};
        }
      `}</style>
    </div>
  );
};

ContentLayoutComponent.displayName = 'HimalayaContentLayout';
const ContentLayout = withScale(ContentLayoutComponent);
export default ContentLayout;
