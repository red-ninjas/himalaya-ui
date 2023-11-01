'use client';
import { addColorAlpha } from '../utils/color';
import { useRouter } from 'next/navigation';
import React, { MouseEventHandler, PropsWithChildren, ReactNode, useRef, useState } from 'react';
import { ChevronDown, ChevronRight } from '../icons';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { pickChild } from '../utils/collections';
import { INavigationItem } from './index';
import MobileNavigationSubGroup from './subgroup';

export interface MobileNavigationGroupProps extends INavigationItem {
  expanded?: boolean;
}

const MobileNavigationGroup: React.FC<PropsWithChildren<MobileNavigationGroupProps>> = ({ children, title, url, expanded = true }) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const router = useRouter();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const [, subGroup] = pickChild(children, MobileNavigationSubGroup);

  const btnClass = useClasses({
    'menu-item': true,
    'has-chevron': !!children,
  });

  const childs = (childElements: ReactNode) => {
    return (
      <div className={useClasses({ 'child-grid': true, 'grid-show': isExpanded })}>
        <div>{childElements}</div>
        <style jsx>{`
          .child-grid {
            background-color: ${addColorAlpha(theme.palette.accents_0, 0.3)};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0.55)} ${SCALES.pb(0)} ${SCALES.pl(0.875)};

            transition: height 200ms ease;
            overflow: hidden;
            visibility: hidden;
            height: 0;
          }
          .sub-child-grid {
            display: grid;
            height: auto;
            margin-left: ${SCALES.pr(1.5)};
            grid-template-rows: repeat(1, 1fr);
          }

          .grid-show {
            height: auto;
            visibility: visible;
          }
        `}</style>
      </div>
    );
  };
  const handleGroupClick: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    e.stopPropagation();

    setIsExpanded(!isExpanded);

    if (url) {
      router.push(url);
    }
  };

  return (
    <div
      className={useClasses({
        'navigation-group-outer': true,
        'has-subgroup': !!subGroup && !!subGroup.length,
      })}
    >
      <div className="navigation-group">
        <a className={btnClass} ref={ref} onClick={e => handleGroupClick(e)}>
          {!!children && (
            <span className="chevron-right">
              <span className={useClasses({ chevron: true })}>{isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
            </span>
          )}
          <span>{title}</span>
        </a>
        {childs(children)}
      </div>
      <style jsx>{`
        .navigation-group-outer {
          display: flex;
          height: auto;
          width: 100%;
          position: relative;
          align-items: center;
        }

        .navigation-group {
          width: 100%;
        }

        .chevron {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .chevron-right {
          position: relative;
          height: 100%;
          margin-right: ${SCALES.pr(0.2)};
          bottom: 0;
          display: flex;
          align-items: center;
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
          border-bottom: 1px solid ${theme.palette.border};
          user-select: none;
          display: flex;
          align-items: center;
          user-select: none;
          font-size: ${SCALES.font(1)};
          line-height: normal;
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0.875)} ${SCALES.pr(0.55)} ${SCALES.pb(0.875)} ${SCALES.pl(0.55)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          z-index: 1;

          animation: fadeIn 200ms ease;
          animation-fill-mode: forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from {
            transform: translate3d(0, 0.375rem, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
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
MobileNavigationGroup.displayName = 'HimalayaNavigationItem';

export default withScale(MobileNavigationGroup);
