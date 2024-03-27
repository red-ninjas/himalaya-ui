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
  const { RESPONSIVE, SCALER, HIDER } = useScale();

  return (
    <footer className={useClasses('page-footer', className, HIDER)} {...props}>
      {children}
      <style jsx>{`
        .page-footer {
          position: absolute;
          bottom: 0;
        }

        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'page-footer')}
        ${RESPONSIVE.w(1, value => `width: ${value}};`, `100%`, 'page-footer')}

        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'page-footer')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'page-footer')}

        ${SCALER('page-footer')}
      `}</style>
    </footer>
  );
};

PageFooterComponent.displayName = 'HimalayaPageFooter';
const PageFooter = withScale(PageFooterComponent);
export default PageFooter;
