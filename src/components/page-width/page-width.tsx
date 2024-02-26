'use client';

import React from 'react';
import useLayout from '../use-layout';
import useScale, { withScale } from '../use-scale';

export type PageWidthProps = React.HTMLAttributes<HTMLDivElement>;
const PageWidthComponent: React.FC<React.PropsWithChildren<PageWidthProps>> = ({ children, ...props }) => {
  const layout = useLayout();
  const { RESPONSIVE } = useScale();

  return (
    <div className="content-layout padding" {...props}>
      {children}
      <style jsx>{`
        .content-layout {
          flex: 1;
          max-width: ${layout.pageWidthWithMargin};
          margin: 0 auto;
          display: flex;
          box-sizing: border-box;
          width: 100%;
          flex-direction: column;
        }

        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom}  ${value.left};`, layout.pageMargin)}
      `}</style>
    </div>
  );
};

PageWidthComponent.displayName = 'HimalayaPageWidth';
const PageWidth = withScale(PageWidthComponent);
export default PageWidth;
