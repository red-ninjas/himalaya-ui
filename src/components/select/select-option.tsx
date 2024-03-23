'use client';
import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { useSelectContext } from './select-context';
import useWarning from '../utils/use-warning';
import Ellipsis from '../shared/ellipsis';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
import Check from '../icons/check';

interface Props {
  value?: string;
  disabled?: boolean;
  className?: string;
  divider?: boolean;
  label?: boolean;
  preventAllEvents?: boolean;
  hasCheckmark?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type SelectOptionProps = Props & NativeAttrs;

const SelectOptionComponent: React.FC<React.PropsWithChildren<SelectOptionProps>> = ({
  value: identValue,
  className = '',
  children,
  disabled = false,
  divider = false,
  label = false,
  preventAllEvents = false,
  hasCheckmark = true,
  ...props
}: React.PropsWithChildren<SelectOptionProps>) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const { updateValue, value, disableAll } = useSelectContext();
  const isDisabled = useMemo(() => disabled || disableAll, [disabled, disableAll]);
  const isLabel = useMemo(() => label || divider, [label, divider]);
  const classes = useClasses('option', { divider, label }, className);
  if (!isLabel && identValue === undefined) {
    useWarning('The props "value" is required.', 'Select Option');
  }

  const selected = useMemo(() => {
    if (!value) return false;
    if (typeof value === 'string') {
      return identValue === value;
    }
    return value.includes(`${identValue}`);
  }, [identValue, value]);

  const bgColor = useMemo(() => {
    if (isDisabled) return theme.palette.background.hex_800;
    return theme.palette.background.value;
  }, [isDisabled, theme.palette]);

  const hoverBgColor = useMemo(() => {
    if (isDisabled || isLabel) return bgColor;
    return theme.palette.background.hex_900;
  }, [isDisabled, theme.palette, isLabel, bgColor]);

  const color = useMemo(() => {
    if (isDisabled) return theme.palette.background.hex_500;
    return theme.palette.foreground.value;
  }, [isDisabled, theme.palette]);

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (preventAllEvents) return;
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
    if (isDisabled || isLabel) return;
    updateValue && updateValue(identValue);
  };

  return (
    <div className={classes} onClick={clickHandler} {...props}>
      <div className="option-input">
        <Ellipsis height={SCALES.h(2.25)}>{children}</Ellipsis>
        {selected && hasCheckmark && (
          <div className="option-check">
            <Check size={SCALES.h(1)}></Check>
          </div>
        )}
      </div>
      <style jsx>{`
        .option-input {
          display: flex;
          max-width: 100%;
          box-sizing: border-box;
          align-items: center;
          place-content: space-between;
          width: 100%;
        }
        .option {
          display: flex;
          max-width: 100%;
          box-sizing: border-box;
          justify-content: flex-start;
          align-items: center;
          font-weight: normal;
          background-color: ${bgColor};
          color: ${color};
          user-select: none;
          border: 0;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          transition:
            background 0.2s ease 0s,
            border-color 0.2s ease 0s;
          --select-font-size: ${SCALES.font(0.875)};
          font-size: var(--select-font-size);
          width: ${SCALES.w(1, '100%')};
          height: ${SCALES.h(2.25)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0.667)} ${SCALES.pb(0)} ${SCALES.pl(0.667)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .option:hover {
          background-color: ${hoverBgColor};
          color: ${theme.palette.foreground.value};
        }

        .divider {
          line-height: 0;
          overflow: hidden;
          border-top: 1px solid ${theme.palette.border.value};
          width: ${SCALES.w(1, '100%')};
          height: ${SCALES.h(1, 0)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0.5)} ${SCALES.mr(0)} ${SCALES.mb(0.5)} ${SCALES.ml(0)};
        }

        .label {
          color: ${theme.palette.background.hex_200};
          border-bottom: 1px solid ${theme.palette.border.value};
          cursor: default;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.w(1, '100%')};
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

SelectOptionComponent.displayName = 'HimalayaSelectOption';
const SelectOption = withScale(SelectOptionComponent);
export default SelectOption;
