'use client';
import React from 'react';
import Grid from '../grid';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import SelectClearIcon from './select-icon-clear';

interface Props {
  disabled: boolean;
  onClear: (() => void) | null;
}

const SelectMultipleValue: React.FC<React.PropsWithChildren<Props>> = ({ disabled, onClear, children }) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  return (
    <Grid>
      <div className={(useClasses('item', disabled), SCALE_CLASSES)}>
        {children}
        {!!onClear && <SelectClearIcon onClick={onClear} />}
      </div>
      <style jsx>{`
        .item {
          display: inline-flex;
          justify-items: center;
          align-items: center;
          line-height: 1;
          padding: 0 0.5em;
          font-size: var(--select-font-size);
          height: calc(var(--select-font-size) * 2);

          --multi-option-color: var(--color-foreground-1000);
          --multi-option-bg: var(--color-background-900);
          background-color: var(--multi-option-bg);
        }

        .item.disabled {
          --multi-option-color: var(--color-foreground-500);
        }

        .item > :global(div:not(.clear-icon)),
        .item > :global(div:not(.clear-icon):hover) {
          border-radius: 0;
          background-color: transparent;
          padding: 0;
          margin: 0;
          color: inherit;
        }
        ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'item')}
        ${SCALER('item')}
      `}</style>
    </Grid>
  );
};

SelectMultipleValue.displayName = 'HimalayaSelectMultipleValue';
export default withScale(SelectMultipleValue);
