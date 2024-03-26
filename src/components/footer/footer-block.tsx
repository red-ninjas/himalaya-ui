'use client';

import React, { PropsWithChildren } from 'react';
import { FooterBottomItemProps } from './index';

const FooterBlock: React.FC<PropsWithChildren<FooterBottomItemProps>> = ({ children, justify = 'flex-start', ...props }) => {
  return (
    <div className="footer-block" {...props}>
      {children}
      <style jsx>{`
        .footer-block {
          display: flex;
          flex-wrap: wrap;
          flex: 1;
          justify-content: ${justify};
        }
      `}</style>
    </div>
  );
};

export default FooterBlock;
