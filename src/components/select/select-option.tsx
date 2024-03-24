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
  const { SCALES, RESPONSIVE } = useScale();
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
    return theme.palette.background.hex_1000;
  }, [isDisabled, theme.palette]);

  const hoverBgColor = useMemo(() => {
    if (isDisabled || isLabel) return bgColor;
    return theme.palette.background.hex_900;
  }, [isDisabled, theme.palette, isLabel, bgColor]);

  const color = useMemo(() => {
    if (isDisabled) return theme.palette.background.hex_500;
    return theme.palette.foreground.hex_1000;
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
            <Check></Check>
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
          font-size: var(--select-font-size);
        }

        .option-check :global(svg) {
          width: 100%;
          height: 100%;
        }

        .option:hover {
          background-color: ${hoverBgColor};
          color: var(--color-foreground-1000);
        }

        .divider {
          line-height: 0;
          overflow: hidden;
          border-top: 1px solid var(--color-border-1000);
        }

        .label {
          color: var(--color-background-200);
          border-bottom: 1px solid var(--color-border-1000);
          cursor: default;
          font-weight: 500;
          font-size: var(--select-font-size);
        }

        ${RESPONSIVE.font(1, value => `width: ${value}; height: ${value};`, undefined, 'option-check')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'label')}

        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'divider')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'divider')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'divider')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 0, 'divider')}

        ${RESPONSIVE.padding(
          {
            top: 0,
            left: 0.667,
            right: 0.667,
            bottom: 0,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'option',
        )}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'option')}
        ${RESPONSIVE.font(0.875, value => `--select-font-size: ${value};`, undefined, 'option')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'option')}
        ${RESPONSIVE.h(2.25, value => `height: ${value};`, undefined, 'item')}
      `}</style>
    </div>
  );
};

SelectOptionComponent.displayName = 'HimalayaSelectOption';
const SelectOption = withScale(SelectOptionComponent);
export default SelectOption;
