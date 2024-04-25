'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import Button from '../button';
import Input from '../input';

interface Props {
  buttonPosition?: 'start' | 'end';
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type InputGroupProps = Props & NativeAttrs;

const InputGroupComponent: React.FC<React.PropsWithChildren<InputGroupProps>> = ({ buttonPosition = 'end', className, children, ...props }) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const [, buttonChildren] = pickChild(children, Button);
  const [, inputChildren] = pickChild(children, Input);

  const inputGroupClasses = useClasses('input-group', buttonPosition === 'start' ? 'button-start' : 'button-end', className, CLASS_NAMES);

  return (
    <div className={inputGroupClasses} {...props}>
      <div className="input-with-button">
        {buttonPosition === 'start' && buttonChildren}
        {inputChildren}
        {buttonPosition === 'end' && buttonChildren}
      </div>
      <style jsx global>{`
        .input-group .input-with-button .input-container {
          height: var(--input-group-height);
          border: none;
        }

        .input-group .input-with-button .input-container .input-wrapper.hover {
          box-shadow: none !important;
          border: none;
        }

        .input-group .input-with-button .input-wrapper {
          border-radius: var(--input-group-border-radius);
          height: var(--input-group-height);
          border: none;
        }
        .input-group .input-with-button button {
          border-radius: 0;
          height: var(--input-group-height);
          border: none;
        }

        .input-group .input-with-button button:first-of-type {
          border-top-left-radius: var(--input-group-border-radius);
          border-bottom-left-radius: var(--input-group-border-radius);
        }

        .input-group .input-with-button button:last-of-type {
          border-top-right-radius: var(--input-group-border-radius);
          border-bottom-right-radius: var(--input-group-border-radius);
        }
      `}</style>

      <style jsx>{`
        .input-group {

          --input-group-border-color: var(--color-border-1000);

          display: flex;
          align-items: center;
          max-width: max-content;
          border: 1px solid var(--input-group-border-color);
          border-radius: var(--input-group-border-radius);
          transition:
            border 200ms ease 0s,
            color 200ms ease 0s;
            box-shadow 200ms ease 0s;
          &:hover{
            border-color: var(--color-border-800);
            box-shadow  none;
          }
        }

        .input-with-button {
          display: flex;
        }

        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'input-group')}
        ${SCALE.h(2.5, value => `--input-group-height: ${value};`, undefined, 'input-group')}
        ${SCALE.r(1, value => `--input-group-border-radius: ${value};`, 'var(--layout-radius)', 'input-group')}
        ${UNIT('input-group')}
      `}</style>
    </div>
  );
};

InputGroupComponent.displayName = 'HimalayaInputGroup';
const InputGroup = withScale(InputGroupComponent);
export default InputGroup;
