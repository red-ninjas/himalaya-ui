'use client';

import React, { PropsWithChildren } from 'react';
import { withScale } from '../use-scale';

const Logo: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div draggable={false} className="title">
      {children}
      <style jsx>{`
        .title {
          display: block;
          font-size: 0.95em;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
};
export default withScale(Logo);
