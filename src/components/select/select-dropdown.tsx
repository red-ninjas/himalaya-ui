'use client';
import React, { CSSProperties, useImperativeHandle, useRef } from 'react';
import useTheme from '../use-theme';
import { useSelectContext } from './select-context';
import Dropdown from '../shared/dropdown';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { hexToRgb } from '../utils/color';

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
    const theme = useTheme();
    const { SCALES } = useScale();
    const internalDropdownRef = useRef<HTMLDivElement | null>(null);
    const { ref } = useSelectContext();
    const classes = useClasses('select-dropdown', className);

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(dropdownRef, () => internalDropdownRef.current);

    return (
      <Dropdown parent={ref} visible={visible} disableMatchWidth={disableMatchWidth} getPopupContainer={getPopupContainer}>
        <div ref={internalDropdownRef} className={classes} style={dropdownStyle}>
          {children}
          <style jsx>{`
            .select-dropdown {
              border-radius: ${SCALES.r(1, theme.style.radius)};
              box-shadow: ${theme.expressiveness.shadowLarge};
              background-color: ${theme.palette.background.value};
              max-height: 17em;
              overflow-y: auto;
              margin-top: 6px;
              overflow-anchor: none;
              padding: 0.38em 0;
              scroll-behavior: smooth;
              box-shadow: 0 0 0 1px rgba(${hexToRgb(theme.palette.background.hex_800)}, 1);
            }
          `}</style>
        </div>
      </Dropdown>
    );
  },
);

SelectDropdown.displayName = 'HimalayaSelectDropdown';
export default withScale(SelectDropdown);
