'use client';

import useClasses from '../use-classes';
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
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <main className={useClasses('page-content', className, CLASS_NAMES)} {...props}>
      {children}
      <style jsx>{`
        ${SCALE.h(1, value => `height: ${value};`, '100%', 'page-content')}
        ${SCALE.w(1, value => `width: ${value}};`, `100%`, 'page-content')}

        ${SCALE.padding(
          { left: 0, right: 0, top: 3.125, bottom: 3.125 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'page-content',
        )}

        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'page-section')}

        ${UNIT('page-content')}
      `}</style>
    </main>
  );
};

PageContentComponent.displayName = 'HimalayaPageContent';
const PageContent = withScale(PageContentComponent);
export default PageContent;
