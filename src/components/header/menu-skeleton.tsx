'use client';
import React, { useEffect, useState } from 'react';
import useTheme from '../use-theme';
import { useConfigs } from '../use-context/config-context';
import useLayout from '../use-layout';

const DEFAULT_OPACITY = 0.75;
const LOADING_OPACITY = 0.45;
const MenuSkeleton: React.FC<unknown> = () => {
  const theme = useTheme();
  const layout = useLayout();
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);
  const { isMobile } = useConfigs();

  useEffect(() => {
    const timer = setInterval(() => {
      setOpacity(opacity => (opacity !== DEFAULT_OPACITY ? DEFAULT_OPACITY : LOADING_OPACITY));
    }, 600);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);
  return (
    <div className="skeleton-menu-wrapper">
      <div className="skeleton-menu">
        <div className="skeleton-inner">
          <div className="skeleton-item"></div>
        </div>
      </div>
      <style jsx>{`
        .skeleton-menu-wrapper {
          height: var(${isMobile ? '--page-nav-height-mobile' : '--page-nav-height'}, 60px);
        }
        .skeleton-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(${isMobile ? '--page-nav-height-mobile' : '--page-nav-height'}, 60px);
          border-bottom: 1px solid ${theme.palette.border};
          z-index: 999;
          display: flex;
          align-item: center;
        }

        .skeleton-inner {
          width: 100%;
          height: 100%;
          margin: 0 auto;
          max-width: ${layout.pageWidthWithMargin};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skeleton-item {
          background-color: ${theme.palette.accents_2};
          opacity: ${opacity};
          margin: 0 ${layout.gap};
          padding: ${layout.gap} 0;
          flex: 1;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default MenuSkeleton;
