'use client';

import React, { PropsWithChildren } from 'react';
import { withScale } from '../use-scale';
import { FooterNavigationProps } from '.';

const FooterNavigation: React.FC<PropsWithChildren<FooterNavigationProps>> = ({ children, title }) => {
  return (
    <nav className="footer-navigation">
      {title && <div className="footer-navigation-title">{title}</div>}
      <ul className="footer-navigation-group">{children}</ul>
      <style jsx>{`
        .footer-navigation-group {
          display: flex;
          flex-direction: column;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        .footer-navigation-title {
          font-size: 14px;
          font-weight: 500;
          padding: 12px 0px;
        }
      `}</style>
    </nav>
  );
};

export default withScale(FooterNavigation);
