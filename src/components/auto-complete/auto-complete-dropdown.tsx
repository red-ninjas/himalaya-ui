'use client';
import React, { CSSProperties, useMemo } from 'react';
import useTheme from '../use-theme';
import { useAutoCompleteContext } from './auto-complete-context';
import Dropdown from '../shared/dropdown';
import useClasses from '../use-classes';

interface Props {
  visible: boolean;
  className?: string;
  disableMatchWidth?: boolean;
  dropdownStyle?: CSSProperties;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type AutoCompleteDropdownProps = Props & NativeAttrs;

const AutoCompleteDropdown: React.FC<React.PropsWithChildren<AutoCompleteDropdownProps>> = ({
  children,
  visible,
  className = '',
  dropdownStyle = {},
  disableMatchWidth,
  getPopupContainer,
}: React.PropsWithChildren<AutoCompleteDropdownProps>) => {
  const theme = useTheme();
  const { ref } = useAutoCompleteContext();
  const isEmpty = useMemo(() => {
    return !visible || React.Children.count(children) === 0;
  }, [children, visible]);
  const classes = useClasses('auto-complete-dropdown', className);

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return (
    <Dropdown parent={ref} visible={visible} disableMatchWidth={disableMatchWidth} getPopupContainer={getPopupContainer}>
      <div className={classes} style={dropdownStyle} onClick={clickHandler}>
        {children}
        <style jsx>{`
          .auto-complete-dropdown {
            border-radius: ${theme.style.radius};
            box-shadow: ${isEmpty ? 'none' : theme.expressiveness.shadowLarge};
            background-color: ${theme.palette.background};
            overflow-y: auto;
            max-height: 15rem;
            overflow-anchor: none;
          }
        `}</style>
      </div>
    </Dropdown>
  );
};

AutoCompleteDropdown.displayName = 'HimalayaAutoCompleteDropdown';
export default AutoCompleteDropdown;
