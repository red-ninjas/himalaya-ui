'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type PageFooterProps = Props & NativeAttrs;

const PageFooterComponent: React.FC<React.PropsWithChildren<PageFooterProps>> = ({
  children,
  className = undefined,
  ...props
}: React.PropsWithChildren<PageFooterProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <footer className={useClasses('page-footer', className, CLASS_NAMES)} {...props}>
      {children}
      <style jsx>{`
        .page-footer {
          position: absolute;
          bottom: 0;
        }

        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'page-footer')}
        ${SCALE.w(1, value => `width: ${value}};`, `100%`, 'page-footer')}

        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'page-footer')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'page-footer')}

        ${UNIT('page-footer')}
      `}</style>
    </footer>
  );
};

PageFooterComponent.displayName = 'HimalayaPageFooter';
const PageFooter = withScale(PageFooterComponent);
export default PageFooter;
