'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  center?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type PageHeaderProps = Props & NativeAttrs;

const PageHeaderComponent: React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  children,
  center = false,
  className,
  ...props
}: React.PropsWithChildren<PageHeaderProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const classes = useClasses('page-header', { center }, className, CLASS_NAMES);

  return (
    <header className={classes} {...props}>
      {children}
      <style jsx>{`
        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'page-header')}
        ${SCALE.w(1, value => `width: ${value}};`, `100%`, 'page-header')}

        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'page-header')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'page-header')}

        ${UNIT('page-header')}
      `}</style>
    </header>
  );
};

PageHeaderComponent.displayName = 'HimalayaPageHeader';
const PageHeader = withScale(PageHeaderComponent);
export default PageHeader;
