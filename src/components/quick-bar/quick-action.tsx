'use client';
import useLayout from '../use-layout';
import { isCSSNumberValue } from '../utils/collections';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import Tooltip from '../tooltip';
import useClasses from '../use-classes';
import useScale, { customResponsiveAttribute } from '../use-scale';
import withScale from '../use-scale/with-scale';
import { COLOR_TYPES } from '../utils/prop-types';
import { QuickActionProps } from './share';

export const QuickBarAction: React.FC<PropsWithChildren<QuickActionProps>> = ({
  children,
  space = 0.625,
  href,
  tooltip,
  target = '_self',
  type = 'default' as COLOR_TYPES,
  exactMatch = true,
}) => {
  const { SCALER, RESPONSIVE } = useScale();
  const pathname = usePathname();
  const layout = useLayout();

  //const colors = useMemo(() => getColors(type, theme.palette), [type, theme.palette]);
  const isLinkActive = href ? (href ? (exactMatch ? pathname == href : pathname.startsWith(href)) : false) : false;

  return (
    <Tooltip placement="right" text={tooltip} p={0.3} font="12px" type="dark" leaveDelay={0} enterDelay={0}>
      <Link href={href || ''} passHref legacyBehavior>
        <a
          target={target}
          className={useClasses(
            'quick-action',
            {
              'is-active': isLinkActive,
            },
            type ? 'color-' + type : null,
          )}
        >
          {children}
          <style jsx>{`
            .quick-action {
              --quick-action-bg: var(--color-base);
              --quick-action-color: var(--color-contrast);
              --quick-action-active-bg: var(--color-shade);
              --quick-action-active-color: var(--color-contrast);
              --quick-action-hover-bg: var(--color-tint);
              --quick-action-hover-color: var(--color-contrast);
              --quick-action-border-color: var(--color-border);

              background: var(--quick-action-bg);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              font-size: 12px;
              color: var(--quick-action-color);
            }

            .quick-action.color-default {
              --quick-action-bg: var(--color-background-1000);
              --quick-action-color: var(--color-foreground-1000);
              --quick-action-active-bg: var(--color-foreground-1000);
              --quick-action-active-color: var(--color-background-1000);

              --quick-action-hover-bg: var(--color-background-900);
              --quick-action-hover-color: var(--color-foreground-1000);
              --quick-action-border-color: var(--color-primary-1000);
            }
            .quick-action.is-active {
              background: var(--quick-action-active-bg);
              color: var(--quick-action-active-color);

              &:hover {
                background: var(--quick-action-active-bg);
                color: var(--quick-action-active-color);
              }
            }

            .quick-action.is-active:before {
              content: ' ';
              position: absolute;
              background: var(--quick-action-border-color);
              width: 4px;
              height: 100%;
              left: calc((var(--quick-action-space) * -1) - 2px);
              border-radius: 0px var(--layout-radius) var(--layout-radius) 0px;
              overflow: hidden;
            }

            .quick-action:hover:before {
              content: ' ';
              position: absolute;
              background: var(--quick-action-border-color);
              width: 4px;
              height: 100%;
              left: calc((var(--quick-action-space) * -1) - 2px);
              border-radius: 0px var(--layout-radius) var(--layout-radius) 0px;
              overflow: hidden;
            }

            .quick-action:hover {
              background: var(--quick-action-hover-bg);
              color: var(--quick-action-hover-color);
            }

            ${RESPONSIVE.h(
              1,
              value => `height: ${value};`,
              'calc(var(--quickbar-width) - var(--quick-action-space) - var(--quick-action-space))',
              'quick-action',
            )}
            ${RESPONSIVE.w(
              1,
              value => `width: ${value};`,
              'calc(var(--quickbar-width) - var(--quick-action-space) - var(--quick-action-space))',
              'quick-action',
            )}

            ${customResponsiveAttribute(space, 'quick-action', layout.breakpoints, value =>
              !isCSSNumberValue(value) ? `--quick-action-space: ${value};` : `--quick-action-space: calc(var(--scale-unit-scale) * ${value})`,
            )}

            ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'quick-action')}
            ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'quick-action')}
            ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'quick-action')}

            ${SCALER('quick-action')}
          `}</style>
        </a>
      </Link>
    </Tooltip>
  );
};

QuickBarAction.displayName = 'HimalayaQuickBarAction';
export default withScale(QuickBarAction);
