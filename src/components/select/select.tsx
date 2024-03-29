'use client';
import React, { CSSProperties, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Grid from '../grid';
import Ellipsis from '../shared/ellipsis';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { pickChildByProps } from '../utils/collections';
import { COLOR_TYPES } from '../utils/prop-types';
import useCurrentState from '../utils/use-current-state';
import { SelectConfig, SelectContext } from './select-context';
import SelectDropdown from './select-dropdown';
import SelectIcon from './select-icon';
import SelectInput from './select-input';
import SelectMultipleValue from './select-multiple-value';

export type SelectRef = {
  focus: () => void;
  blur: () => void;
  scrollTo?: (options?: ScrollToOptions) => void;
};
export type SelectTypes = COLOR_TYPES;
interface Props {
  disabled?: boolean;
  type?: SelectTypes;
  value?: string | string[];
  initialValue?: string | string[];
  placeholder?: React.ReactNode | string;
  icon?: React.ComponentType;
  onChange?: (value: string | string[]) => void;
  pure?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  className?: string;
  hasBorder?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  disableMatchWidth?: boolean;
  onDropdownVisibleChange?: (visible: boolean) => void;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type SelectProps = Props & NativeAttrs;

const SelectComponent = React.forwardRef<SelectRef, React.PropsWithChildren<SelectProps>>(
  (
    {
      children,
      type = 'default' as SelectTypes,
      disabled = false,
      initialValue: init,
      value: customValue,
      icon: Icon = SelectIcon as React.ComponentType,
      onChange,
      pure = false,
      multiple = false,
      hasBorder = true,
      clearable = true,
      placeholder,
      className = '',
      dropdownClassName,
      dropdownStyle,
      disableMatchWidth = false,
      getPopupContainer,
      onDropdownVisibleChange = () => {},
      ...props
    }: React.PropsWithChildren<SelectProps>,
    selectRef,
  ) => {
    const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [selectFocus, setSelectFocus] = useState<boolean>(false);
    const [value, setValue, valueRef] = useCurrentState<string | string[] | undefined>(() => {
      if (!multiple) return init;
      if (Array.isArray(init)) return init;
      return typeof init === 'undefined' ? [] : [init];
    });
    const isEmpty = useMemo(() => {
      if (!Array.isArray(value)) return !value;
      return value.length === 0;
    }, [value]);

    const updateVisible = (next: boolean) => {
      onDropdownVisibleChange(next);
      setVisible(next);
    };
    const updateValue = (next: string) => {
      setValue(last => {
        if (!Array.isArray(last)) return next;
        if (!last.includes(next)) return [...last, next];
        return last.filter(item => item !== next);
      });
      onChange && onChange(valueRef.current as string | string[]);
      if (!multiple) {
        updateVisible(false);
      }
    };

    const initialValue: SelectConfig = useMemo(
      () => ({
        value,
        visible,
        updateValue,
        updateVisible,
        ref,
        disableAll: disabled,
      }),
      [visible, disabled, ref, value, multiple],
    );

    const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      event.preventDefault();
      if (disabled) return;

      updateVisible(!visible);
      event.preventDefault();
    };
    const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      /* istanbul ignore next */
      if (visible) {
        event.preventDefault();
      }
    };

    useEffect(() => {
      if (customValue === undefined) return;
      setValue(customValue);
    }, [customValue]);
    useImperativeHandle(
      selectRef,
      () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        scrollTo: options => dropdownRef.current?.scrollTo(options),
      }),
      [inputRef, dropdownRef],
    );

    const selectedChild = useMemo(() => {
      const [, optionChildren] = pickChildByProps(children, 'value', value);
      return React.Children.map(optionChildren, child => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const el = React.cloneElement(child as any, { preventAllEvents: true, hasCheckmark: false });
        if (!multiple) return el;
        return (
          <SelectMultipleValue disabled={disabled} onClear={clearable ? () => updateValue(child.props.value) : null}>
            {el}
          </SelectMultipleValue>
        );
      });
    }, [value, children, multiple]);

    const onInputBlur = () => {
      updateVisible(false);
      setSelectFocus(false);
    };
    const classes = useClasses(
      'select',
      {
        active: selectFocus || visible,
        multiple,
        disabled,
      },
      className,
      type ? 'color-' + type : null,
      SCALE_CLASSES,
    );

    return (
      <SelectContext.Provider value={initialValue}>
        <div className={classes} ref={ref} onClick={clickHandler} onMouseDown={mouseDownHandler} {...props}>
          <SelectInput ref={inputRef} visible={visible} onBlur={onInputBlur} onFocus={() => setSelectFocus(true)} />
          {isEmpty && (
            <span className="value placeholder">
              <Ellipsis height="var(--select-height)">{placeholder}</Ellipsis>
            </span>
          )}
          {value && !multiple && <span className="value">{selectedChild}</span>}
          {value && multiple && <Grid.Container gap={0.5}>{selectedChild}</Grid.Container>}
          <SelectDropdown
            ref={dropdownRef}
            visible={visible}
            className={dropdownClassName}
            dropdownStyle={dropdownStyle}
            disableMatchWidth={disableMatchWidth}
            getPopupContainer={getPopupContainer}
          >
            {children}
          </SelectDropdown>
          {!pure && (
            <div className="icon">
              <Icon />
            </div>
          )}
          <style jsx>{`
            .select {
              display: inline-flex;
              align-items: center;
              user-select: none;
              white-space: nowrap;
              cursor: pointer;
              position: relative;
              max-width: 90vw;
              overflow: hidden;
              transition:
                border 200ms ease-in 0s,
                color 200ms ease-out 0s,
                box-shadow 200ms ease 0s;

              min-width: 11.5em;
              height: var(--select-height);

              --select-color: var(--color-foreground-1000);
              --select-color-hover: var(--color-foreground-1000);
              --select-bg: var(--color-background-1000);
              --select-border-color: var(--color-border);
              --select-border-color-hover: var(--color-shade-border);
              --select-border-color-hover-rgb: var(--color-shade-border-rgb);
              --select-icon-color: var(--select-border-color);
              --select-placeholder-color: var(--color-foreground-600);

              background-color: var(--select-bg);
              border-width: ${hasBorder ? '1px' : '0'};
              border-style: solid;
              border-color: var(--select-border-color);
            }
            .select.color-default {
              --select-icon-color: var(--select-color);
            }

            .multiple {
              height: auto;
              min-height: var(--select-height);
            }

            .select.active,
            .select:hover {
              border-color: var(--select-border-color-hover);
              box-shadow: 0 0 0 4px rgba(var(--select-border-color-hover-rgb), 0.2);
            }

            a .select.active.icon,
            .select:hover .icon {
              color: var(--select-color-hover);
            }

            .select.disabled {
              --select-bg: var(--color-background-900);
              --select-border-color: var(--color-border-1000);
              --select-icon-color: var(--color-foreground-500);
              --select-color: var(--color-foreground-1000);
              --select-placeholder-color: var(--color-foreground-600);
              --select-color-hover: var(--color-foreground-1000);
              --select-border-color-hover: var(--color-border-1000);
              --select-border-color-hover-rgb: var(--color-border-1000-rgb);
              &:hover {
                box-shahow: none;
              }
              cursor: not-allowed;
            }
            .value {
              display: inline-flex;
              flex: 1;
              height: 100%;
              align-items: center;
              line-height: 1;
              padding: 0;
              margin-right: 1.25em;
              font-size: var(--select-font-size);
              color: var(--select-color);
              width: calc(100% - 1.25em);
            }

            .value > :global(div),
            .value > :global(div:hover) {
              border-radius: 0;
              background-color: transparent;
              padding: 0;
              margin: 0;
              color: inherit;
            }

            .placeholder {
              color: var(--select-placeholder-color);
            }

            .icon {
              position: absolute;
              right: var(--layout-gap-quarter);
              font-size: var(--select-font-size);
              top: 50%;
              bottom: 0;
              transform: translateY(-50%) rotate(${visible ? '180' : '0'}deg);
              pointer-events: none;
              transition: transform 200ms ease;
              display: flex;
              align-items: center;
              color: var(--select-icon-color);
            }

            ${RESPONSIVE.font(0.875, value => `--select-font-size: ${value};`, undefined, 'select')}
            ${RESPONSIVE.padding(
              {
                top: 0,
                left: 0.667,
                right: 0.334,
                bottom: 0,
              },
              value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
              undefined,
              'select',
            )}
            ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'select')}

            ${RESPONSIVE.padding(
              {
                top: 0.334,
                left: 0.667,
                right: 0.334,
                bottom: 0.334,
              },
              value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
              undefined,
              'multiple',
            )}
            ${RESPONSIVE.h(2.25, value => `--select-height: ${value};`, undefined, 'select')}
            ${RESPONSIVE.w(1, value => `width: ${value};`, 'initial', 'select')}
            ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'select')}

            ${SCALER('select')}
          `}</style>
        </div>
      </SelectContext.Provider>
    );
  },
);

SelectComponent.displayName = 'HimalayaSelect';
const Select = withScale(SelectComponent);
export default Select;
