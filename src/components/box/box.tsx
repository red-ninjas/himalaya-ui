'use client';

import React from 'react';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import useScale, { customResponsiveAttribute, ScaleProps, withScale } from '../use-scale';

type PropsOf<E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> & Omit<PropsOf<E>, keyof (BoxOwnProps & ScaleProps)> & ScaleProps;

const defaultElement = 'div';

export type BoxComponent = {
  <E extends React.ElementType = typeof defaultElement>(props: BoxProps<E>): React.ReactNode | null;
  displayName?: string;
};

export const Box: BoxComponent = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>({ as, children, className, ...restProps }: BoxProps<E>, ref: typeof restProps.ref | null) => {
    const Element = as || defaultElement;
    const { RESPONSIVE, SCALER } = useScale();

    return (
      <Element className={useClasses('box', className)} ref={ref} {...restProps}>
        {children}
        <style jsx>{`
          ${SCALER('box')}

          ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'box')}
          ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'box')}
          ${RESPONSIVE.w(0, value => `width: ${value};`, 'auto', 'box')}
          ${RESPONSIVE.h(0, value => `height: ${value};`, 'auto', 'box')}
          ${RESPONSIVE.font(1, value => `font-size: ${value};`, 'inherit', 'box')}
          ${RESPONSIVE.lineHeight(1, value => `line-height: ${value};`, 'inherit', 'box')}
        `}</style>
      </Element>
    );
  },
);

Box.displayName = 'HimalayaBox';
export default withScale(Box);
