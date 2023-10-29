'use client';

import NextLink from 'next/link';
import React, { PropsWithChildren } from 'react';
import { FooterNavigationItemProps } from '.';
import { withScale } from '../use-scale';
import useTheme from '../use-theme';

const FooterNavigationItem: React.FC<PropsWithChildren<FooterNavigationItemProps>> = ({ children, href, target = '_self' }) => {
  const theme = useTheme();
  return (
    <li className="footer-navigation-item">
      <NextLink legacyBehavior passHref href={href} target={target}>
        <a className="footer-link">{children}</a>
      </NextLink>
      <style jsx>
        {`
          .footer-navigation-item {
            display: inline-flex;
            flex-direction: column;
            padding: 0;
            margin: 6px 0px;
          }
          .footer-navigation-item:before {
            display: none;
          }
          .footer-link {
            font-weight: normal;
            font-size: 14px;
            color: ${theme.palette.accents_5};
            line-height: normal;
          }
          .footer-link:hover {
            color: ${theme.palette.foreground};
          }
        `}
      </style>
    </li>
  );
};

export default withScale(FooterNavigationItem);
