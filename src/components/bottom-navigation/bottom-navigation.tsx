'use client';

import React from 'react';
import useClasses from '../use-classes';
import { useConfigs } from '../use-config/config-context';
import { pickChild } from '../utils/collections';
import BottomNavigationItem from './item';

export interface BottomNavigationProps {
  transcluent?: boolean;
  mobileOnly?: boolean;
}

const BottomNavigation: React.FC<React.PropsWithChildren<BottomNavigationProps>> = ({ transcluent = true, mobileOnly = true, children }) => {
  const [, navigationElement] = pickChild(children, BottomNavigationItem);
  const { isMobile } = useConfigs();

  if (mobileOnly && isMobile) {
    return null;
  }

  return (
    <div
      className={useClasses({
        'bottom-navigation': true,
        transcluent: transcluent,
      })}
    >
      {navigationElement}

      <style jsx>{`
        .bottom-navigation {
          position: sticky;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: var(--color-background-1000);
          display: flex;
          justify-content: space-around;
          padding: 10px 0;
          z-index: 100;
          box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
        }
        .transcluent {
          backdrop-filter: saturate(180%) blur(5px);
          background-color: rgba(var(--color-background-1000-rgb), 0.8);
        }
      `}</style>
    </div>
  );
};

BottomNavigation.displayName = 'BottomNavigation';
export default BottomNavigation;
