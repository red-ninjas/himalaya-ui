'use client';

import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { addColorAlpha } from '../utils/color';
import useClasses from '../use-classes';

interface Props {
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>;
export type PaginationItemProps = Props & NativeAttrs;

const PaginationItem: React.FC<React.PropsWithChildren<PaginationItemProps>> = ({ active, children, disabled, onClick, ...props }) => {
  const theme = useTheme();

  const classes = useClasses({
    active,
    disabled,
  });

  const clickHandler = (event: React.MouseEvent) => {
    if (disabled) return;
    onClick && onClick(event);
  };

  return (
    <li>
      <button className={classes} onClick={clickHandler} {...props}>
        {children}
      </button>
      <style jsx>{`
        li {
          margin-right: 0.428em;
          display: inline-block;
        }
        button {
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          text-transform: capitalize;
          user-select: none;
          white-space: nowrap;
          text-align: center;
          vertical-align: middle;
          box-shadow: none;
          outline: none;
          height: var(--pagination-size);
          min-width: var(--pagination-size);
          font-size: inherit;
          cursor: pointer;
          color: var(--color-primary-1000);
          border-radius: var(--layout-radius);
          background-color: var(--color-background-1000);
          transition: all linear 200ms 0ms;
        }

        button:hover {
          background-color: var(--color-primary-200);
        }

        .active {
          font-weight: bold;
          background-color: var(--color-primary-1000);
          color: var(--color-background-1000);
          box-shadow: ${theme.expressiveness.shadowSmall};
        }

        .active:hover {
          background-color: var(--color-primary-800);
          box-shadow: ${theme.expressiveness.shadowMedium};
        }

        .disabled {
          color: var(--color-background-500);
          cursor: not-allowed;
        }

        .disabled:hover {
          background-color: var(--color-background-700);
        }

        button :global(svg) {
          width: 1.3em;
          height: 1.3em;
        }
      `}</style>
    </li>
  );
};

PaginationItem.displayName = 'HimalayaPaginationItem';
export default PaginationItem;
