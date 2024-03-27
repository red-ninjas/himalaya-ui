'use client';

import React, { MouseEvent, useCallback, useRef, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { pickChild, pickChildByProps } from '../utils/collections';
import { COLOR_TYPES } from '../utils/prop-types';
import useClickAway from '../utils/use-click-away';
import { ButtonDropdownContext } from './button-dropdown-context';
import ButtonDropdownItem from './button-dropdown-item';
import ButtonDropdownIcon from './icon';

export type ButtonDropdownTypes = COLOR_TYPES;

interface Props {
  type?: ButtonDropdownTypes;
  auto?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type ButtonDropdownProps = Props & NativeAttrs;

const stopPropagation = (event: MouseEvent<HTMLElement>) => {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
};

const ButtonDropdownComponent: React.FC<React.PropsWithChildren<ButtonDropdownProps>> = ({
  children,
  type = 'default',
  auto,
  className,
  disabled,
  loading,
  icon,
  ...props
}) => {
  const { SCALER, RESPONSIVE, HIDER } = useScale();
  const ref = useRef<HTMLDivElement>(null);
  const itemChildren = pickChild(children, ButtonDropdownItem)[1];
  const [itemChildrenWithoutMain, mainItemChildren] = pickChildByProps(itemChildren, 'main', true);
  const [visible, setVisible] = useState<boolean>(false);
  const clickHandler = useCallback(
    (event: MouseEvent<HTMLDetailsElement>) => {
      event.preventDefault();
      stopPropagation(event);
      if (disabled || loading) return;
      setVisible(!visible);
    },
    [visible],
  );

  const initialValue = {
    type,
    auto,
    disabled,
    loading,
  };

  useClickAway(ref, () => setVisible(false));

  return (
    <ButtonDropdownContext.Provider value={initialValue}>
      <div
        ref={ref}
        className={useClasses('btn-dropdown', className, type ? 'color-' + type : null, { disabled, loading }, HIDER)}
        onClick={stopPropagation}
        {...props}
      >
        {mainItemChildren}
        <details open={visible}>
          <summary onClick={clickHandler}>
            <div className="dropdown-box">{icon ? <span className="dropdown-icon">{icon}</span> : <ButtonDropdownIcon />}</div>
          </summary>
          <div className="content">{itemChildrenWithoutMain}</div>
        </details>
        <style jsx>{`
          .btn-dropdown {
            display: inline-flex;
            position: relative;
            box-sizing: border-box;

            --ui-dropdown-color: var(--color-contrast);
            --ui-button-bg: var(--color-base);
            --ui-button-border: var(--color-border);
            --ui-button-hover-color: var(--color-contrast);
            --ui-button-hover-bg: var(--color-shade);
            --ui-button-hover-border-color: var(--color-shade-border);
            --ui-button-activated-color: var(--color-contrast);
            --ui-button-activated-bg: var(--color-tint);
            --ui-button-activated-border-color: var(--color-tint-border);

            border-radius: var(--ui-dropdown-radius);
            border: 1px solid var(--ui-button-border);

            transition-property: border-color, background, color, transform, box-shadow;
            transition-duration: 0.15s;
            transition-timing-function: ease;

            &:hover {
              border-color: var(--ui-button-hover-border-color);
            }
          }

          .btn-dropdown > :global(button) {
            border-top-left-radius: var(--layout-radius);
            border-bottom-left-radius: var(--layout-radius);
            border-right: 1px solid var(--ui-button-border);
          }

          details {
            border-top-right-radius: var(--layout-radius);
            border-bottom-right-radius: var(--layout-radius);
            overflow: hidden;
          }

          .dropdown-box {
            height: var(--ui-dropdown-height);
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
          }

          summary {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            list-style: none;
            outline: none;
            color: var(--ui-dropdown-color);
            height: var(--ui-dropdown-height);
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            padding: 0 1px;

            transition-property: border-color, background, color, transform, box-shadow;
            transition-duration: 0.15s;
            transition-timing-function: ease;

            background-color: var(--ui-button-bg);

            &:hover {
              border-color: var(--ui-button-hover-border-color);
              background-color: var(--ui-button-hover-bg);
            }
          }

          .btn-dropdown.disabled {
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

          .btn-dropdown.disabled,
          .btn-dropdown.loading {
            summary {
              cursor: not-allowed;
            }
          }

          .content {
            position: absolute;
            right: 0;
            left: 0;
            z-index: 90;
            width: 100%;
            border-radius: var(--ui-dropdown-radius);
            transform: translateY(var(--layout-gap-half));
            background-color: var(--color-background-1000);
            box-shadow: 0 0 0 1px rgba(var(--color-background-800-rgb)}, 1);
          }

          .content > :global(button:first-of-type) {
            border-top-left-radius: var(--layout-radius);
            border-top-right-radius: var(--layout-radius);
          }

          .content > :global(button:last-of-type) {
            border-bottom-left-radius: var(--layout-radius);
            border-bottom-right-radius: var(--layout-radius);
          }

          .dropdown-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            transform: scale(0.6);
            height: var(--ui-dropdown-height);
            width: var(--ui-dropdown-height);
            color: var(--ui-dropdown-color);
          }

          ${RESPONSIVE.r(1, value => `--ui-dropdown-radius: ${value};`, 'var(--layout-radius)', 'btn-dropdown')}
          ${RESPONSIVE.h(2.5, value => `--ui-dropdown-height: ${value};`, undefined, 'btn-dropdown')}
          ${RESPONSIVE.w(10.5, value => `--ui-dropdown-min-width: ${auto ? 'min-content' : value};`, undefined, 'btn-dropdown')}
          ${RESPONSIVE.font(0.875, value => `--ui-dropdown-font-size: ${value};`, undefined, 'btn-dropdown')}
          ${RESPONSIVE.lineHeight(0.875, value => `line-height: ${value};`, `var(--ui-dropdown-font-size)`, 'btn-dropdown')}

          ${RESPONSIVE.padding(
            { left: auto ? 1.15 : 1.375, right: auto ? 1.15 : 1.375, top: 0, bottom: 0 },
            value => `--ui-dropdown-padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'btn-dropdown',
          )}

          ${SCALER('btn-dropdown')}
        `}</style>
      </div>
    </ButtonDropdownContext.Provider>
  );
};

ButtonDropdownComponent.displayName = 'HimalayaButtonDropdown';
const ButtonDropdown = withScale(ButtonDropdownComponent);
export default ButtonDropdown;
