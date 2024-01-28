'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { MouseEventHandler, PropsWithChildren } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { INavigationItem } from './index';

export interface NavigationItemProps extends INavigationItem {
  onClick?: () => void;
}

const NavigationItem: React.FC<PropsWithChildren<NavigationItemProps>> = ({ url = '/', ...props }) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const pathname = usePathname();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
    if (props.onClick) {
      e.preventDefault();
      props.onClick();
    }
  };

  return (
    <div className="item">
      <Link legacyBehavior passHref href={url || ''}>
        <a
          onClick={handleClick}
          className={useClasses('sub-item', {
            'is-active': pathname == url,
          })}
        >
          <div className="icon-with-title">
            {props.icon && <span className="icon-holder">{props.icon}</span>}
            <span className="icon-title">{props.title}</span>
          </div>
        </a>
      </Link>
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
          font-size: ${SCALES.font(0.75)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0.7)} ${SCALES.pr(0.85)} ${SCALES.pb(0.7)} ${SCALES.pl(0.85)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          border-bottom: 1px solid ${theme.palette.border};
        }

        .item:hover {
          background: ${theme.palette.accents_0};
        }

        .sub-group-inner .item {
          border-bottom: unset;
        }

        .item:hover {
          color: ${theme.palette.foreground};
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
        .sub-item {
          color: ${theme.palette.accents_5};
          font-weight: 500;
          font-size: ${SCALES.pt(0.9)};
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
        }

        .is-active {
          color: ${theme.palette.foreground};
          font-weight: bold;
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
    </div>
  );
};
NavigationItem.displayName = 'Item';
export default withScale(NavigationItem);
