'use client';

import useClasses from '../use-classes';
import React, { ReactNode } from 'react';
import useScale, { withScale } from '../use-scale';
import BreadcrumbsSeparator from './breadcrumbs-separator';

interface Props {
  separator?: string | ReactNode;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type BreadcrumbsProps = Props & NativeAttrs;

const BreadcrumbsComponent: React.FC<React.PropsWithChildren<BreadcrumbsProps>> = ({ separator = '/', children, className = '' }: BreadcrumbsProps) => {
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();

  const childrenArray = React.Children.toArray(children);
  const withSeparatorChildren = childrenArray.map((item, index) => {
    if (!React.isValidElement(item)) return item;
    const last = childrenArray[index - 1];
    const lastIsSeparator = React.isValidElement(last) && last.type === BreadcrumbsSeparator;
    const currentIsSeparator = item.type === BreadcrumbsSeparator;
    if (!lastIsSeparator && !currentIsSeparator && index > 0) {
      return (
        <React.Fragment key={index}>
          <BreadcrumbsSeparator>{separator}</BreadcrumbsSeparator>
          {item}
        </React.Fragment>
      );
    }
    return item;
  });

  return (
    <nav className={useClasses('nav', className, SCALE_CLASSES)}>
      {withSeparatorChildren}
      <style jsx>{`
        .nav {
          line-height: inherit;
          color: var(--color-background-500);
          box-sizing: border-box;
          display: flex;
          align-items: center;
        }

        nav :global(.link:hover) {
          color: var(--color-link-1000);
        }

        nav > :global(span:last-of-type) {
          color: var(--color-background-300);
        }

        nav > :global(.separator:last-child) {
          display: none;
        }

        nav :global(svg) {
          width: 1em;
          height: 1em;
          margin: 0 4px;
        }

        nav :global(.breadcrumbs-item) {
          display: inline-flex;
          align-items: center;
        }

        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'nav')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'nav')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'nav')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'nav')}
        ${RESPONSIVE.font(1, value => `height: ${value};`, undefined, 'nav')}

        ${SCALER('nav')}
      `}</style>
    </nav>
  );
};

BreadcrumbsComponent.displayName = 'HimalayaBreadcrumbs';
const Breadcrumbs = withScale(BreadcrumbsComponent);
export default Breadcrumbs;
