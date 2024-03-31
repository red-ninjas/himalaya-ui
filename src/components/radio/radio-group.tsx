'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { RadioContext } from './radio-context';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  value?: string | number;
  initialValue?: string | number;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  className?: string;
  useRow?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type RadioGroupProps = Props & NativeAttrs;

const RadioGroupComponent: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({
  disabled = false,
  onChange,
  value,
  children,
  className,
  initialValue,
  useRow = false,
  ...props
}: React.PropsWithChildren<RadioGroupProps>) => {
  const { UNIT, SCALE, CLASS_NAMES } = useScale();

  const [selfVal, setSelfVal] = useState<string | number | undefined>(initialValue);
  const updateState = (nextValue: string | number) => {
    setSelfVal(nextValue);
    onChange && onChange(nextValue);
  };

  const providerValue = useMemo(() => {
    return {
      updateState,
      disabledAll: disabled,
      inGroup: true,
      value: selfVal,
    };
  }, [disabled, selfVal]);

  useEffect(() => {
    if (value === undefined) return;
    setSelfVal(value);
  }, [value]);

  return (
    <RadioContext.Provider value={providerValue}>
      <div className={useClasses('radio-group', className, CLASS_NAMES)} {...props}>
        {children}
      </div>
      <style jsx>{`
        .radio-group {
          display: flex;
          flex-direction: ${useRow ? 'col' : 'column'};
        }

        .radio-group :global(.radio) {
          margin-top: ${useRow ? 0 : 'var(--radio-group-gap)'};
          margin-left: ${useRow ? 'var(--radio-group-gap)' : 0};
        }

        .radio-group :global(.radio:first-of-type) {
          margin: 0;
        }

        ${SCALE.font(1, value => `--radio-group-gap: ${value};`, undefined, 'radio-group')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'radio-group')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'radio-group')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'radio-group')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'radio-group')}
        ${SCALE.font(1, value => `--radio-size: ${value};`, undefined, 'radio-group')}

        ${UNIT('radio-group')}
      `}</style>
    </RadioContext.Provider>
  );
};

RadioGroupComponent.displayName = 'HimalayaRadioGroup';
const RadioGroup = withScale(RadioGroupComponent);
export default RadioGroup;
