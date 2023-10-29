'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useRef } from 'react';
import { IBottomNavigationItem } from './index';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

export interface BottomNavigationItemProps extends IBottomNavigationItem {
  exactMatch?: boolean;
  onClick?: () => void;
}

const BottomNavigationItem: React.FC<PropsWithChildren<BottomNavigationItemProps>> = ({ exactMatch = true, url = '#', icon, onClick }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const { SCALES } = useScale();
  const ref = useRef<HTMLAnchorElement | null>(null);

  const isLinkActive = url ? (exactMatch ? pathname == url : pathname.startsWith(url)) : false;

  const btnClass = useClasses({
    'bottom-menu-item': true,
    active: isLinkActive,
  });

  const handleClick = (e: any) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="bottom-navigation-item-outer">
      <div className="bottom-navigation-item">
        <Link passHref legacyBehavior href={url || ''}>
          <a className={btnClass} ref={ref} onClick={e => handleClick(e)}>
            <span>{icon}</span>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .bottom-navigation-item-outer {
          display: inline-flex;
          height: auto;
          align-items: center;
        }
        .bottom-navigation-item {
          display: inline-flex !important;

          height: 100%;
          left: 0;
          top: 0;
          z-index: 0;
          box-shadow: none;
        }

        .navigation-item {
          display: inline-flex;
          position: relative;
          height: auto;
        }

        .bottom-menu-item {
          position: relative;
          box-sizing: border-box;
          cursor: pointer;
          outline: 0;
          gap: 3px;
          white-space: nowrap;
          background-color: transparent;
          color: ${theme.palette.accents_5};
          user-select: none;
          display: flex;
          align-items: center;
          user-select: none;
          font-size: ${SCALES.font(0.875)};
          line-height: normal;
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0.875)} ${SCALES.pr(0.55)} ${SCALES.pb(0.875)} ${SCALES.pl(0.55)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0.2)} ${SCALES.mb(0)} ${SCALES.ml(0.2)};
          z-index: 1;
        }

        :global(.bottom-menu-item) span.label {
          z-index: 1;
          padding: 8px 12px;
        }

        .bottom-menu-item:hover {
          color: ${theme.palette.foreground};
        }

        .bottom-menu-item.active {
          color: ${theme.palette.foreground};
          border-top: 3px solid ${theme.palette.foreground};
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};
BottomNavigationItem.displayName = 'HimalayaBottomNavigationItem';

export default withScale(BottomNavigationItem);
