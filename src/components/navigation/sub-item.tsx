'use client';
import React from 'react';
import { INavigationItem } from '.';
import Popover from '../popover';

export interface NavigationSubItemProps extends INavigationItem {
  onClick?: () => void;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NavigationSubItemProps>;
export type NavigationPropsExternal = NavigationSubItemProps & NativeAttrs;

const NavigationSubItem = React.forwardRef<HTMLAnchorElement, NavigationPropsExternal>(
  ({ icon, title, desc, ...props }: NavigationPropsExternal, ref: React.Ref<HTMLAnchorElement>) => {
    return (
      <>
        <Popover.Item p="6px">
          <a ref={ref} className="sub-item" {...props}>
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
            padding: 6px 12px;
            font-size: 14px;
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
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
        `}</style>
      </>
    );
  },
);
NavigationSubItem.displayName = 'SubItem';
export default NavigationSubItem;
