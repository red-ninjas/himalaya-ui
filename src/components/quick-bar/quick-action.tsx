'use client';
import React from 'react';
import Tooltip from '../tooltip';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import useScale, { customResponsiveAttribute } from '../use-scale';
import withScale from '../use-scale/with-scale';
import { isCSSNumberValue } from '../utils/collections';
import { QuickActionProps } from './share';
import { UIColorTypes } from '../themes/presets';

const QuickBarAction = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<QuickActionProps>>(
  (
    { children, space = 0.625, tooltip, className, type = 'default' as UIColorTypes, active, ...props }: React.PropsWithChildren<QuickActionProps>,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const { UNIT, SCALE, CLASS_NAMES } = useScale();
    const layout = useLayout();

    return (
      <Tooltip placement="right" text={tooltip} p={0.3} type="dark" leaveDelay={0} enterDelay={0}>
        <a
          ref={ref}
          {...props}
          className={useClasses(
            'quick-action',
            {
              'is-active': active,
            },
            CLASS_NAMES,
            className,
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

            ${SCALE.h(1, value => `height: ${value};`, 'calc(var(--quickbar-width) - var(--quick-action-space) - var(--quick-action-space))', 'quick-action')}
            ${SCALE.w(1, value => `width: ${value};`, 'calc(var(--quickbar-width) - var(--quick-action-space) - var(--quick-action-space))', 'quick-action')}

            ${customResponsiveAttribute(space, 'quick-action', layout.breakpoints, value =>
              !isCSSNumberValue(value) ? `--quick-action-space: ${value};` : `--quick-action-space: calc(var(--scale-unit-scale) * ${value})`,
            )}

            ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'quick-action')}
            ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'quick-action')}
            ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'quick-action')}

            ${UNIT('quick-action')}
          `}</style>
        </a>
      </Tooltip>
    );
  },
);

QuickBarAction.displayName = 'HimalayaQuickBarAction';
export default withScale(QuickBarAction);
