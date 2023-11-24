'use client';

import { pickChild } from '../utils/collections';
import React from 'react';
import Header from './header';
import { useConfigs } from '../use-context/config-context';
import useClasses from '../use-classes';
import useLayout from '../use-layout';

export interface FixedHeaderProps {
  onDesktop?: boolean;
  onMobile?: boolean;
  hide?: boolean;
  mode?: 'fixed' | 'sticky';
}
const FixedHeader: React.FC<React.PropsWithChildren<FixedHeaderProps>> = ({ children, onDesktop = true, onMobile = true, hide = false, mode = 'sticky' }) => {
  const { isMobile } = useConfigs();
  const layout = useLayout();

  const [, header] = pickChild(children, Header);

  const isActive = (onDesktop && !isMobile) || (isMobile && onMobile);
  return (
    <>
      {isActive && <div className={useClasses('fixed-header', { hidden: hide })}>{header}</div>}
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
          display: ${isActive ? 'block' : 'none'};
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 0.5s;
          --translate-y: 0px;
          transition-property: all;
          transform: translate(0, var(--translate-y));
        }
        .hidden {
          --translate-y: -100%;
        }
        @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
          .fixed-header {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

FixedHeader.displayName = 'HimalayaFixedHeader';
export default FixedHeader;
