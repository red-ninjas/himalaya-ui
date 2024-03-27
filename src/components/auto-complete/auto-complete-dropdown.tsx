'use client';
import React, { CSSProperties, useMemo } from 'react';
import Dropdown from '../shared/dropdown';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { useAutoCompleteContext } from './auto-complete-context';

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
  const { ref } = useAutoCompleteContext();
  const { SCALER, RESPONSIVE, HIDER } = useScale();

  const isEmpty = useMemo(() => {
    return !visible || React.Children.count(children) === 0;
  }, [children, visible]);
  const classes = useClasses('auto-complete-dropdown', className, { empty: isEmpty }, HIDER);

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
            background-color: var(--color-background-1000);
            overflow-y: auto;
            max-height: 15rem;
            overflow-anchor: none;
            box-shadow: 0 0 0 1px rgba(var(--color-background-800-rgb)}, 1);
          }

          .auto-complete-dropdown.empty {
            box-shadow: none;
          }

          ${SCALER('auto-complete-dropdown')}
          ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'auto-complete-dropdown')}
        `}</style>
      </div>
    </Dropdown>
  );
};

AutoCompleteDropdown.displayName = 'HimalayaAutoCompleteDropdown';
export default withScale(AutoCompleteDropdown);
