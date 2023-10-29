'use client';
import React, { useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Props } from './input-props';
import PasswordIcon from './password-icon';
import Input from './input';
import { useScale, withScale } from '../use-scale';

interface PasswordProps extends Props {
  hideToggle?: boolean;
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof PasswordProps>;
export type InputPasswordProps = PasswordProps & NativeAttrs;

const InputPasswordComponent = React.forwardRef<HTMLInputElement, React.PropsWithChildren<InputPasswordProps>>(
  ({ hideToggle = false, children, ...props }: React.PropsWithChildren<InputPasswordProps>, ref: React.Ref<HTMLInputElement | null>) => {
    const { getAllScaleProps } = useScale();
    const inputRef = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState<boolean>(false);
    useImperativeHandle(ref, () => inputRef.current);

    const iconClickHandler = () => {
      setVisible(v => !v);
      /* istanbul ignore next */
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    };

    const inputProps = useMemo(
      () => ({
        ...props,
        ref: inputRef,
        iconClickable: true,
        onIconClick: iconClickHandler,
        htmlType: visible ? 'text' : 'password',
      }),
      [props, iconClickHandler, visible, inputRef],
    );
    const icon = useMemo(() => {
      if (hideToggle) return null;
      return <PasswordIcon visible={visible} />;
    }, [hideToggle, visible]);

    return (
      <Input iconRight={icon} {...getAllScaleProps()} {...inputProps}>
        {children}
      </Input>
    );
  },
);

InputPasswordComponent.displayName = 'HimalayaInputPassword';
const InputPassword = withScale(InputPasswordComponent);
export default InputPassword;
