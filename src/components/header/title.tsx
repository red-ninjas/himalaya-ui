'use client';

import React, { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

const Logo: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { CLASS_NAMES, UNIT } = useScale();
  return (
    <div draggable={false} className={useClasses('title', CLASS_NAMES)}>
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
        ${UNIT('title')}
      `}</style>
    </div>
  );
};
export default withScale(Logo);
