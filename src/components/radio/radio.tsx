'use client';
import React, { useEffect, useMemo, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import useWarning from '../utils/use-warning';
import { useRadioContext } from './radio-context';
import RadioDescription from './radio-description';
import { UIColorTypes } from '../themes/presets';

export interface RadioEventTarget {
  checked: boolean;
}
export interface RadioEvent {
  target: RadioEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
}

interface Props {
  checked?: boolean;
  value?: string | number;
  disabled?: boolean;
  onChange?: (e: RadioEvent) => void;
  type?: UIColorTypes;
  className?: string;
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>;
export type RadioProps = Props & NativeAttrs;

const RadioComponent: React.FC<React.PropsWithChildren<RadioProps>> = ({
  className = '',
  checked,
  onChange,
  disabled = false,
  type = 'default' as UIColorTypes,
  value: radioValue,
  children,
  ...props
}: React.PropsWithChildren<RadioProps>) => {
  const { RESPONSIVE } = useScale();
  const [selfChecked, setSelfChecked] = useState<boolean>(!!checked);
  const { value: groupValue, disabledAll, inGroup, updateState } = useRadioContext();
  const [withoutDescChildren, DescChildren] = pickChild(children, RadioDescription);

  if (inGroup) {
    if (checked !== undefined) {
      useWarning('Remove props "checked" if in the Radio.Group.', 'Radio');
    }
    if (radioValue === undefined) {
      useWarning('Props "value" must be deinfed if in the Radio.Group.', 'Radio');
    }
    useEffect(() => {
      setSelfChecked(groupValue === radioValue);
    }, [groupValue, radioValue]);
  }

  const isDisabled = useMemo(() => disabled || disabledAll, [disabled, disabledAll]);
  const changeHandler = (event: React.ChangeEvent) => {
    if (isDisabled) return;
    const selfEvent: RadioEvent = {
      target: {
        checked: !selfChecked,
      },
      stopPropagation: event.stopPropagation,
      preventDefault: event.preventDefault,
      nativeEvent: event,
    };
    setSelfChecked(!selfChecked);
    if (inGroup) {
      updateState && updateState(radioValue as string | number);
    }
    onChange && onChange(selfEvent);
  };

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(Boolean(checked));
  }, [checked]);

  return (
    <div className={useClasses('radio', className, type ? 'color-' + type : null)}>
      <label>
        <input type="radio" value={radioValue} checked={selfChecked} onChange={changeHandler} {...props} />
        <span className="name">
          <div className="point-outer">
            <span className={useClasses('point', { active: selfChecked })} />
          </div>
          {withoutDescChildren && <div className="with-label">{withoutDescChildren}</div>}
        </span>
        {DescChildren && DescChildren}
      </label>
      <style jsx>{`
        input {
          opacity: 0;
          visibility: hidden;
          overflow: hidden;
          width: 1px;
          height: 1px;
          top: -1000px;
          right: -1000px;
          position: fixed;
          font-size: 0;
        }
        .radio {
          display: flex;
          align-items: flex-start;
          position: relative;
          --radio-border-color: var(--color-base);
          --radio-color-bg: var(--color-base);
        }
        .radio.color-default {
          --radio-border-color: var(--color-foreground-1000);
          --radio-color-bg: var(--color-foreground-1000);
        }
        label {
          gap: 2px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          opacity: ${isDisabled ? 0.4 : 1};
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
        }
        .with-label {
          user-select: none;
          display: inline-flex;
          align-items: center;
          margin-left: calc(var(--radio-size) * 0.375);
        }
        .point-outer {
          height: var(--radio-size);
          width: var(--radio-size);
          line-height: var(--radio-size);

          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--radio-border-color);
          position: relative;
          border-radius: 50%;
          overflow: hidden;
        }
        .name {
          display: inline-flex;
          align-items: center;
        }
        .point {
          position: absolute;
          transition: all 0.2s ease 0s;
          display: inline-block;
          border-radius: 50%;
          display: block;
          width: calc(var(--radio-size) * 0.5);
          height: calc(var(--radio-size) * 0.5);
          background-color: transparent;
        }
        .point.active {
          background-color: var(--radio-color-bg);
        }

        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'radio')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'radio')}
        ${RESPONSIVE.w(1, value => `--radio-size: ${value};`, undefined, 'radio')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'with-label')}
      `}</style>
    </div>
  );
};

RadioComponent.displayName = 'HimalayaRadio';
const Radio = withScale(RadioComponent);
export default Radio;
