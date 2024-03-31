'use client';
import React, { MouseEventHandler, PropsWithChildren, ReactNode, useRef, useState } from 'react';
import { ChevronDown } from '../icons';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import { INavigationItem } from './index';
import MobileNavigationSubGroup from './subgroup';

export interface Props extends INavigationItem {
  expanded?: boolean;
}
type NativeAttrs = Omit<React.HTMLAttributes<HTMLAnchorElement>, keyof Props>;
export type MobileNavigationGroupProps = Props & NativeAttrs;

const MobileNavigationGroup: React.FC<PropsWithChildren<MobileNavigationGroupProps>> = ({ children, title, expanded = true, ...props }) => {
  const { UNIT, SCALE, CLASS_NAMES } = useScale();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const [, subGroup] = pickChild(children, MobileNavigationSubGroup);

  const btnClass = useClasses({
    'mobile-navigation-item': true,
    'has-chevron': !!children,
    CLASS_NAMES,
  });

  const childs = (childElements: ReactNode) => {
    return (
      <div className={useClasses('child-grid', { 'grid-show': isExpanded })}>
        <div className="child-elements">{childElements}</div>
        <style jsx>{`
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
            grid-template-rows: repeat(1, 1fr);
          }

          :global(.child-grid > .item:last-child) {
            border: 0;
          }

          .grid-show {
            height: auto;
            visibility: visible;
          }

          ${SCALE.ml(1.5, value => `margin-right: ${value};`, undefined, 'sub-child-grid')}

          ${SCALE.padding(
            {
              top: 0.25,
              bottom: 0.25,
              left: 0,
              right: 0,
            },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'child-element',
          )}
        `}</style>
      </div>
    );
  };
  const handleGroupClick: MouseEventHandler<HTMLAnchorElement> = e => {
    setIsExpanded(!isExpanded);
  };

  const hasChildrens = !!children;

  return (
    <div
      className={useClasses({
        'navigation-group-outer': true,
        'has-subgroup': !!subGroup && !!subGroup.length,
      })}
    >
      <div className="navigation-group">
        <a {...props} className={`${btnClass} ${props.className || ''}`} ref={ref} onClick={e => handleGroupClick(e)}>
          <span className={useClasses('has-childs', hasChildrens)}>{title}</span>
          {hasChildrens && (
            <span className="chevron-right">
              <span className={useClasses('chevron', { 'chevron-expanded': isExpanded })}>
                <ChevronDown />
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

        .has-childs {
          color: var(--color-foreground-1000);
          font-weight: 600;
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
          color: var(--color-background-400);
          border-bottom: 1px solid var(--color-border-1000);
          user-select: none;
          display: flex;
          align-items: center;
          user-select: none;
          font-weight: 500;
          line-height: normal;

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
          background-color: var(--color-foreground-1000);
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
          background: var(--color-background-700);
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

        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'mobile-navigation-item')}
        ${SCALE.padding(
          {
            top: 0.7,
            bottom: 0.7,
            left: 0.85,
            right: 0.85,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'mobile-navigation-item',
        )}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'mobile-navigation-item')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'mobile-navigation-item')}
        ${SCALE.font(0.85, value => `font-size: ${value};`, undefined, 'mobile-navigation-item')}
        ${SCALE.mr(0.2, value => `margin-right: ${value};`, undefined, 'chevron-right')}
        ${SCALE.pr(1.3, value => `padding-right: ${value};`, undefined, 'has-chevron')}

        ${UNIT('mobile-navigation-item')}
      `}</style>
    </div>
  );
};

MobileNavigationGroup.displayName = 'HimalayaMobileNavigationGroup';
export default withScale(MobileNavigationGroup);
