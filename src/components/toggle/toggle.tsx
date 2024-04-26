'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { UIColorTypes } from '../themes/presets';

export interface ToggleEventTarget {
  checked: boolean;
}
export interface ToggleEvent {
  target: ToggleEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
}

interface Props {
  checked?: boolean;
  initialChecked?: boolean;
  onChange?: (ev: ToggleEvent) => void;
  disabled?: boolean;
  type?: UIColorTypes;
}

type NativeAttrs = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, keyof Props>;
export type ToggleProps = Props & NativeAttrs;

export type ToggleSize = {
  width: string;
  height: string;
};

const ToggleComponent: React.FC<ToggleProps> = ({
  initialChecked = false,
  checked,
  disabled = false,
  onChange,
  type = 'default' as UIColorTypes,
  className,
  ...props
}: ToggleProps) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked);
  const classes = useClasses('toggle', { checked: selfChecked, disabled });

  const changeHandle = useCallback(
    (ev: React.ChangeEvent) => {
      if (disabled) return;
      const selfEvent: ToggleEvent = {
        target: {
          checked: !selfChecked,
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev,
      };

      setSelfChecked(!selfChecked);
      onChange && onChange(selfEvent);
    },
    [disabled, selfChecked, onChange],
  );

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  return (
    <label className={useClasses('toggle-label', className, type ? 'color-' + type : null, CLASS_NAMES)} {...props}>
      <input type="checkbox" disabled={disabled} checked={selfChecked} onChange={changeHandle} />
      <div className={classes}>
        <span className="inner" />
      </div>
      <style jsx>{`
        .toggle-label {
          -webkit-tap-highlight-color: transparent;
          display: inline-flex;
          vertical-align: middle;
          white-space: nowrap;
          align-items: center;
          vertical-align: middle;
          white-space: nowrap;
          user-select: none;
          position: relative;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          --toggle-bg: var(--color-base);
          height: var(--toggle-height);
        }

        .toggle-label.color-default {
          --toggle-bg: var(--color-foreground-1000);
        }
        input {
          overflow: hidden;
          visibility: hidden;
          height: 0;
          opacity: 0;
          width: 0;
          position: absolute;
          background-color: transparent;
          z-index: -1;
        }

        .toggle {
          height: var(--toggle-height);
          width: 100%;
          border-radius: var(--toggle-height);
          transition-delay: 0.12s;
          transition-duration: 0.2s;
          transition-property: background, border;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
          position: relative;
          border: 1px solid transparent;
          background-color: var(--color-background-700);
          padding: 0;
        }

        .inner {
          width: calc(var(--toggle-height) - 2px);
          height: calc(var(--toggle-height) - 2px);
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 1px;
          box-shadow:
            rgba(0, 0, 0, 0.2) 0 1px 2px 0,
            rgba(0, 0, 0, 0.1) 0 1px 3px 0;
          transition: left 280ms cubic-bezier(0, 0, 0.2, 1);
          border-radius: 50%;
          background-color: var(--color-background-1000);
        }

        .disabled {
          border-color: var(--color-border-1000);
          background-color: var(--color-background-900);
        }

        .disabled > .inner {
          background-color: var(--color-background-700);
        }

        .disabled.checked {
          border-color: var(--color-background-500);
          background-color: var(--color-background-500);
        }

        .checked {
          background-color: var(--toggle-bg);
        }

        .checked > .inner {
          left: calc(100% - (var(--toggle-height) - 2px));
          box-shadow: none;
        }

        ${SCALE.padding(
          {
            top: 0.1875,
            bottom: 0.1875,
            left: 0,
            right: 0,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'toggle-label',
        )}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'toggle-label')}
        ${SCALE.h(0.875, value => `--toggle-height: ${value};`, undefined, 'toggle-label')}
        ${SCALE.w(1.75, value => `width: ${value};`, undefined, 'toggle-label')}
        ${SCALE.font(1, value => `--toggle-font-size: ${value};`, undefined, 'toggle-label')}
        ${UNIT('toggle-label')}
      `}</style>
    </label>
  );
};

ToggleComponent.displayName = 'HimalayaToggle';
const Toggle = withScale(ToggleComponent);
export default Toggle;
