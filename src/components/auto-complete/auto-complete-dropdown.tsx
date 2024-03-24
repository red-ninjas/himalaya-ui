'use client';
import React, { CSSProperties, useMemo } from 'react';
import useTheme from '../use-theme';
import { useAutoCompleteContext } from './auto-complete-context';
import Dropdown from '../shared/dropdown';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  visible: boolean;
  className?: string;
  disableMatchWidth?: boolean;
  dropdownStyle?: CSSProperties;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type AutoCompleteDropdownProps = Props & NativeAttrs;

const AutoCompleteDropdown: React.FC<React.PropsWithChildren<AutoCompleteDropdownProps>> = ({
  children,
  visible,
  className = '',
  dropdownStyle = {},
  disableMatchWidth,
  getPopupContainer,
  ...props
}: React.PropsWithChildren<AutoCompleteDropdownProps>) => {
  const theme = useTheme();
  const { ref } = useAutoCompleteContext();
  const isEmpty = useMemo(() => {
    return !visible || React.Children.count(children) === 0;
  }, [children, visible]);
  const classes = useClasses('auto-complete-dropdown', className);

  const { SCALES } = useScale();

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return (
    <Dropdown parent={ref} visible={visible} disableMatchWidth={disableMatchWidth} getPopupContainer={getPopupContainer}>
      <div {...props} className={classes} style={dropdownStyle} onClick={clickHandler}>
        {children}
        <style jsx>{`
          .auto-complete-dropdown {
            border-radius: ${SCALES.r(1, `var(--layout-radius)`)};
            box-shadow: ${isEmpty ? 'none' : theme.expressiveness.shadowLarge};
            background-color: var(--color-background-1000);
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
export default withScale(AutoCompleteDropdown);
