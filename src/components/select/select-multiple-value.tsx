'use client';
import React from 'react';
import useTheme from '../use-theme';
import Grid from '../grid';
import SelectClearIcon from './select-icon-clear';
import useScale, { withScale } from '../use-scale';

interface Props {
  disabled: boolean;
  onClear: (() => void) | null;
}

const SelectMultipleValue: React.FC<React.PropsWithChildren<Props>> = ({ disabled, onClear, children }) => {
  const theme = useTheme();
  const { SCALES } = useScale();

  return (
    <Grid>
      <div className="item">
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
          border-radius: ${SCALES.r(1, theme.style.radius)};
          background-color: ${theme.palette.background.hex_900};
          color: ${disabled ? theme.palette.background.hex_500 : theme.palette.foreground.value};
        }

        .item > :global(div:not(.clear-icon)),
        .item > :global(div:not(.clear-icon):hover) {
          border-radius: 0;
          background-color: transparent;
          padding: 0;
          margin: 0;
          color: inherit;
        }
      `}</style>
    </Grid>
  );
};

SelectMultipleValue.displayName = 'HimalayaSelectMultipleValue';
export default withScale(SelectMultipleValue);
