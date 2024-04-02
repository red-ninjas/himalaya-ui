'use client';

import React, { useEffect, useMemo, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useWarning from '../utils/use-warning';
import { CheckboxContext } from './checkbox-context';

interface Props {
  value: string[];
  disabled?: boolean;
  onChange?: (values: string[]) => void;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type CheckboxGroupProps = Props & NativeAttrs;

const CheckboxGroupComponent: React.FC<React.PropsWithChildren<CheckboxGroupProps>> = ({
  disabled = false,
  onChange,
  value,
  children,
  className = '',
  ...props
}: CheckboxGroupProps) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const [selfVal, setSelfVal] = useState<string[]>([]);
  const classes = useClasses('group', className, CLASS_NAMES);
  if (!value) {
    value = [];
    useWarning('Props "value" is required.', 'Checkbox Group');
  }

  const updateState = (val: string, checked: boolean) => {
    const removed = selfVal.filter(v => v !== val);
    const next = checked ? [...removed, val] : removed;
    setSelfVal(next);
    onChange && onChange(next);
  };

  const providerValue = useMemo(() => {
    return {
      updateState,
      disabledAll: disabled,
      inGroup: true,
      values: selfVal,
    };
  }, [disabled, selfVal]);

  useEffect(() => {
    setSelfVal(value);
  }, [value.join(',')]);

  return (
    <CheckboxContext.Provider value={providerValue}>
      <div className={classes} {...props}>
        {children}
        <style jsx>{`
          .group :global(label) {
            margin-right: calc(var(--checkbox-label-size) * 2);
            --checkbox-size: var(--checkbox-label-size);
          }
          .group :global(label:last-of-type) {
            margin-right: 0;
          }

          ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'checkbox')}
          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'checkbox')}

          ${SCALE.font(1, value => `--checkbox-label-size: ${value};`, undefined, 'group')}

          ${SCALE.w(1, value => `width: ${value};`, 'auto', 'group')}
          ${SCALE.h(1, value => `width: ${value};`, 'height', 'group')}
          ${UNIT('group')}
        `}</style>
      </div>
    </CheckboxContext.Provider>
  );
};

CheckboxGroupComponent.displayName = 'HimalayaCheckboxGroup';
const CheckboxGroup = withScale(CheckboxGroupComponent);

export default CheckboxGroup;
