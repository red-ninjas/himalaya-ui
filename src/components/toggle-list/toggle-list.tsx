'use client';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { ToggleListContext } from './toggle-list-provider';

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
  ...props
}: ToggleListProps) => {
  const theme = useTheme();
  const { SCALES } = useScale();

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
      <div className={'toggle-list'} {...props}>
        {children}
      </div>
      <style jsx>{`
        .toggle-list {
          border-radius: ${theme.style.radius};
          background: ${theme.palette.accents_0};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          border: 1px solid ${theme.palette.border};
          display: inline-flex;
          position: relative;
        }
      `}</style>
    </ToggleListContext.Provider>
  );
};

ToggleListComponent.displayName = 'HimalayaToggleList';
const Toggle = withScale(ToggleListComponent);
export default Toggle;
