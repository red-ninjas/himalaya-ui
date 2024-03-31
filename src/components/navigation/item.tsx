'use client';
import React, { MouseEvent as ReactMouseEvent, useState } from 'react';
import { INavigationItem } from '.';
import { ReactiveDomReact } from '../utils/layouts';

import ChevronUp from 'components/icons/chevronUp';
import Popover from '../popover';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { useNavigation } from './navigation-context';

interface NavigationItemProps extends INavigationItem {
  columns?: number;
  transcluent?: boolean;
  offset?: number;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NavigationItemProps>;
export type NavigationPropsExternal = NavigationItemProps & NativeAttrs;

const NavigationItem = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<NavigationPropsExternal>>(
  (
    { children, columns = 2, transcluent = true, active = false, offset = 6, title, ...props }: React.PropsWithChildren<NavigationPropsExternal>,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const { onMouseOver } = useNavigation();
    const [isPopoverVisibile, setIsPopoverVisibile] = useState<boolean>(false);
    const [isHover, setIsHover] = useState<boolean>(false);
    const childExist = children !== undefined;
    const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();

    const btnClass = useClasses(
      'menu-item',
      {
        active,
        'chevron-active': isPopoverVisibile,
        'is-hover': isHover,
      },
      SCALE_CLASSES,
    );

    const childs = () => (
      <div className="sub-child-grid">
        {children}
        <style jsx>{`
          .sub-child-grid {
            display: inline-grid;
            height: auto;
            grid-template-columns: repeat(${columns || '1'}, 1fr);
          }
        `}</style>
      </div>
    );

    const onChildMouseOver = (ev: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      if (ev.target) {
        const coreRect = (ev.target as HTMLDivElement).getBoundingClientRect();
        const newValue: ReactiveDomReact = {
          left: coreRect.left,
          right: coreRect.right,
          rect: ev.target as HTMLDivElement,
          deactive: () => setIsHover(false),
          elementTop: coreRect.top,
          height: coreRect.height,
          width: coreRect.width,
          top: coreRect.top,
        };

        onMouseOver(newValue);
        setIsHover(true);
      }
    };

    return (
      <a {...props} className={useClasses('navigation-item', btnClass, props.className)} ref={ref}>
        {childExist ? (
          <Popover
            onVisibleChange={visible => setIsPopoverVisibile(visible)}
            className="menu-popover"
            offset={offset}
            placement="bottomStart"
            trigger="hover"
            hideArrow={true}
            portalClassName={useClasses('menu-popover-item', {
              'transcluent-popover': transcluent,
            })}
            enterDelay={0}
            leaveDelay={0}
            content={childs}
          >
            <div
              onMouseLeave={() => setIsHover(false)}
              onMouseOut={() => setIsHover(false)}
              onMouseOver={event => onChildMouseOver(event)}
              className="navigation-title has-chevron"
            >
              <span className="navigation-title-inner">{title}</span>
              <span className="chevron-outer">
                <span className={useClasses('chevron', { rotated: isPopoverVisibile })}>
                  <ChevronUp />
                </span>
              </span>
            </div>
          </Popover>
        ) : (
          <div
            onMouseLeave={() => setIsHover(false)}
            onMouseOut={() => setIsHover(false)}
            onMouseOver={event => onChildMouseOver(event)}
            className="navigation-title"
          >
            <span className="navigation-title-inner">{title}</span>
          </div>
        )}
        <style jsx>{`
          .navigation-item :global(.menu-popover) {
            display: inline-flex !important;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 0;
            box-shadow: none;
          }

          .navigation-title {
            display: inline-flex;
            position: relative;
            align-items: center;
            align-self: center;

            * {
              pointer-events: none;
            }
          }

          .navigation-item {
            display: inline-flex;
            position: relative;
            height: auto;
            align-items: center;
          }

          .chevron-outer {
            position: absolute;
            height: 100%;
            bottom: 0;
            display: flex;
            align-items: center;
            right: calc(var(--item-right) * 0.5);
          }
          .has-chevron {
            padding-right: calc(var(--item-right) * 2.5) !important;
          }

          .chevron {
            transform: rotate(180deg);
            transition: all 0.3s;
            display: inline-flex;
            height: var(--chevron-size);
            width: var(--chevron-size);

            align-items: center;
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
            color: var(--color-background-400);
            user-select: none;
            display: flex;
            align-items: center;
            user-select: none;
            line-height: normal;
            font-weight: 500;
            z-index: 1;
            transition: color 0.2s ease;
          }

          :global(.menu-item) span.label {
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

          .menu-item:hover {
            color: var(--color-foreground-1000);
          }

          .menu-item.active {
            color: var(--color-foreground-1000);
            font-weight: 600;
          }

          .menu-item.chevron-active {
            color: var(--color-foreground-1000);
          }

          :global(.tooltip-content.menu-popover-item > .inner) {
            padding: 0 !important;
          }

          :global(.tooltip-content.menu-popover-item) {
            max-width: 600px;
          }

          ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'menu-item')}
          ${RESPONSIVE.h(1, value => `height: ${value};`, '100%', 'menu-item')}
          ${RESPONSIVE.font(0.9, value => `font-size: ${value};`, undefined, 'menu-item')}
          ${RESPONSIVE.font(1, value => `--chevron-size: ${value};`, undefined, 'chevron')}
          ${RESPONSIVE.padding(
            {
              top: 0.5,
              bottom: 0.5,
              left: 0.7,
              right: 0.7,
            },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left}; --item-right: ${value.right};`,
            undefined,
            'navigation-title',
          )}
          ${RESPONSIVE.margin(
            {
              top: 0,
              left: 0.2,
              right: 0.2,
              bottom: 0,
            },
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'menu-item',
          )}
          ${SCALER('menu-item')}
        `}</style>
      </a>
    );
  },
);
NavigationItem.displayName = 'HimalayaNavigationItem';
export default withScale(NavigationItem);
