'use client';
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { COLOR_TYPES, tuple } from '../utils/prop-types';

const resizeTypes = tuple('none', 'both', 'horizontal', 'vertical', 'initial', 'inherit');
export type TextareaResizes = (typeof resizeTypes)[number];
export type TextareaTypes = COLOR_TYPES;
interface Props {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  type?: TextareaTypes;
  disabled?: boolean;
  readOnly?: boolean;
  hasBorder?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  resize?: TextareaResizes;
}

type NativeAttrs = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof Props>;
export type TextareaProps = Props & NativeAttrs;

const TextareaComponent = React.forwardRef<HTMLTextAreaElement, React.PropsWithChildren<TextareaProps>>(
  (
    {
      type = 'default' as TextareaTypes,
      disabled = false,
      readOnly = false,
      onFocus,
      onBlur,
      hasBorder = true,
      className,
      initialValue = '',
      onChange,
      value,
      placeholder,
      resize = 'none' as TextareaResizes,
      ...props
    }: React.PropsWithChildren<TextareaProps>,
    ref: React.Ref<HTMLTextAreaElement | null>,
  ) => {
    const theme = useTheme();
    const { SCALER, RESPONSIVE } = useScale();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => textareaRef.current);
    const isControlledComponent = useMemo(() => value !== undefined, [value]);
    const [selfValue, setSelfValue] = useState<string>(initialValue);
    const [hover, setHover] = useState<boolean>(false);
    const classes = useClasses('wrapper', { hover, disabled }, className, type ? 'color-' + type : null);

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled || readOnly) return;
      setSelfValue(event.target.value);
      onChange && onChange(event);
    };
    const focusHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setHover(true);
      onFocus && onFocus(e);
    };
    const blurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setHover(false);
      onBlur && onBlur(e);
    };

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string);
      }
    }, [value, isControlledComponent]);

    const controlledValue = isControlledComponent ? { value: selfValue } : { defaultValue: initialValue };
    const textareaProps = {
      ...props,
      ...controlledValue,
    };

    return (
      <div className={classes}>
        <textarea
          className="textarea"
          ref={textareaRef}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={changeHandler}
          {...textareaProps}
        />
        <style jsx>{`
          .wrapper {
            display: inline-flex;
            box-sizing: border-box;
            user-select: none;

            border-color: var(--select-border-color);
            border-width: ${hasBorder ? '1px' : '0'};
            border-style: solid;

            color: var(--select-color);
            transition:
              box-shadow 200ms ease 0s;
              border 0.2s ease 0s,
              color 0.2s ease 0s;
            min-width: 12.5rem;
            max-width: 95vw;
            height: var(--textarea-height);

            --select-border-color: var(--color-border);
            --select-border-color-hover: var(--color-shade-border);
            --select-border-color-hover-rgb: var(--color-shade-border-rgb);
            --select-color: var(--color-foreground-1000);
            --select-background: var(--color-background-1000);

            background: var(--select-background);
          }

          .wrapper.hover {
            border-color: var( --select-border-color-hover);
            box-shadow: ${hasBorder ? `0 0 0 4px rgba(var(--select-border-color-hover-rgb), 0.2)` : `none`};
          }
          .wrapper.disabled {
            --select-border-color: var(-color-border-1000);
            --select-border-color-hover: var(-color-border-1000);
            --select-border-color-hover-rgb: var(-color-border-1000);
            --select-color: var(--color-foreground-1000);
            --select-background: var(--color-background-900);

            cursor: not-allowed;
          }
          .textarea {
            background-color: transparent;
            box-shadow: none;
            display: block;
            font-family: ${theme.font.sans};
            font-size: var(--textarea-font-size);
            width: 100%;
            height: var(--textarea-height);
            border: none;
            outline: none;
            resize: ${resize};
          }
          .disabled > textarea {
            cursor: not-allowed;
          }
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:active,
          textarea:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px var(--color-background-1000) inset !important;
          }



          ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'wrapper')}
          ${RESPONSIVE.font(0.875, value => `--textarea-font-size: ${value};`, undefined, 'wrapper')}
          ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'wrapper')}
          ${RESPONSIVE.w(1, value => `width: ${value};`, 'initial', 'wrapper')}
          ${RESPONSIVE.h(1, value => `--textarea-height: ${value};`, 'auto', 'wrapper')}
          ${RESPONSIVE.padding(0.5, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'textarea')}

          ${SCALER('wrapper')}
        `}</style>
      </div>
    );
  },
);

TextareaComponent.displayName = 'HimalayaTextarea';
const Textarea = withScale(TextareaComponent);
export default Textarea;
