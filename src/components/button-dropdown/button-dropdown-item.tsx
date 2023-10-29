'use client';
import React, { MouseEvent, useMemo } from 'react';
import useTheme from '../use-theme';
import { getColor } from './styles';
import { useButtonDropdown } from './button-dropdown-context';
import LoadingSpinner from '../loading-spinner';
import { NormalTypes } from '../utils/prop-types';

export type ButtonDropdownItemTypes = NormalTypes;

interface Props {
  main?: boolean;
  type?: ButtonDropdownItemTypes;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>;
export type ButtonDropdownItemProps = Props & NativeAttrs;

const ButtonDropdownItem: React.FC<React.PropsWithChildren<ButtonDropdownItemProps>> = ({
  children,
  onClick = () => {},
  className = '',
  main = false,
  type: selfType = 'default' as ButtonDropdownItemTypes,
  ...props
}: ButtonDropdownItemProps) => {
  const theme = useTheme();
  const { type: parentType, disabled, loading } = useButtonDropdown();
  const type = main ? parentType : selfType;
  const colors = getColor(theme.palette, type, disabled);
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick && onClick(event);
  };

  const cursor = useMemo(() => {
    if (loading) return 'default';
    return disabled ? 'not-allowed' : 'pointer';
  }, [loading, disabled]);

  return (
    <button className={className} onClick={clickHandler} {...props}>
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
          background-color: ${colors.bgColor};
          color: ${colors.color};
          width: 100%;
          height: var(--ui-dropdown-height);
          min-width: var(--ui-dropdown-min-width);
          padding: var(--ui-dropdown-padding);
          font-size: var(--ui-dropdown-font-size);
        }

        button:hover {
          border-color: ${colors.hoverBorder};
          background-color: ${colors.hoverBgColor};
        }
      `}</style>
    </button>
  );
};

ButtonDropdownItem.displayName = 'HimalayaButtonDropdownItem';
export default ButtonDropdownItem;
