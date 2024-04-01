'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export type PageWidthProps = React.HTMLAttributes<HTMLDivElement>;
const PageWidthComponent: React.FC<React.PropsWithChildren<PageWidthProps>> = ({ children, className, ...props }) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <div className={useClasses('content-layout', className, CLASS_NAMES)} {...props}>
      {children}
      <style jsx>{`
        .content-layout {
          flex: 1;
          max-width: var(--layout-page-width-with-margin);
          display: flex;
          box-sizing: border-box;
          flex-direction: column;
        }

        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, `var(--layout-page-margin)`, 'content-layout')}
        ${SCALE.w(1, value => `width: ${value};`, `100%`, 'content-layout')}
        ${SCALE.h(1, value => `height: ${value};`, `auto`, 'content-layout')}
        ${SCALE.margin(
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

        ${UNIT('content-layout')}
      `}</style>
    </div>
  );
};

PageWidthComponent.displayName = 'HimalayaPageWidth';
const PageWidth = withScale(PageWidthComponent);
export default PageWidth;
