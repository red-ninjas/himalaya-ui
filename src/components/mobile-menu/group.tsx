'use client';
import { useRouter } from 'next/navigation';
import React, { MouseEventHandler, PropsWithChildren, ReactNode, useRef, useState } from 'react';
import { ChevronDown } from '../icons';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { pickChild } from '../utils/collections';
import { INavigationItem } from './index';
import MobileNavigationSubGroup from './subgroup';

export interface Props extends INavigationItem {
  expanded?: boolean;
}
type NativeAttrs = Omit<React.HTMLAttributes<HTMLAnchorElement>, keyof Props>;
export type MobileNavigationGroupProps = Props & NativeAttrs;

const MobileNavigationGroup: React.FC<PropsWithChildren<MobileNavigationGroupProps>> = ({ children, title, url, expanded = true, ...props }) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const router = useRouter();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const [, subGroup] = pickChild(children, MobileNavigationSubGroup);

  const btnClass = useClasses({
    'mobile-navigation-item': true,
    'has-chevron': !!children,
  });

  const childs = (childElements: ReactNode) => {
    return (
      <div className={useClasses({ 'child-grid': true, 'grid-show': isExpanded })}>
        <div className="child-elements">{childElements}</div>
        <style jsx>{`
          .child-elements {
            padding: ${SCALES.pt(0.25)} ${SCALES.pr(0)} ${SCALES.pb(0.25)} ${SCALES.pl(0)};
          }
          .child-grid {
            visibility: hidden;
            height: 0;
            overflow-y: hidden;
            will-change: height;
            transition: height 0.2s ease;
          }
          .sub-child-grid {
            display: grid;
            height: auto;
            margin-left: ${SCALES.pr(1.5)};
            grid-template-rows: repeat(1, 1fr);
          }

          :global(.child-grid > .item:last-child) {
            border: 0;
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
        <a {...props} className={`${btnClass} ${props.className || ''}`} ref={ref} onClick={e => handleGroupClick(e)}>
          <span>{title}</span>
          {!!children && (
            <span className="chevron-right">
              <span className={useClasses({ chevron: true, 'chevron-expanded': isExpanded })}>
                <ChevronDown size={SCALES.font(1)} />
              </span>
            </span>
          )}
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
          font-weight: bold;
          transform: rotate(0deg);
          transition: transform 0.2s ease;
        }
        .chevron-expanded {
          transform: rotate(180deg);
        }

        .chevron-right {
          position: relative;
          height: 100%;
          margin-right: ${SCALES.pr(0.2)};
          bottom: 0;
          display: flex;
          align-items: center;
        }

        .mobile-navigation-item {
          position: relative;
          box-sizing: border-box;
          cursor: pointer;
          outline: 0;
          gap: 3px;
          white-space: nowrap;
          background-color: transparent;
          color: ${theme.palette.background.accents.accents_5};
          border-bottom: 1px solid ${theme.palette.border.value};
          user-select: none;
          display: flex;
          align-items: center;
          user-select: none;
          font-size: ${SCALES.font(0.85)};
          font-weight: 500;
          line-height: normal;
          width: ${SCALES.w(1, 'auto')};
          height: ${SCALES.h(1, 'auto')};

          padding: ${SCALES.pt(0.7)} ${SCALES.pr(0.85)} ${SCALES.pb(0.7)} ${SCALES.pl(0.85)};

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
          justify-content: space-between;
        }

        .mobile-navigation-item:after {
          position: absolute;
          content: '';
          bottom: -1px;
          left: 0;
          right: 0;
          width: 100%;
          height: 2px;
          border-radius: 4px;
          transform: scaleX(0.75);
          background-color: ${theme.palette.foreground.value};
          transition:
            opacity,
            transform 200ms ease-in;
          opacity: 0;
        }

        :global(.mobile-navigation-item) span.label {
          z-index: 1;
          padding: 8px 12px;
        }

        .backdrop {
          background: ${theme.palette.background.accents.accents_2};
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
