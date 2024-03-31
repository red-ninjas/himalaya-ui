'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import useScale from '../use-scale';
import useTheme from '../use-theme';
import CssTransition from '../shared/css-transition';
import { isChildElement } from '../utils/collections';
import { DrawerPlacement, getDrawerTransform } from './helper';
import useClasses from '../use-classes';

interface Props {
  className?: string;
  visible?: boolean;
  placement?: DrawerPlacement;
  leaveTime?: number;
  enterTime?: number;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type DrawerWrapperProps = Props & NativeAttrs;

const DrawerWrapper: React.FC<React.PropsWithChildren<DrawerWrapperProps>> = ({
  className = '',
  children,
  visible = false,
  placement = 'right' as DrawerPlacement,
  leaveTime = 300,
  enterTime = 300,
  ...props
}: React.PropsWithChildren<DrawerWrapperProps>) => {
  const theme = useTheme();
  const { SCALE, CLASS_NAMES, UNIT } = useScale();
  const modalContent = useRef<HTMLDivElement>(null);
  const tabStart = useRef<HTMLDivElement>(null);
  const tabEnd = useRef<HTMLDivElement>(null);
  const transform = useMemo(() => getDrawerTransform(placement), [placement]);
  const classes = useClasses('wrapper', placement, className, CLASS_NAMES);

  useEffect(() => {
    if (!visible) return;
    const activeElement = document.activeElement;
    const isChild = isChildElement(modalContent.current, activeElement);
    if (isChild) return;
    tabStart.current && tabStart.current.focus();
  }, [visible]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isTabDown = event.keyCode === 9;
    if (!visible || !isTabDown) return;
    const activeElement = document.activeElement;
    if (event.shiftKey) {
      if (activeElement === tabStart.current) {
        tabEnd.current && tabEnd.current.focus();
      }
    } else {
      if (activeElement === tabEnd.current) {
        tabStart.current && tabStart.current.focus();
      }
    }
  };

  return (
    <CssTransition name="wrapper" visible={visible} clearTime={300}>
      <div className={classes} role="dialog" tabIndex={-1} onKeyDown={onKeyDown} ref={modalContent} {...props}>
        <div tabIndex={0} className="hide-tab start" aria-hidden="true" ref={tabStart} />
        {children}
        <div tabIndex={0} className="hide-tab end" aria-hidden="true" ref={tabEnd} />
        <style jsx>{`
          .wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            max-width: 100%;
            vertical-align: middle;
            overflow: auto;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            background-color: var(--color-background-1000);
            color: var(--color-foreground-1000);
            box-shadow: ${theme.expressiveness.shadowLarge};
            opacity: 0;
            outline: none;
            transform: ${transform.initial};
            transition:
              opacity,
              transform ${enterTime}ms cubic-bezier(0.1, 0.6, 0.1, 1);

            border-radius: var(--drawer-radius);
          }

          .top {
            bottom: auto;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
          .left {
            right: auto;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          .bottom {
            top: auto;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
          .right {
            left: auto;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .wrapper-enter {
            opacity: 0;
            transform: ${transform.hidden};
          }
          .wrapper-enter-active {
            opacity: 1;
            transform: ${transform.visible};
          }
          .wrapper-leave {
            opacity: 1;
            transform: ${transform.visible};
            transition:
              opacity,
              transform ${leaveTime}ms cubic-bezier(0.1, 0.2, 0.1, 1);
          }
          .wrapper-leave-active {
            opacity: 0.4;
            transform: ${transform.hidden};
          }
          .hide-tab {
            outline: none;
            overflow: hidden;
            width: 0;
            height: 0;
            opacity: 0;
          }

          ${SCALE.r(2, value => `--drawer-radius: ${value};`, undefined, 'wrapper')}
          ${SCALE.font(1, value => `font-size: ${value};`, undefined, 'wrapper')}

          ${SCALE.h(1, value => `--modal-height: ${value};`, 'auto', 'wrapper')}
          ${SCALE.w(1, value => `--modal-width: ${value};`, '100%', 'wrapper')}

          ${SCALE.padding(
            1.3125,
            value =>
              `padding: ${value.top} ${value.right} ${value.bottom} ${value.left}; --modal-wrapper-padding-left: ${value.left}; --modal-wrapper-padding-right: ${value.right}; `,
            undefined,
            'wrapper',
          )}
          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'wrapper')}

          ${SCALE.w(1, value => `width: ${value};`, '100%', 'top')}
          ${SCALE.h(1, value => `height: ${value};`, 'auto', 'top')}
          ${SCALE.w(1, value => `width: ${value};`, '100%', 'bottom')}
          ${SCALE.h(1, value => `height: ${value};`, 'auto', 'bottom')}

          ${SCALE.w(1, value => `width: ${value};`, 'auto', 'left')}
          ${SCALE.h(1, value => `height: ${value};`, '100%', 'left')}
          ${SCALE.w(1, value => `width: ${value};`, 'auto', 'right')}
          ${SCALE.h(1, value => `height: ${value};`, '100%', 'right')}
          ${UNIT('wrapper')}
        `}</style>
      </div>
    </CssTransition>
  );
};

DrawerWrapper.displayName = 'HimalayaDrawerWrapper';
export default DrawerWrapper;
