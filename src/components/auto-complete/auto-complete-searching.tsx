'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  className?: string;
}

export type AutoCompleteSearchProps = Props & React.HTMLAttributes<any>;

const AutoCompleteSearchComponent: React.FC<React.PropsWithChildren<AutoCompleteSearchProps>> = ({
  children,
  className = '',
}: React.PropsWithChildren<AutoCompleteSearchProps>) => {
  const { RESPONSIVE, SCALER, HIDER } = useScale();

  return (
    <div className={useClasses('searching', className, HIDER)}>
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

        ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'searching')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'searching')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'searching')}
        ${RESPONSIVE.padding(0.875, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'searching')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'searching')}

        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'searching')}

        ${SCALER('searching')}
      `}</style>
    </div>
  );
};

AutoCompleteSearchComponent.displayName = 'HimalayaAutoCompleteSearch';
const AutoCompleteSearch = withScale(AutoCompleteSearchComponent);

export default AutoCompleteSearch;
