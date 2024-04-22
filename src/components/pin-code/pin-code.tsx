// PinCode.tsx
'use client';

import React, { useRef, useState, useEffect, forwardRef } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  value?: string;
  length?: number;
  validChars?: string;
  placeholder?: string;
  autoFocus?: boolean;
  passwordMode?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onComplete?: (value: string) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type PinCodeProps = Props & NativeAttrs;

const PinCodeComponent = forwardRef<HTMLInputElement, PinCodeProps>(
  (
    {
      value,
      length = 5,
      validChars = 'A-Za-z0-9',
      placeholder = '·',
      autoFocus = false,
      passwordMode = false,
      className,
      onChange,
      onFocus,
      onBlur,
      onComplete,
      ...props
    },
    ref,
  ) => {
    const { SCALE, UNIT, CLASS_NAMES } = useScale();

    const [localValue, setLocalValue] = useState('');
    const [isActive, setActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current);
        } else {
          ref.current = inputRef.current;
        }
      }
    }, [ref]);

    const handleClick = () => {
      inputRef.current?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputVal = event.target.value.replace(/\s/g, '');
      if (RegExp(`^[${validChars}]{0,${length}}$`).test(newInputVal)) {
        onChange?.(newInputVal);
        setLocalValue(newInputVal);
        if (newInputVal.length === length) {
          onComplete?.(newInputVal);
        }
      }
    };

    const getValue = () => value ?? localValue;

    return (
      <div className={useClasses('pincode-container', CLASS_NAMES)} onClick={() => inputRef.current?.focus()}>
        <input
          ref={inputRef}
          aria-label="pincode input"
          spellCheck={false}
          value={getValue()}
          onChange={handleInputChange}
          className={useClasses('pincode-input', className)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setActive(true);
            onFocus?.();
          }}
          onBlur={() => {
            setActive(false);
            onBlur?.();
          }}
          type={passwordMode ? 'password' : 'text'}
          style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
          {...props}
        />
        {[...Array(length)].map((_, i) => (
          <div
            className={useClasses('pincode-character', {
              selected: isActive && getValue().length === i,
              filled: getValue().length > i,
              inactive: getValue()[i] === placeholder,
            })}
            onClick={handleClick}
            key={i}
          >
            {passwordMode && getValue()[i] ? '*' : getValue()[i] || placeholder}
          </div>
        ))}

        <style jsx>{`
          .pincode-input {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            box-sizing: border-box;
            position: absolute;
            color: transparent;
            background: transparent;
            caret-color: transparent;
            outline: none;
            border: 0 none transparent;
          }

          .pincode-input::-ms-reveal,
          .pincode-input::-ms-clear {
            display: none;
          }

          .pincode-input::selection {
            background: transparent;
          }

          :where(.pincode-container) {
            position: relative;
            display: flex;
            gap: 8px;
          }

          :where(.pincode-character) {
            height: 100%;
            flex-grow: 1;
            flex-basis: 0;
            text-align: center;
            color: var(--color-foreground-1000);
            background-color: var(--color-background-1000);
            border: 1px solid var(--color-background-800);
            border-radius: var(--layout-radius);
            cursor: default;
            user-select: none;
            box-sizing: border-box;
          }

          :where(.pincode-character.inactive) {
            color: var(--color-foreground-1000);
            background-color: var(--color-background-600);
          }

          :where(.pincode-character.selected) {
            outline: 2px solid var(--color-foreground-600);
            color: var(--color-foreground-1000);
          }

          ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'pincode-container')}
          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'pincode-container')}
          ${SCALE.w(16, value => `width: ${value};`, undefined, 'pincode-container')}
          ${SCALE.h(2.4, value => `height: ${value};`, undefined, 'pincode-container')}
          ${SCALE.font(1, value => `font-size: ${value};`, 'inherit', 'pincode-character')}
          ${SCALE.lineHeight(2.4, value => `line-height: ${value};`, undefined, 'pincode-character')}
          ${UNIT('pincode-container')}
        `}</style>
      </div>
    );
  },
);
PinCodeComponent.displayName = 'HimalayaPinCode';
const PinCode = withScale(PinCodeComponent);
export default PinCode;
