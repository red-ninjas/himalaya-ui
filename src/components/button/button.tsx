'use client';

import React, { MouseEvent, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useButtonGroupContext } from '../button-group/button-group-context';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import useScale, { ScaleResponsiveParameter, responsiveCss, withScale } from '../use-scale';
import useTheme from '../use-theme';
import { addColorAlpha } from '../utils/color';
import { ButtonTypes } from '../utils/prop-types';
import ButtonLoading from './button-loading';
import ButtonDrip from './button.drip';
import { getButtonActivatedColors, getButtonColors, getButtonCursor, getButtonDripColor, getButtonHoverColors } from './styles';
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

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof bProps>;
export type ButtonProps = bProps & NativeAttrs;

const ButtonComponent = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
  (btnProps: ButtonProps, ref: React.Ref<HTMLButtonElement | null>) => {
    const theme = useTheme();
    const layoutRoot = useLayout();
    const { SCALES, RESPONSIVE } = useScale();
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

    const { bg, border, color } = useMemo(() => getButtonColors(theme.palette, filteredProps), [theme.palette, filteredProps]);
    const hover = useMemo(() => getButtonHoverColors(theme.palette, filteredProps), [theme.palette, filteredProps]);

    const activated = useMemo(() => getButtonActivatedColors(theme.palette, filteredProps), [theme.palette, filteredProps]);
    const { cursor, events } = useMemo(() => getButtonCursor(disabled, loading), [disabled, loading]);
    const dripColor = useMemo(() => getButtonDripColor(theme.palette), [theme.palette]);

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
        className={useClasses('btn padding margin height font auto', className)}
        disabled={disabled}
        onClick={clickHandler}
        {...props}
      >
        {loading && <ButtonLoading color={color} />}
        {childrenWithIcon}
        {dripShow && <ButtonDrip x={dripX} y={dripY} color={dripColor} onCompleted={dripCompletedHandle} />}
        <style jsx>{`
          .btn {
            box-sizing: border-box;
            display: inline-block;
            line-height: ${SCALES.lineHeight(0.875, SCALES.font(0.875))};
            border-radius: ${SCALES.r(1, theme.style.radius)};
            font-weight: 500;
            font-size: ${SCALES.font(0.875)};
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

            --ui-button-icon-padding: ${SCALES.pl(0.727)};
            --ui-button-height: ${SCALES.h(2.5)};
            --ui-button-color: ${color};
            --ui-button-bg: ${bg};
            --ui-button-border: ${border};
            --ui-button-hover-color: ${hover.color};
            --ui-button-hover-bg: ${hover.bg};
            --ui-button-hover-border-color: ${hover.border};
            --ui-button-hover-border-color-shade: ${addColorAlpha(hover.border, 0.2)};
            --ui-button-activated-color: ${activated.color};
            --ui-button-activated-bg: ${activated.bg};
            --ui-button-activated-border-color: ${activated.border};
            --ui-button-activated-border-color-shade: ${addColorAlpha(activated.border, 0.2)};

            height: ${SCALES.h(2.5)};
            border: 1px solid var(--ui-button-border);
            box-shadow: ${shadow ? theme.expressiveness.shadowSmall : `none`};

            color: var(--ui-button-color);
            background-color: var(--ui-button-bg);

            transition-property: border-color, background, color, transform, box-shadow;
            transition-duration: 0.15s;
            transition-timing-function: ease;
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

          ${responsiveCss(
            auto,
            'auto',
            layoutRoot.breakpoints,
            value => `min-width: ${value ? 'min-content' : SCALES.w(10.5)}; width: ${value ? 'auto' : 'initial'};`,
          )}

          ${RESPONSIVE.padding(
            { left: auto ? 1.15 : 1.375, right: auto ? 1.15 : 1.375, top: 0, bottom: 0 },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          )}

          ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`)}
          ${RESPONSIVE.font(0.875, value => `font-size: ${value};`)}
        `}</style>
      </button>
    );
  },
);

ButtonComponent.displayName = 'HimalayaButton';
const Button = withScale(ButtonComponent);
export default Button;
