'use client';

import React, { PropsWithChildren } from 'react';
import { FooterBottomItemProps } from './index';

const FooterBottomBlock: React.FC<PropsWithChildren<FooterBottomItemProps>> = ({ children, justify, ...props }) => {
  return (
    <div className="footer-bottom-item" {...props}>
      {children}
      <style jsx>{`
        .footer-bottom-item {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: ${justify};
        }
      `}</style>
    </div>
  );
};

export default FooterBottomBlock;
