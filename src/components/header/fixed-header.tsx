'use client';

import useScale, { withScale } from '../use-scale';
import React from 'react';
import useClasses from '../use-classes';
import { pickChild } from '../utils/collections';
import Header from './header';

interface Props {
  mode?: 'fixed' | 'sticky';
  hidden?: boolean;
}

type FixedHeaderPropsNative = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type FixedHeaderProps = FixedHeaderPropsNative & Props;

const FixedHeader: React.FC<React.PropsWithChildren<FixedHeaderProps>> = ({ children, mode = 'sticky', hidden = false, className, ...props }) => {
  const { SCALER, HIDER } = useScale();

  const [, header] = pickChild(children, Header);
  return (
    <div className={useClasses('fixed-header', { hidden }, className, HIDER)} {...props}>
      {header}

      <style jsx>{`
        .header-spacer {
          position: relative;
          width: 100%;
        }
        .fixed-header {
          position: ${mode};
          width: 100%;
          max-width: 100%;
          top: 0;
          z-index: 9;
          display: block;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 0.5s;
          --translate-y: 0px;
          transition-property: all;
          transform: translate(0, var(--translate-y));
        }
        .hidden {
          --translate-y: -100%;
        }

        ${SCALER('fixed-header')}
      `}</style>
    </div>
  );
};

FixedHeader.displayName = 'HimalayaFixedHeader';
export default withScale(FixedHeader);
