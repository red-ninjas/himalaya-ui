'use client';
import Tooltip from '../tooltip';
import Link from 'next/link';
import React, { PropsWithChildren, useMemo } from 'react';
import { QuickActionProps } from './share';
import useScale from '../use-scale';
import withScale from '../use-scale/with-scale';
import useTheme from '../use-theme';
import { getColors } from './get-color';
import { QuickActionTypes } from '../utils/prop-types';
import { usePathname } from 'next/navigation';
import useClasses from '../use-classes';

export const QuickBar: React.FC<PropsWithChildren<QuickActionProps>> = ({
  children,
  radius,
  highlightLeft = -8,
  href,
  tooltip,
  target = '_self',
  type = 'default' as QuickActionTypes,
  exactMatch = true,
}) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const pathname = usePathname();

  const colors = useMemo(() => getColors(type, theme.palette), [type, theme.palette]);
  const isLinkActive = href ? (href ? (exactMatch ? pathname == href : pathname.startsWith(href)) : false) : false;

  return (
    <Tooltip placement="right" text={tooltip} padding={0.3} font="12px" type="dark" leaveDelay={0} enterDelay={0}>
      <Link href={href || ''} passHref legacyBehavior>
        <a
          target={target}
          className={useClasses('quick-action', {
            'is-active': isLinkActive,
          })}
        >
          {children}
          <style jsx>{`
            .quick-action {
              width: ${SCALES.height(1, '40px')};
              height: ${SCALES.width(1, '40px')};
              border-radius: ${radius === undefined ? theme.style.radius : radius + 'px'};
              background: ${colors.bgColor};
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
              margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
              font-size: 12px;
              color: ${colors.color};
            }

            .quick-action.is-active {
              background: ${colors.bgColorHover};
              color: ${colors.colorHover};
            }

            .quick-action.is-active:before {
              content: ' ';
              position: absolute;
              background: ${theme.palette.primary.value};
              width: 4px;
              height: 100%;
              left: calc(${highlightLeft}px - 2px);
              border-radius: 0px ${theme.style.radius} ${theme.style.radius} 0px;
              overflow: hidden;
            }

            .quick-action:hover:before {
              content: ' ';
              position: absolute;
              background: ${theme.palette.primary.value};
              width: 4px;
              height: 100%;
              left: calc(${highlightLeft}px - 2px);
              border-radius: 0px ${theme.style.radius} ${theme.style.radius} 0px;
              overflow: hidden;
            }

            .quick-action:hover {
              background: ${colors.bgColorHover};
              color: ${colors.colorHover};
            }
          `}</style>
        </a>
      </Link>
    </Tooltip>
  );
};

QuickBar.displayName = 'HimalayaQuickBar';
export default withScale(QuickBar);
