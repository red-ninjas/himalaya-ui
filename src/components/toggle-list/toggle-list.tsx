'use client';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import useScale, { withScale } from '../use-scale';
import { ToggleListContext } from './toggle-list-provider';
import useClasses from '../use-classes';

interface Props {
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  value?: string | number;
  initialValue?: string | number;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type ToggleListProps = Props & NativeAttrs;

const ToggleListComponent: React.FC<PropsWithChildren<ToggleListProps>> = ({
  initialValue,
  onChange,
  value,
  disabled = false,
  children,
  className,
  ...props
}: ToggleListProps) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  const [selfVal, setSelfVal] = useState<string | number | undefined>(initialValue);
  const updateState = (nextValue: string | number) => {
    setSelfVal(nextValue);
    onChange && onChange(nextValue);
  };

  const providerValue = useMemo(() => {
    return {
      updateState,
      disabledAll: disabled,
      value: selfVal,
    };
  }, [disabled, selfVal]);

  useEffect(() => {
    if (value === undefined) return;
    setSelfVal(value);
  }, [value]);

  return (
    <ToggleListContext.Provider value={providerValue}>
      <div className={useClasses('toggle-list', className, CLASS_NAMES)} {...props}>
        {children}
      </div>
      <style jsx>{`
        .toggle-list {
          background: var(--color-background-900);

          border: 1px solid var(--color-border-1000);
          display: inline-flex;
          position: relative;
        }

        ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'toggle-list')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'toggle-list')}
        ${SCALE.h(2, value => `height: ${value};`, 'auto', 'toggle-list')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'toggle-list')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'toggle-list')}

        ${UNIT('toggle-list')}
      `}</style>
    </ToggleListContext.Provider>
  );
};

ToggleListComponent.displayName = 'HimalayaToggleList';
const Toggle = withScale(ToggleListComponent);
export default Toggle;
