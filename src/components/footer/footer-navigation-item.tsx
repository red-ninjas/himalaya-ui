'use client';

import NextLink from 'next/link';
import React, { PropsWithChildren } from 'react';
import { FooterNavigationItemProps } from '.';
import { withScale } from '../use-scale';
import { useScale } from '../use-scale/scale-context';

const FooterNavigationItem: React.FC<PropsWithChildren<FooterNavigationItemProps>> = ({ children, href, target = '_self', ...props }) => {
  const { SCALER, RESPONSIVE } = useScale();
  return (
    <li className="footer-navigation-item" {...props}>
      <NextLink legacyBehavior passHref href={href} target={target}>
        <a className="footer-link">{children}</a>
      </NextLink>
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
};

export default withScale(FooterNavigationItem);
