'use client';
import React, { CSSProperties, useMemo } from 'react';
import Dropdown from '../shared/dropdown';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { useInputDateContext } from './date-context';

interface Props {
  visible: boolean;
  className?: string;
  disableMatchWidth?: boolean;
  dropdownStyle?: CSSProperties;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type InputDateDropdownProps = Props & NativeAttrs;

const InputDateDropdown: React.FC<React.PropsWithChildren<InputDateDropdownProps>> = ({
  children,
  visible,
  className = '',
  dropdownStyle = {},
  disableMatchWidth,
  getPopupContainer,
  ...props
}: React.PropsWithChildren<InputDateDropdownProps>) => {
  const { ref } = useInputDateContext();
  const { UNIT, SCALE, CLASS_NAMES } = useScale();

  const isEmpty = useMemo(() => {
    return !visible || React.Children.count(children) === 0;
  }, [children, visible]);
  const classes = useClasses('input-date-dropdown', className, { empty: isEmpty }, CLASS_NAMES);

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
          .input-date-dropdown {
            background-color: var(--color-background-1000);
            overflow-y: auto;
            max-height: 15rem;
            overflow-anchor: none;
            box-shadow: 0 0 0 1px rgba(var(--color-background-800-rgb)}, 1);
          }

          .input-date-dropdown.empty {
            box-shadow: none;
          }

          ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'input-date-dropdown')}
          ${UNIT('input-date-dropdown')}
        `}</style>
      </div>
    </Dropdown>
  );
};

InputDateDropdown.displayName = 'HimalayaInputDateDropdown';
export default withScale(InputDateDropdown);
