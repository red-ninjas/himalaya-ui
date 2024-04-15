'use client';
import React from 'react';
import { INavigationItem } from '.';
import Popover from '../popover';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export interface NavigationSubItemProps extends INavigationItem {
  onClick?: () => void;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NavigationSubItemProps>;
export type NavigationPropsExternal = NavigationSubItemProps & NativeAttrs;

const NavigationSubItem = React.forwardRef<HTMLAnchorElement, NavigationPropsExternal>(
  ({ icon, title, desc, ...props }: NavigationPropsExternal, ref: React.Ref<HTMLAnchorElement>) => {
    const { UNIT, CLASS_NAMES, SCALE } = useScale();
    return (
      <>
        <Popover.Item p="6px">
          <a ref={ref} className={useClasses('sub-item', CLASS_NAMES)} {...props}>
            <div className="icon-with-title">
              {icon && <span className="icon-holder">{icon}</span>}
              <span>{title}</span>
            </div>
            {desc && <div className="description">{desc}</div>}
          </a>
        </Popover.Item>
        <style jsx>{`
          .description {
            font-weight: 14px;
            color: var(--color-background-400);
            overflow-wrap: anywhere;
          }
          .sub-item {
            color: var(--color-foreground-1000);
            font-weight: 500;
            min-width: 120px;
            gap: 8px;
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
          }

          .icon-holder {
            width: 16px;
            display: inline-flex;
            align-items: center;
          }

          :global(.icon-holder > *) {
            width: 100%;
          }
          .sub-item:hover {
            background-color: rgba(var(--color-background-700-rgb), 0.5);
            border-radius: 5px;
          }
          .icon-with-title {
            display: inline-flex;
            gap: 6px;
            align-items: center;
          }

          ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'sub-item')}
          ${SCALE.padding(
            {
              top: 0.375,
              bottom: 0.375,
              left: 0.75,
              right: 0.75,
            },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'sub-item',
          )}

          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'sub-item')}
          ${UNIT('sub-item')}
        `}</style>
      </>
    );
  },
);
NavigationSubItem.displayName = 'SubItem';
export default withScale(NavigationSubItem);
