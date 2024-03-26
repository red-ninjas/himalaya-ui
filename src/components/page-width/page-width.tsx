'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';

export type PageWidthProps = React.HTMLAttributes<HTMLDivElement>;
const PageWidthComponent: React.FC<React.PropsWithChildren<PageWidthProps>> = ({ children, ...props }) => {
  const { RESPONSIVE, SCALER } = useScale();

  return (
    <div className="content-layout" {...props}>
      {children}
      <style jsx>{`
        .content-layout {
          flex: 1;
          max-width: var(--layout-page-width-with-margin);
          display: flex;
          box-sizing: border-box;
          flex-direction: column;
        }

        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, `var(--layout-page-margin)`, 'content-layout')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, `100%`, 'content-layout')}
        ${RESPONSIVE.margin(
          0,
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          {
            top: undefined,
            right: 'auto',
            left: 'auto',
            bottom: undefined,
          },
          'content-layout',
        )}

        ${SCALER('content-layout')}
      `}</style>
    </div>
  );
};

PageWidthComponent.displayName = 'HimalayaPageWidth';
const PageWidth = withScale(PageWidthComponent);
export default PageWidth;
