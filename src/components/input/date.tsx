'use client';
import { Calendar } from 'components/icons';
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useScale, withScale } from '../use-scale';
import Input from './input';
import { InputInternalProps } from './input-props';

type InputDateComponentProps = {
  mode?: 'date' | 'time' | 'datetime-local';
  hideToggle?: boolean;
  isValid?: (string) => boolean;
} & Omit<InputInternalProps, 'htmlType'>;

type NativeAttrs = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputDateComponentProps>;
export type InputPasswordProps = InputDateComponentProps & NativeAttrs;

const InputDateComponent = React.forwardRef<HTMLInputElement, React.PropsWithChildren<InputPasswordProps>>(
  (
    {
      initialValue = '',
      readOnly = false,
      disabled = false,
      isValid = () => true,
      onChange,
      hideToggle = false,
      mode = 'datetime-local',
      children,
      value,
      ...props
    }: React.PropsWithChildren<InputPasswordProps>,
    ref: React.Ref<HTMLInputElement | null>,
  ) => {
    const { getAllScaleProps } = useScale();
    const inputRef = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState<boolean>(false);
    useImperativeHandle(ref, () => inputRef.current);
    const [selfValue, setSelfValue] = useState<string>(initialValue);
    const isControlledComponent = useMemo(() => value !== undefined, [value]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }
      if (event.target.value && isValid(event.target.value)) {
        setSelfValue(event.target.value);
        onChange && onChange(event);
      } else {
        setSelfValue('');
      }
    };

    const iconClickHandler = () => {
      setVisible(v => !v);
      /* istanbul ignore next */
      if (inputRef && inputRef.current) {
        if (visible) {
          inputRef.current.focus();
        } else {
          inputRef.current.showPicker();
        }
      }
    };

    const inputProps = useMemo(
      () => ({
        ...props,
        ref: inputRef,
        onChange: changeHandler,
        iconClickable: true,
        onIconClick: iconClickHandler,
      }),
      [props, iconClickHandler, selfValue, visible, inputRef],
    );

    useEffect(() => {
      if (isControlledComponent && isValid(value)) {
        setSelfValue(value as string);
      }
    });
    const controlledValue = isControlledComponent ? { value: selfValue } : { defaultValue: initialValue };

    return (
      <Input
        disabled={disabled}
        readOnly={readOnly}
        htmlType={mode}
        {...controlledValue}
        iconRight={!hideToggle ? <Calendar></Calendar> : undefined}
        {...getAllScaleProps()}
        {...inputProps}
        onBlur={() => console.log('on blur')}
        onFocus={() => console.log('on focus')}
      >
        {children}
      </Input>
    );
  },
);

InputDateComponent.displayName = 'HimalayaInputDateComponent';
const InputDate = withScale(InputDateComponent);
export default InputDate;
