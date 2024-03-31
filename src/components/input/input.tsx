'use client';
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import InputBlockLabel from './input-block-label';
import InputIcon from './input-icon';
import InputClearIcon from './input-icon-clear';
import InputLabel from './input-label';
import { Props } from './input-props';
import { UIColorTypes } from '../themes/presets';

type NativeAttrs = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Props>;
export type InputProps = Props & NativeAttrs;

const simulateChangeEvent = (el: HTMLInputElement, event: React.MouseEvent<HTMLDivElement>): React.ChangeEvent<HTMLInputElement> => {
  return {
    ...event,
    target: el,
    currentTarget: el,
  };
};

const InputComponent = React.forwardRef<HTMLInputElement, React.PropsWithChildren<InputProps>>(
  (
    {
      label,
      labelRight,
      type = 'default' as UIColorTypes,
      htmlType = 'text',
      icon,
      iconRight,
      iconClickable = false,
      onIconClick,
      initialValue = '',
      onChange,
      readOnly = false,
      value,
      onClearClick,
      clearable = false,
      className = '',
      onBlur,
      onFocus,
      autoComplete = 'off',
      placeholder = '',
      children,
      disabled = false,
      hasBorder = true,
      ...props
    }: React.PropsWithChildren<InputProps>,
    ref: React.Ref<HTMLInputElement | null>,
  ) => {
    const { UNIT, SCALE, CLASS_NAMES } = useScale();
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current);

    const [selfValue, setSelfValue] = useState<string>(initialValue);
    const [hover, setHover] = useState<boolean>(false);
    const isControlledComponent = useMemo(() => value !== undefined, [value]);
    const labelClasses = useMemo(() => (labelRight ? 'right-label' : label ? 'left-label' : ''), [label, labelRight]);
    const iconClasses = useMemo(() => (iconRight ? 'right-icon' : icon ? 'left-icon' : ''), [icon, iconRight]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      setSelfValue(event.target.value);
      onChange && onChange(event);
    };
    const clearHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      setSelfValue('');
      onClearClick && onClearClick(event);
      /* istanbul ignore next */
      if (!inputRef.current) return;

      const changeEvent = simulateChangeEvent(inputRef.current, event);
      changeEvent.target.value = '';
      onChange && onChange(changeEvent);
      inputRef.current.focus();
    };

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setHover(true);
      onFocus && onFocus(e);
    };
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setHover(false);
      onBlur && onBlur(e);
    };

    const iconClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onIconClick && onIconClick(e);
    };
    const iconProps = useMemo(
      () => ({
        clickable: iconClickable,
        onClick: iconClickHandler,
      }),
      [iconClickable, iconClickHandler],
    );

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string);
      }
    });

    const controlledValue = isControlledComponent ? { value: selfValue } : { defaultValue: initialValue };
    const inputProps = {
      ...props,
      ...controlledValue,
    };

    return (
      <div className={useClasses('with-label', CLASS_NAMES)}>
        {children && <InputBlockLabel>{children}</InputBlockLabel>}
        <div className={useClasses('input-container', className, type ? 'color-' + type : null)}>
          {label && <InputLabel>{label}</InputLabel>}
          <div className={useClasses('input-wrapper', { hover, disabled }, labelClasses)}>
            {icon && <InputIcon icon={icon} {...iconProps} />}
            <input
              type={htmlType}
              ref={inputRef}
              className={useClasses({ disabled }, iconClasses, 'font')}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              onFocus={focusHandler}
              onBlur={blurHandler}
              onChange={changeHandler}
              autoComplete={autoComplete}
              {...inputProps}
            />
            {clearable && (
              <InputClearIcon visible={Boolean(inputRef.current && inputRef.current.value !== '')} disabled={disabled || readOnly} onClick={clearHandler} />
            )}
            {iconRight && <InputIcon icon={iconRight} {...iconProps} />}
          </div>
          {labelRight && <InputLabel isRight={true}>{labelRight}</InputLabel>}
        </div>
        <style jsx>{`
          .with-label {
            display: inline-block;
            box-sizing: border-box;
            -webkit-box-align: center;
          }

          .input-container {
            display: inline-flex;
            align-items: center;
            height: var(--input-height);
          }

          .input-wrapper {
            display: inline-flex;
            vertical-align: middle;
            align-items: center;
            height: 100%;
            flex: 1;
            user-select: none;
            border: 0;


            --input-border-color: var(--color-border);
            --input-border-color-hover: var(--color-shade-border);
            --input-border-color-hover-rgb: var(--color-shade-border-rgb);
            --input-color: var(--color-foreground-1000);
            --input-background: var(--color-background-1000);

            background: var(--input-background);

            border-color: var(--input-border-color);
            border-width: ${hasBorder ? '1px' : '0'};
            border-style: solid;
            transition:
              border 200ms ease 0s,
              color 200ms ease 0s;
              box-shadow 200ms ease 0s;
            }

          .input-wrapper.left-label {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }

          .input-wrapper.right-label {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          .input-wrapper.disabled {
            cursor: not-allowed;
            --input-border-color: var(-color-border-1000);
            --input-border-color-hover: var(-color-border-1000);
            --input-border-color-hover-rgb: var(-color-border-1000);
            --input-color: var(--color-foreground-1000);
            --input-background: var(--color-background-900);
          }

          input.disabled {
            cursor: not-allowed;
          }

          .input-wrapper.hover {
            border-color: var(--input-border-color-hover);
            box-shadow: ${hasBorder ? `0 0 0 4px rgba(var(--input-border-color-hover-rgb), 0.2)` : `none`};
          }

          input {
            margin: 0.25em 0.625em;
            padding: 0;
            box-shadow: none;
            background-color: transparent;
            border: none;
            color: var(--input-color);
            outline: none;
            border-radius: 0;
            width: 100%;
            min-width: 0;
            -webkit-appearance: none;
          }

          input.left-icon {
            margin-left: 0;
          }

          input.right-icon {
            margin-right: 0;
          }

          ::placeholder,
          ::-moz-placeholder,
          :-ms-input-placeholder,
          ::-webkit-input-placeholder {
            color: var(--color-background-600);
          }

          ::-ms-reveal {
            display: none !important;
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:active,
          input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px var(--color-background-1000) inset !important;
            -webkit-text-fill-color: var(--input-color) !important;
          }


          ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'with-label')}
          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'with-label')}
          ${SCALE.w(1, value => `width: ${value};`, 'initial', 'with-label')}
          ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'with-label')}
          ${SCALE.h(2.25, value => `--input-height: ${value};`, undefined, 'with-label')}
          ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'font')}
          ${SCALE.w(1, value => `width: ${value};`, 'initial', 'input-container')}
          ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'input-wrapper')}

          ${UNIT('with-label')}

        `}</style>
      </div>
    );
  },
);

InputComponent.displayName = 'HimalayaInput';
const Input = withScale(InputComponent);
export default Input;
