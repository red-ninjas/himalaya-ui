'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { TabsInternalCellProps, useTabsContext } from './tabs-context';
import useTheme from '../use-theme';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  label: string | React.ReactNode;
  value: string;
  disabled?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TabsItemProps = Props & NativeAttrs;

const TabsItemComponent: React.FC<React.PropsWithChildren<TabsItemProps>> = ({
  children,
  value,
  label,
  disabled = false,
  style,
  ...props
}: React.PropsWithChildren<TabsItemProps>) => {
  const { RESPONSIVE } = useScale();
  const { register, currentValue } = useTabsContext();
  const isActive = useMemo(() => currentValue === value, [currentValue, value]);

  const TabsInternalCell: React.FC<TabsInternalCellProps> = ({ onClick, onMouseOver, activeClassName, activeStyle, hideBorder }) => {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement | null>(null);
    const { currentValue } = useTabsContext();
    const active = currentValue === value;
    const classes = useClasses('tab padding margin font width height', {
      active,
      disabled,
      [activeClassName!]: active,
      'hide-border': hideBorder,
    });
    const clickHandler = () => {
      if (disabled) return;
      onClick && onClick(value);
    };

    return (
      <div
        ref={ref}
        {...props}
        className={classes}
        role="button"
        onMouseOver={onMouseOver}
        onClick={clickHandler}
        style={active ? { ...style, ...activeStyle } : style}
      >
        {label}
        <style jsx>{`
          .tab {
            position: relative;
            box-sizing: border-box;
            cursor: pointer;
            outline: 0;
            text-transform: capitalize;
            white-space: nowrap;
            background-color: transparent;
            color: var(--theme-color-background-400);
            user-select: none;
            display: flex;
            align-items: center;
            line-height: normal;
          }
          .tab:hover {
            color: ${theme.palette.foreground.hex_1000};
          }
          .tab:after {
            position: absolute;
            content: '';
            bottom: -1px;
            left: 0;
            right: 0;
            width: 100%;
            height: 2px;
            border-radius: 4px;
            transform: scaleX(0.75);
            background-color: ${theme.palette.primary.hex_1000};
            transition:
              opacity,
              transform 200ms ease-in;
            opacity: 0;
          }
          .active:after {
            opacity: 1;
            transform: scaleX(1);
          }
          .tab :global(svg) {
            max-height: 1em;
            margin-right: 5px;
          }
          .tab:first-of-type {
            margin-left: 0;
          }
          .active {
            color: ${theme.palette.foreground.hex_1000};
          }
          .disabled {
            color: ${theme.palette.background.hex_600};
            cursor: not-allowed;
          }
          .hide-border:before {
            display: block;
            content: ${label};
            font-weight: 500;
            height: 0;
            overflow: hidden;
            visibility: hidden;
          }
          .hide-border:after {
            display: none;
          }
          .hide-border.active {
            font-weight: 500;
          }

          ${RESPONSIVE.padding(
            0.875,
            value =>
              `padding: ${value.top} ${value.right} ${value.bottom} ${value.left}; --tabs-item-hover-left: calc(-1 * ${value.left}); --tabs-item-hover-right: calc(-1 * ${value.right});`,
          )}
          ${RESPONSIVE.margin(
            {
              top: 0,
              left: 0.2,
              right: 0.2,
              bottom: 0,
            },
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left}; `,
          )}
          ${RESPONSIVE.font(0.875, value => `font-size: ${value};`)}
          ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto')}
          ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto')}
        `}</style>
      </div>
    );
  };
  TabsInternalCell.displayName = 'HimalayaTabsInternalCell';

  useEffect(() => {
    register && register({ value, cell: TabsInternalCell });
  }, [value, label, disabled]);

  /* eslint-disable react/jsx-no-useless-fragment */
  return isActive ? <>{children}</> : null;
};

TabsItemComponent.displayName = 'HimalayaTabsItem';
const TabsItem = withScale(TabsItemComponent);
export default TabsItem;
/* eslint-enable */
