'use client';

import useScale, { withScale } from '../use-scale';
import React from 'react';
import useClasses from '../use-classes';
import { pickChild } from '../utils/collections';
import Header from './header';

interface Props {
  hidden?: boolean;
}

type FixedHeaderPropsNative = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type FixedHeaderProps = FixedHeaderPropsNative & Props;

const FixedHeader: React.FC<React.PropsWithChildren<FixedHeaderProps>> = ({ children, hidden = false, className, ...props }) => {
  const { UNIT, CLASS_NAMES } = useScale();
  const [, header] = pickChild(children, Header);
  return (
    <div className="fixed-header-outer">
      <div className={useClasses('fixed-header', { hidden }, className, CLASS_NAMES)} {...props}>
        {header}
        <style jsx>{`
          .header-spacer {
            position: relative;
            width: 100%;
          }
          .fixed-header {
            position: fixed;
            align-items: center;
            right: 0;
            left: auto;
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

          .fixed-header-outer {
          }

          ${UNIT('fixed-header-outer')}
        `}</style>
      </div>
    </div>
  );
};

FixedHeader.displayName = 'HimalayaFixedHeader';
export default withScale(FixedHeader);
