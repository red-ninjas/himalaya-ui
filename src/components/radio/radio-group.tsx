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
  const { SCALES } = useScale();
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();

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
      <div className={useClasses('radio-group', className, SCALE_CLASSES)} {...props}>
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

        ${RESPONSIVE.font(1, value => `--radio-group-gap: ${value};`, undefined, 'radio-group')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'radio-group')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'radio-group')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'radio-group')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'radio-group')}
        ${RESPONSIVE.font(1, value => `--radio-size: ${value};`, undefined, 'radio-group')}

        ${SCALER('radio-group')}
      `}</style>
    </RadioContext.Provider>
  );
};

RadioGroupComponent.displayName = 'HimalayaRadioGroup';
const RadioGroup = withScale(RadioGroupComponent);
export default RadioGroup;
