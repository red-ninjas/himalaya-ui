'use client';

import React from 'react';
import useClasses from '../use-classes';

interface Props {
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof Props>;
export type PaginationItemProps = Props & NativeAttrs;

const PaginationItem: React.FC<React.PropsWithChildren<PaginationItemProps>> = ({ active, children, disabled, onClick, ...props }) => {
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
          color: var(--color-foreground-1000);
          background-color: var(--color-background-1000);
          border-radius: var(--layout-radius);
          transition: all linear 200ms 0ms;
        }

        button:hover {
          background-color: var(--color-tint);
          color: var(--color-contrast);
        }

        .active {
          background-color: var(--color-base);
          color: var(--color-contrast);
          font-weight: 500;
          box-shadow: var(--theme-expressiveness-shadow-small);
        }

        .active:hover {
          background-color: var(--color-shade);
          color: var(--color-contrast);
          box-shadow: var(--theme-expressiveness-shadow-medium);
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
