'use client';

import React, { MouseEvent, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useButtonGroupContext } from '../button-group/button-group-context';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import useScale, { ScaleResponsiveParameter, customResponsiveAttribute, withScale } from '../use-scale';
import useTheme from '../use-theme';
import { ButtonTypes } from '../utils/prop-types';
import ButtonLoading from './button-loading';
import ButtonDrip from './button.drip';
import { getButtonCursor } from './styles';
import { filterPropsWithGroup, getButtonChildrenWithIcon } from './utils';

export interface bProps {
  type?: ButtonTypes;
  ghost?: boolean;
  loading?: boolean;
  shadow?: boolean;
  auto?: ScaleResponsiveParameter<boolean>;
  effect?: boolean;
  disabled?: boolean;
  htmlType?: React.ButtonHTMLAttributes<any>['type'];
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof bProps>;
export type ButtonProps = bProps & NativeAttrs;

const ButtonComponent = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
  (btnProps: ButtonProps, ref: React.Ref<HTMLButtonElement | null>) => {
    const theme = useTheme();
    const layoutRoot = useLayout();
    const { SCALER, RESPONSIVE } = useScale();
    const buttonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => buttonRef.current);

    const [dripShow, setDripShow] = useState<boolean>(false);
    const [dripX, setDripX] = useState<number>(0);
    const [dripY, setDripY] = useState<number>(0);
    const groupConfig = useButtonGroupContext();
    const filteredProps = filterPropsWithGroup(btnProps, groupConfig);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      children,
      disabled = false,
      type = 'default' as ButtonTypes,
      loading = false,
      shadow = false,
      ghost = false,
      effect = true,
      onClick,
      auto = false,
      icon,
      htmlType = 'button' as React.ButtonHTMLAttributes<any>['type'],
      iconRight,
      className = '',
      ...props
    } = filteredProps;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    const { cursor, events } = useMemo(() => getButtonCursor(disabled, loading), [disabled, loading]);

    /* istanbul ignore next */
    const dripCompletedHandle = () => {
      setDripShow(false);
      setDripX(0);
      setDripY(0);
    };

    const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      const showDrip = !shadow && !ghost && effect;
      /* istanbul ignore next */
      if (showDrip && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDripShow(true);
        setDripX(event.clientX - rect.left);
        setDripY(event.clientY - rect.top);
      }

      onClick && onClick(event);
    };

    const childrenWithIcon = useMemo(
      () =>
        getButtonChildrenWithIcon(layoutRoot.breakpoints, auto, children, {
          icon,
          iconRight,
        }),
      [auto, children, icon, iconRight],
    );

    return (
      <button
        ref={buttonRef}
        type={htmlType}
        className={useClasses('btn', className, disabled, type ? 'color-' + type : null, { ghost })}
        disabled={disabled}
        onClick={clickHandler}
        {...props}
      >
        {loading && <ButtonLoading />}
        {childrenWithIcon}
        {dripShow && <ButtonDrip x={dripX} y={dripY} onCompleted={dripCompletedHandle} />}
        <style jsx>{`
          .btn {
            box-sizing: border-box;
            display: inline-block;
            font-weight: 500;
            user-select: none;
            outline: none;
            justify-content: center;
            text-align: center;
            white-space: nowrap;
            transition:
              background-color 200ms ease 0ms,
              box-shadow 200ms ease 0ms,
              border 200ms ease 0ms,
              color 200ms ease 0ms;
            position: relative;
            overflow: hidden;

            cursor: ${cursor};
            pointer-events: ${events};

            --ui-button-color: var(--color-contrast);
            --ui-button-bg: var(--color-base);
            --ui-button-border: var(--color-border);
            --ui-button-hover-color: var(--color-contrast);
            --ui-button-hover-bg: var(--color-shade);
            --ui-button-hover-border-color: var(--color-shade-border);
            --ui-button-activated-color: var(--color-contrast);
            --ui-button-activated-bg: var(--color-tint);
            --ui-button-activated-border-color: var(--color-tint-border);

            border: 1px solid var(--ui-button-border);
            box-shadow: ${shadow ? theme.expressiveness.shadowSmall : `none`};

            color: var(--ui-button-color);
            background-color: var(--ui-button-bg);

            transition-property: border-color, background, color, transform, box-shadow;
            transition-duration: 0.15s;
            transition-timing-function: ease;

            &.ghost {
              --ui-button-color: var(--color-base);
              --ui-button-bg: transparent;
            }
            &.ghost.color-default {
              --ui-button-color: var(--color-contrast);
              --ui-button-bg: var(--color-base);
            }
          }

          .btn:disabled,
          .btn[disabled],
          .btn.disabled {
            --ui-button-color: var(--color-foreground-500);
            --ui-button-bg: var(--color-background-900);
            --ui-button-border: var(--color-border-1000);
            --ui-button-hover-color: var(--color-foreground-500);
            --ui-button-hover-bg: var(--color-background-900);
            --ui-button-hover-border-color: var(--color-border-1000);
            --ui-button-activated-color: var(--color-foreground-900);
            --ui-button-activated-bg: var(--color-background-500);
            --ui-button-activated-border-color: var(--color-border-1000);
          }

          .btn:hover:not([disabled]) {
            color: var(--ui-button-hover-color);
            --ui-button-color: var(--ui-button-hover-color);
            background-color: var(--ui-button-hover-bg);
            border-color: var(--ui-button-hover-border-color);

            cursor: ${cursor};
            pointer-events: ${events};
            box-shadow: ${shadow ? theme.expressiveness.shadowMedium : `none`};
          }

          .btn:focus {
            color: var(--ui-button-activated-color);
            --ui-button-color: var(--ui-button-activated-color);
            background-color: var(--ui-button-activated-bg);
            border-color: var(--ui-button-activated-border-color);

            cursor: ${cursor};
            pointer-events: ${events};
            box-shadow: ${shadow ? theme.expressiveness.shadowMedium : `none`};
          }

          .btn :global(.text) {
            position: relative;
            z-index: 1;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            line-height: inherit;
          }

          .btn :global(.text p),
          .btn :global(.text pre),
          .btn :global(.text div) {
            margin: 0;
          }

          ${customResponsiveAttribute(
            auto,
            'btn',
            layoutRoot.breakpoints,
            value => `min-width: ${value ? 'min-content' : `--ui-button-min-width`}; width: ${value ? 'auto' : 'initial'};`,
          )}

          ${RESPONSIVE.padding(
            { left: auto ? 1.15 : 1.375, right: auto ? 1.15 : 1.375, top: 0, bottom: 0 },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'btn',
          )}

          ${RESPONSIVE.pl(0.727, value => `--ui-button-icon-padding: ${value};`, undefined, 'btn')}
          ${RESPONSIVE.w(10.5, value => `--ui-button-min-width: ${value};`, undefined, 'btn')}
          ${RESPONSIVE.h(2.5, value => `height: ${value}; --ui-button-height: ${value};`, undefined, 'btn')}
          ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'btn')}
          ${RESPONSIVE.font(0.875, value => `font-size: ${value}; --button-font-size: ${value};`, undefined, 'btn')}
          ${RESPONSIVE.lineHeight(0.875, value => `line-height: ${value};`, `var(--button-font-size)`, 'btn')}
          ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'btn')}

          ${SCALER('btn')}
        `}</style>
      </button>
    );
  },
);

ButtonComponent.displayName = 'HimalayaButton';
const Button = withScale(ButtonComponent);
export default Button;
