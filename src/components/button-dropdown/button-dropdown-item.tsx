'use client';
import React, { MouseEvent, useMemo } from 'react';
import LoadingSpinner from '../loading-spinner';
import useClasses from '../use-classes';
import { NormalTypes } from '../utils/prop-types';
import { useButtonDropdown } from './button-dropdown-context';

export type ButtonDropdownItemTypes = NormalTypes;

interface Props {
  main?: boolean;
  type?: ButtonDropdownItemTypes;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLButtonElement>, keyof Props>;
export type ButtonDropdownItemProps = Props & NativeAttrs;

const ButtonDropdownItem: React.FC<React.PropsWithChildren<ButtonDropdownItemProps>> = ({
  children,
  onClick = () => {},
  className = '',
  main = false,
  type: selfType = 'default' as ButtonDropdownItemTypes,
  ...props
}: ButtonDropdownItemProps) => {
  const { disabled, loading } = useButtonDropdown();
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick && onClick(event);
  };

  const cursor = useMemo(() => {
    if (loading) return 'default';
    return disabled ? 'not-allowed' : 'pointer';
  }, [loading, disabled]);

  return (
    <button className={useClasses(className, { loading, disabled })} onClick={clickHandler} {...props}>
      {loading ? <LoadingSpinner /> : children}
      <style jsx>{`
        button {
          position: relative;
          -webkit-appearance: button;
          text-rendering: auto;
          display: inline-flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          text-align: center;
          cursor: ${cursor};
          box-sizing: border-box;
          margin: 0;
          border: none;
          font-weight: ${main ? '500' : 'inherit'};
          background-color: var(--ui-button-bg);
          color: var(--ui-dropdown-color);
          width: 100%;
          height: var(--ui-dropdown-height);
          min-width: var(--ui-dropdown-min-width);
          padding: var(--ui-dropdown-padding);
          font-size: var(--ui-dropdown-font-size);

          transition-property: border-color, background, color, transform, box-shadow;
          transition-duration: 0.15s;
          transition-timing-function: ease;
        }

        button:hover {
          border-color: var(--ui-button-hover-border-color);
          background-color: var(--ui-button-hover-bg);
        }

        button.disabled,
        button.loading {
          cursor: not-allowed;
        }
      `}</style>
    </button>
  );
};

ButtonDropdownItem.displayName = 'HimalayaButtonDropdownItem';
export default ButtonDropdownItem;
