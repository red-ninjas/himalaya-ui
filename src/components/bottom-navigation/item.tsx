'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useRef } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { IBottomNavigationItem } from './index';

export interface BottomNavigationItemProps extends IBottomNavigationItem {
  exactMatch?: boolean;
  onClick?: () => void;
}

const BottomNavigationItem: React.FC<PropsWithChildren<BottomNavigationItemProps>> = ({ exactMatch = true, url = '#', icon, onClick }) => {
  const pathname = usePathname();
  const { SCALER, RESPONSIVE } = useScale();
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

        .bottom-menu-item {
          position: relative;
          box-sizing: border-box;
          cursor: pointer;
          outline: 0;
          gap: 3px;
          white-space: nowrap;
          background-color: transparent;
          color: var(--color-background-400);
          user-select: none;
          display: flex;
          align-items: center;
          user-select: none;
          z-index: 1;
        }

        :global(.bottom-menu-item) span.label {
          z-index: 1;
          padding: 8px 12px;
        }

        .bottom-menu-item:hover {
          color: var(--color-foreground-1000);
        }

        .bottom-menu-item.active {
          color: var(--color-foreground-1000);
          border-top: 3px solid var(--color-foreground-1000);
          font-weight: 500;
        }

        ${SCALER('bottom-navigation-item')}

        ${RESPONSIVE.lineHeight(0.875, value => `font-size: ${value};`, 'normal', 'bottom-navigation-item')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'bottom-navigation-item')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'bottom-navigation-item')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'bottom-navigation-item')}
        ${RESPONSIVE.padding(
          {
            top: 0.875,
            left: 0.55,
            right: 0.55,
            bottom: 0.875,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'bottom-navigation-item',
        )}
        ${RESPONSIVE.margin(
          {
            top: 0,
            left: 0.2,
            right: 0,
            bottom: 0,
          },
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'bottom-navigation-item',
        )}
      `}</style>
    </div>
  );
};
BottomNavigationItem.displayName = 'HimalayaBottomNavigationItem';

export default withScale(BottomNavigationItem);
