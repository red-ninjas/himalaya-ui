'use client';
import React, { MouseEvent, useImperativeHandle, useMemo, useRef } from 'react';
import css from 'styled-jsx/css';
import Button, { ButtonProps } from '../button/button';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { useModalContext } from './modal-context';

type ModalActionEvent = MouseEvent<HTMLButtonElement> & {
  close: () => void;
};

interface Props {
  passive?: boolean;
  disabled?: boolean;
  onClick?: (event: ModalActionEvent) => void;
}

export type ModalActionProps = Props & Omit<ButtonProps, keyof Props>;
const ModalActionComponent = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ModalActionProps>>(
  (
    { className = undefined, children, onClick, passive = false, disabled = false, ...props }: React.PropsWithChildren<ModalActionProps>,
    ref: React.Ref<HTMLButtonElement | null>,
  ) => {
    const { SCALER, RESPONSIVE } = useScale();
    const btnRef = useRef<HTMLButtonElement>(null);
    const { close } = useModalContext();
    useImperativeHandle(ref, () => btnRef.current);

    const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const actionEvent = Object.assign({}, event, {
        close: () => close && close(),
      });
      onClick && onClick(actionEvent);
    };

    const color = useMemo(() => {
      return passive ? `var(--color-background-700)` : `var(--color-foreground-1000)`;
    }, [passive, disabled]);

    const bgColor = useMemo(() => {
      return disabled ? `var(--color-background-800)` : `var(--color-background-1000)`;
    }, [disabled]);

    const { className: resolveClassName, styles } = css.resolve`
      .btn.action-btn {
        border: none;
        color: ${color};
        background-color: var(--color-background-1000);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex: 1;
        border-radius: 0;
        min-width: 0;
      }
      .btn.action-btn:hover,
      .btn.action-btn:focus {
        color: ${disabled ? color : `var(--color-foreground-1000)`};
        background-color: ${disabled ? bgColor : `var(--color-background-800)`};
      }

      ${RESPONSIVE.h(3.5625, value => `height: ${value};`, undefined, 'btn.action-btn')}
      ${RESPONSIVE.font(0.75, value => `font-size: ${value};`, undefined, 'btn.action-btn')}
      ${SCALER('btn.action-btn')}
    `;

    const classes = useClasses('action-btn', className, resolveClassName);

    const overrideProps = {
      ...props,
      effect: false,
      ref: btnRef,
    };

    return (
      <Button className={classes} onClick={clickHandler} disabled={disabled} {...overrideProps}>
        {children}
        {styles}
      </Button>
    );
  },
);

ModalActionComponent.displayName = 'HimalayaModalAction';
const ModalAction = withScale(ModalActionComponent);
export default ModalAction;
