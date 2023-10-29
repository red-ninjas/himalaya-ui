'use client';

import React, { PropsWithChildren } from 'react';
import { withScale } from '../use-scale';
import { FooterBlockProps } from './index';

const FooterBlock: React.FC<PropsWithChildren<FooterBlockProps>> = ({ children, justify = 'flex-start' }) => {
  return (
    <div className="footer-block">
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

export default withScale(FooterBlock);
