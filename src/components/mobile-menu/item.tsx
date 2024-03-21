'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { INavigationItem } from './index';
import { useMobileMenu } from '../use-mobile-menu/mobile-menu-context';

type NativeAttrs = Omit<React.HTMLAttributes<HTMLAnchorElement>, keyof INavigationItem>;
export type MobileNavigationItemProps = INavigationItem & NativeAttrs;

const NavigationItem: React.FC<PropsWithChildren<MobileNavigationItemProps>> = ({ url = '/', icon, title, ...props }) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const pathname = usePathname();
  const { setIsEnabled } = useMobileMenu();

  const handleInstantCloseMenu = () => {
    setIsEnabled(false);
  };

  return (
    <Link legacyBehavior href={url || ''}>
      <a
        {...props}
        className={useClasses('item', {
          'is-active': pathname == url,
        })}
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
            color: ${theme.palette.accents_5};
            transition:
              color,
              background-color 150ms linear;
            line-height: 1.25em;
            font-size: ${SCALES.font(0.85)};
            width: ${SCALES.w(1, 'auto')};
            height: ${SCALES.h(1, 'auto')};
            padding: ${SCALES.pt(0.7)} ${SCALES.pr(0.85)} ${SCALES.pb(0.7)} ${SCALES.pl(0.85)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};

            font-weight: 500;
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            width: 100%;

            &:hover {
              background: ${theme.palette.accents_0};
            }
          }

          .is-active {
            color: ${theme.palette.foreground};
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
        `}</style>
      </a>
    </Link>
  );
};
NavigationItem.displayName = 'Item';
export default withScale(NavigationItem);
