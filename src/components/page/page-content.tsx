'use client';

import useClasses from 'components/use-classes';
import React from 'react';
import useScale, { withScale } from '../use-scale';

interface Props {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type PageContentProps = Props & NativeAttrs;

const PageContentComponent: React.FC<React.PropsWithChildren<PageContentProps>> = ({
  className = undefined,
  children,
  ...props
}: React.PropsWithChildren<PageContentProps>) => {
  const { RESPONSIVE, SCALER } = useScale();

  return (
    <main className={useClasses('page-content', className)} {...props}>
      {children}
      <style jsx>{`
        ${RESPONSIVE.h(1, value => `height: ${value};`, '100%', 'page-content')}
        ${RESPONSIVE.w(1, value => `width: ${value}};`, `100%`, 'page-content')}

        ${RESPONSIVE.padding(
          { left: 0, right: 0, top: 3.125, bottom: 3.125 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'page-content',
        )}

        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'page-section')}

        ${SCALER('page-content')}
      `}</style>
    </main>
  );
};

PageContentComponent.displayName = 'HimalayaPageContent';
const PageContent = withScale(PageContentComponent);
export default PageContent;
