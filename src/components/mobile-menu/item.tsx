'use client';
import React from 'react';
import useClasses from '../use-classes';
import { useMobileMenu } from '../use-mobile-menu/mobile-menu-context';
import useScale, { withScale } from '../use-scale';
import { INavigationItem } from './index';

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof INavigationItem>;
export type MobileNavigationItemProps = INavigationItem & NativeAttrs;

const NavigationItem = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<MobileNavigationItemProps>>(
  ({ icon, title, active = false, ...props }: React.PropsWithChildren<MobileNavigationItemProps>, ref: React.Ref<HTMLAnchorElement>) => {
    const { RESPONSIVE, SCALE_CLASSES, SCALER } = useScale();
    const { setIsEnabled } = useMobileMenu();

    const handleInstantCloseMenu = () => {
      setIsEnabled(false);
    };

    return (
      <a
        ref={ref}
        {...props}
        className={useClasses(
          'item',
          {
            'is-active': active,
          },
          SCALE_CLASSES,
        )}
        onClick={handleInstantCloseMenu}
      >
        <div className="icon-with-title">
          {icon && <span className="icon-holder">{icon}</span>}
          <span className="icon-title">{title}</span>
        </div>

        <style jsx>{`
          .item {
            display: flex;
            box-sizing: border-box;
            justify-content: flex-start;
            align-items: center;
            color: var(--color-background-400);
            transition:
              color,
              background-color 150ms linear;
            line-height: 1.25em;
            font-weight: 500;
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            width: 100%;

            &:hover {
              background: var(--color-background-900);
            }
          }

          .is-active {
            color: var(--color-foreground-1000);
            font-weight: bold;
          }

          .sub-group-inner .item {
            border-bottom: unset;
          }

          .icon-with-title {
            display: inline-flex;
            gap: 6px;
            align-items: center;
          }

          .icon-with-title span.icon-title {
            text-wrap: wrap;
            word-break: break-word;
          }

          .icon-holder {
            width: 16px;
            display: inline-flex;
            align-items: center;
          }

          :global(.icon-holder > *) {
            width: 100%;
          }

          ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'item')}
          ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'item')}
          ${RESPONSIVE.font(0.85, value => `font-size: ${value};`, undefined, 'item')}
          ${RESPONSIVE.padding(
            {
              top: 0.7,
              bottom: 0.7,
              left: 0.85,
              right: 0.85,
            },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'item',
          )}
          ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'item')}
          ${SCALER('item')}
        `}</style>
      </a>
    );
  },
);
NavigationItem.displayName = 'Item';
export default withScale(NavigationItem);
