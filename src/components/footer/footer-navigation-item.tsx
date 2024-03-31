'use client';

import React from 'react';
import { FooterNavigationItemProps } from '.';
import useClasses from '../use-classes';
import { withScale } from '../use-scale';
import { useScale } from '../use-scale/scale-context';

const FooterNavigationItem = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<FooterNavigationItemProps>>(
  ({ children, className, ...props }: React.PropsWithChildren<FooterNavigationItemProps>, ref: React.Ref<HTMLAnchorElement>) => {
    const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();
    return (
      <li className={useClasses('footer-navigation-item', className, SCALE_CLASSES)}>
        <a className={useClasses('footer-link', className)} ref={ref} {...props}>
          {children}
        </a>
        <style jsx>
          {`
            .footer-navigation-item {
              display: inline-flex;
              flex-direction: column;
              padding: 0;
            }
            .footer-navigation-item:before {
              display: none;
            }
            .footer-link {
              font-weight: normal;
              color: var(--color-background-400);
            }
            .footer-link:hover {
              color: var(--color-foreground-1000);
            }

            ${RESPONSIVE.margin(
              { left: 0, right: 0, top: 0.375, bottom: 0.375 },
              value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
              undefined,
              'footer-navigation-item',
            )}

            ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'footer-navigation-item')}
          ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'footer-link')}
          ${RESPONSIVE.lineHeight(1, value => `line-height: ${value};`, 'normal', 'footer-link')}
          ${SCALER('footer-navigation-item')}
          `}
        </style>
      </li>
    );
  },
);
FooterNavigationItem.displayName = 'HimalayaFooterNavigationItem';
export default withScale(FooterNavigationItem);
