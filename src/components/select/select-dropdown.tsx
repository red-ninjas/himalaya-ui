'use client';
import React, { CSSProperties, useImperativeHandle, useRef } from 'react';
import { useSelectContext } from './select-context';
import Dropdown from '../shared/dropdown';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  visible: boolean;
  className?: string;
  dropdownStyle?: CSSProperties;
  disableMatchWidth?: boolean;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type SelectDropdownProps = Props & NativeAttrs;

const SelectDropdown = React.forwardRef<HTMLDivElement | null, React.PropsWithChildren<SelectDropdownProps>>(
  (
    { visible, children, className = '', dropdownStyle = {}, disableMatchWidth, getPopupContainer }: React.PropsWithChildren<SelectDropdownProps>,
    dropdownRef,
  ) => {
    const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();
    const internalDropdownRef = useRef<HTMLDivElement | null>(null);
    const { ref } = useSelectContext();
    const classes = useClasses('select-dropdown', className, SCALE_CLASSES);

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(dropdownRef, () => internalDropdownRef.current);

    return (
      <Dropdown parent={ref} visible={visible} disableMatchWidth={disableMatchWidth} getPopupContainer={getPopupContainer}>
        <div ref={internalDropdownRef} className={classes} style={dropdownStyle}>
          {children}
          <style jsx>{`
            .select-dropdown {
              background-color: var(--color-background-1000);
              max-height: 17em;
              overflow-y: auto;
              margin-top: 6px;
              overflow-anchor: none;
              padding: 0.38em 0;
              scroll-behavior: smooth;
              box-shadow: 0 0 0 1px rgba(var(--color-background-800-rgb)}, 1);
            }

            ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'select-dropdown')}
            ${SCALER('select-dropdown')}
          `}</style>
        </div>
      </Dropdown>
    );
  },
);

SelectDropdown.displayName = 'HimalayaSelectDropdown';
export default withScale(SelectDropdown);
