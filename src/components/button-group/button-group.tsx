'use client';

import React, { useMemo } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { ButtonTypes } from '../utils/prop-types';
import { ButtonGroupConfig, ButtonGroupContext } from './button-group-context';

interface Props {
  disabled?: boolean;
  vertical?: boolean;
  ghost?: boolean;
  type?: ButtonTypes;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type ButtonGroupProps = Props & NativeAttrs;

const ButtonGroupComponent: React.FC<React.PropsWithChildren<ButtonGroupProps>> = (groupProps: ButtonGroupProps) => {
  const { UNIT, SCALE, CLASS_NAMES } = useScale();
  const { disabled = false, type = 'default' as ButtonTypes, ghost = false, vertical = false, children, className, ...props } = groupProps;
  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      type,
      ghost,
      isButtonGroup: true,
    }),
    [disabled, type],
  );

  const classes = useClasses(
    'btn-group',
    {
      vertical: vertical,
      horizontal: !vertical,
    },
    className,
    type ? 'color-' + type : null,
    CLASS_NAMES,
  );

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div className={classes} {...props}>
        {children}
        <style jsx>{`
          .btn-group {
            display: inline-flex;
            border: 1px solid var(--color-border);
            background-color: transparent;
            overflow: hidden;
          }

          .vertical {
            flex-direction: column;
          }
          .btn-group :global(.btn) {
            border: none;
          }
          .btn-group :global(.btn .text) {
            top: 0;
          }
          .horizontal :global(.btn:not(:first-child)) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: 1px solid var(--color-border);
          }
          .horizontal :global(.btn:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .vertical :global(.btn:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 1px solid var(--color-border);
          }
          .vertical :global(.btn:not(:last-child)) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'btn-group')}
          ${SCALE.margin(0.313, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'btn-group')}
          ${SCALE.h(1, value => `height: ${value}; --ui-button-height: ${value};`, 'min-content', 'btn-group')}
          ${SCALE.w(1, value => `width: ${value};`, 'auto', 'btn-group')}
          ${SCALE.font(1, value => `font-size: ${value}; --button-font-size: ${value};`, undefined, 'btn-group')}
          ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'btn-group')}

          ${UNIT('btn-group')}
        `}</style>
      </div>
    </ButtonGroupContext.Provider>
  );
};

ButtonGroupComponent.displayName = 'HimalayaButtonGroup';
const ButtonGroup = withScale(ButtonGroupComponent);
export default ButtonGroup;
