'use client';
import { isArray } from 'lodash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { MouseEventHandler, PropsWithChildren, useRef, useState } from 'react';
import { INavigationItem } from '.';
import { ChevronUp } from '../icons';
import Popover from '../popover';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { pickChild } from '../utils/collections';
import { ReactiveDomReact } from '../utils/layouts';
import { useNavigation } from './navigation-context';
import NavigationSubItem from './sub-item';

export interface NavigationItemProps extends INavigationItem {
  exactMatch?: boolean;
  columns?: number;
  transcluent?: boolean;
  onClick?: () => void;
}

const NavigationItem: React.FC<PropsWithChildren<NavigationItemProps>> = ({
  children,
  exactMatch = true,
  url = '/',
  columns = 2,
  transcluent = true,
  onClick,
  title,
}) => {
  const theme = useTheme();
  const { onMouseOver } = useNavigation();
  const pathname = usePathname();
  const [isPopoverVisibile, setIsPopoverVisibile] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [, childElements] = pickChild(children, NavigationSubItem);
  const { SCALES } = useScale();
  const ref = useRef<HTMLAnchorElement | null>(null);

  const isLinkActive = url ? (exactMatch ? pathname == url : pathname.startsWith(url)) : false;

  const btnClass = useClasses({
    'menu-item': true,
    active: isLinkActive,
    'chevron-active': isPopoverVisibile,
    'is-hover': isHover,
    'has-chevron': childElements && isArray(childElements) && childElements?.length > 0,
  });

  const childs = () => (
    <div className="sub-child-grid">
      {childElements}
      <style jsx>{`
        .sub-child-grid {
          display: inline-grid;
          height: auto;
          grid-template-columns: repeat(${columns || '1'}, 1fr);
        }
      `}</style>
    </div>
  );

  const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const onChildMouseOver = () => {
    const coreRect = (ref?.current as HTMLElement)?.getBoundingClientRect();
    const newValue: ReactiveDomReact = {
      left: coreRect.left,
      right: coreRect.right,
      rect: ref?.current,
      deactive: () => setIsHover(false),
      elementTop: coreRect.top,
      height: coreRect.height,
      width: coreRect.width,
      top: coreRect.bottom,
    };

    onMouseOver(newValue);
    setIsHover(true);
  };

  return (
    <div className="navigation-item-outer">
      <div className="navigation-item" onMouseLeave={() => setIsHover(false)} onMouseOut={() => setIsHover(false)} onMouseOver={onChildMouseOver}>
        {childElements && isArray(childElements) && childElements?.length > 0 ? (
          <Popover
            onVisibleChange={visible => setIsPopoverVisibile(visible)}
            className="menu-popover"
            offset={16}
            placement="bottomStart"
            trigger="hover"
            portalClassName={useClasses({
              'menu-popover-item': true,
              'transcluent-popover': transcluent,
            })}
            enterDelay={0}
            leaveDelay={0}
            content={childs}
          >
            <Link passHref legacyBehavior href={url || ''}>
              <a className={btnClass} ref={ref} onClick={handleClick}>
                <span>{title}</span>
                <span className="chevron-outer">
                  <span className={useClasses({ chevron: true, rotated: isPopoverVisibile })}>
                    <ChevronUp size={14} />
                  </span>
                </span>
              </a>
            </Link>
          </Popover>
        ) : (
          <Link passHref legacyBehavior href={url || ''}>
            <a className={btnClass} ref={ref} onClick={handleClick}>
              <span>{title}</span>
            </a>
          </Link>
        )}
      </div>
      <style jsx>{`
        .navigation-item-outer {
          display: inline-flex;
          height: auto;
          align-items: center;
        }
        .navigation-item :global(.menu-popover) {
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

        .chevron-outer {
          position: absolute;
          height: 100%;
          right: ${SCALES.pr(0.2)};
          bottom: 0;
          display: flex;
          align-items: center;
        }

        .chevron {
          transform: rotate(180deg);
          transition: all 0.3s;
          display: inline-flex;
        }

        .rotated {
          transform: rotate(0deg);
        }

        .menu-item {
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
          font-weight: 500;
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0.875)} ${SCALES.pr(0.55)} ${SCALES.pb(0.875)} ${SCALES.pl(0.55)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0.2)} ${SCALES.mb(0)} ${SCALES.ml(0.2)};
          z-index: 1;
          transition: color 0.2s ease;
        }

        .has-chevron {
          padding-right: ${SCALES.pr(1.3)};
        }

        .menu-item:after {
          position: absolute;
          content: '';
          bottom: -1px;
          left: 0;
          right: 0;
          width: 100%;
          height: 2px;
          border-radius: 4px;
          transform: scaleX(0.75);
          background-color: ${theme.palette.foreground};
          transition:
            opacity,
            transform 200ms ease-in;
          opacity: 0;
        }

        :global(.menu-item) span.label {
          z-index: 1;
          padding: 8px 12px;
        }

        .backdrop {
          background: ${theme.palette.accents_2};
          position: absolute;
          border-radius: 5px;
          width: 100%;
          height: 100%;
          left: 0;
          z-index: 0;
          bottom: 0;
        }

        .menu-item:hover {
          color: ${theme.palette.foreground};
        }

        .menu-item.active {
          color: ${theme.palette.foreground};
          font-weight: 600;
        }
        .menu-item.is-hover {
          color: ${theme.palette.background} !important;
        }

        .menu-item.chevron-active {
          color: ${theme.palette.foreground};
        }

        :global(.tooltip-content.menu-popover-item > .inner) {
          padding: 0 !important;
        }

        :global(.tooltip-content.menu-popover-item) {
          max-width: 600px;
        }
      `}</style>
    </div>
  );
};
NavigationItem.displayName = 'HimalayaNavigationItem';

export default withScale(NavigationItem);
