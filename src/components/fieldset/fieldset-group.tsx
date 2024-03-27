'use client';

import React, { useCallback, useMemo, useState } from 'react';
import useCurrentState from '../utils/use-current-state';
import { FieldsetContext, FieldItem } from './fieldset-context';
import useWarning from '../utils/use-warning';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  value: string;
  className?: string;
  onChange?: (value: string) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type FieldsetGroupProps = Props & NativeAttrs;

const FieldsetGroupComponent: React.FC<React.PropsWithChildren<FieldsetGroupProps>> = ({
  className = '',
  children,
  value,
  onChange,
  ...props
}: React.PropsWithChildren<FieldsetGroupProps>) => {
  const { RESPONSIVE, SCALER, HIDER } = useScale();

  const [selfVal, setSelfVal] = useState<string>(value);
  const [items, setItems, ref] = useCurrentState<FieldItem[]>([]);
  const classes = useClasses('group', className, HIDER);

  const register = (newItem: FieldItem) => {
    const hasItem = ref.current.find(item => item.value === newItem.value);
    if (hasItem) {
      useWarning('The "value" of each "Fieldset" must be unique.', 'Fieldset');
    }
    setItems([...ref.current, newItem]);
  };

  const providerValue = useMemo(
    () => ({
      currentValue: selfVal,
      inGroup: true,
      register,
    }),
    [selfVal],
  );

  const clickHandle = useCallback(
    (nextValue: string) => {
      setSelfVal(nextValue);
      onChange && onChange(nextValue);
    },
    [onChange],
  );

  return (
    <FieldsetContext.Provider value={providerValue}>
      <div className={classes} {...props}>
        <div className="group-tabs">
          {items.map(item => (
            <button onClick={() => clickHandle(item.value)} key={item.value} className={selfVal === item.value ? 'active' : ''}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="group-group">{children}</div>
        <style jsx>{`
          .group {
          }
          .group-tabs {
            white-space: nowrap;
            overflow-y: hidden;
            overflow-x: auto;
            margin-bottom: -1px;
          }

          .group-group {
            border-top-left-radius: 0;
            overflow: hidden;
          }

          .group-group :global(.fieldset) {
            border-top-left-radius: 0;
          }

          button {
            height: 2.7em;
            line-height: 2.7em;
            text-align: center;
            user-select: none;
            color: var(--color-foreground-700);
            background-color: var(--color-background-900);
            font-size: 0.875em;
            white-space: nowrap;
            text-transform: capitalize;
            -webkit-appearance: none;
            cursor: pointer;
            margin: 0;
            padding: 0 1.45em;
            overflow: hidden;
            transition: all 0.2s ease 0s;
            border-radius: 0;
            border: 1px solid var(--color-border-1000);
            text-decoration: none;
            outline: none;
          }

          button.active {
            border-bottom-color: transparent;
            background-color: var(--color-background-1000);
            color: var(--color-foreground-1000);
            cursor: default;
          }

          button:first-of-type {
            border-top-left-radius: var(--layout-radius);
          }

          button:last-of-type {
            border-top-right-radius: var(--layout-radius);
          }

          button + button {
            border-left: 0;
          }

          ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'group')}
          ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'group')}
          ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'group')}
          ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'group')}
          ${RESPONSIVE.font(1, value => `font-size: ${value};`, undefined, 'group-tabs')}

          ${SCALER('group')}
        `}</style>
      </div>
    </FieldsetContext.Provider>
  );
};

FieldsetGroupComponent.displayName = 'HimalayaFieldsetGroup';
const FieldsetGroup = React.memo(withScale(FieldsetGroupComponent));
export default FieldsetGroup;
