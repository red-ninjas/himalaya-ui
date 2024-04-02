'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export type AutoCompleteSearchProps = React.HTMLAttributes<HTMLDivElement>;

const AutoCompleteSearchComponent: React.FC<React.PropsWithChildren<AutoCompleteSearchProps>> = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<AutoCompleteSearchProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <div className={useClasses('searching', className, CLASS_NAMES)} {...props}>
      {children}
      <style jsx>{`
        .searching {
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
          font-weight: normal;
          white-space: pre;
          padding: var(--layout-gap-half);
          line-height: 1;
          background-color: var(--color-background-1000);
          color: var(--color-background-400);
          user-select: none;
          border: 0;
        }

        ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'searching')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'searching')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'searching')}
        ${SCALE.padding(0.875, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'searching')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'searching')}

        ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'searching')}

        ${UNIT('searching')}
      `}</style>
    </div>
  );
};

AutoCompleteSearchComponent.displayName = 'HimalayaAutoCompleteSearch';
const AutoCompleteSearch = withScale(AutoCompleteSearchComponent);

export default AutoCompleteSearch;
