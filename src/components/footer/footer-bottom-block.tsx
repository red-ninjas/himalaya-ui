'use client';

import React, { PropsWithChildren } from 'react';
import { withScale } from '../use-scale';
import { FooterBottomItemProps } from './index';

const FooterBottomBlock: React.FC<PropsWithChildren<FooterBottomItemProps>> = ({ children, justify }) => {
  return (
    <div className="footer-bottom-item">
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

export default withScale(FooterBottomBlock);
