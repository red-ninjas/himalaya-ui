'use client';

import React from 'react';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import useScale, { DynamicScales, makeScaleHandler, makeScaleHandler4X, responsiveCss, ScaleProps, ScaleResponsiveParameter, withScale } from '../use-scale';

type PropsOf<E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
  hide?: ScaleResponsiveParameter<boolean>;
  show?: ScaleResponsiveParameter<boolean>;
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> & Omit<PropsOf<E>, keyof (BoxOwnProps & ScaleProps)> & ScaleProps;

const defaultElement = 'div';

export type BoxComponent = {
  <E extends React.ElementType = typeof defaultElement>(props: BoxProps<E>): React.ReactNode | null;
  displayName?: string;
};

export const Box: BoxComponent = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    { as, hide, show, children, className, ...restProps }: BoxProps<E>,
    ref: typeof restProps.ref | null,
  ) => {
    const Element = as || defaultElement;
    const layout = useLayout();
    const { RESPONSIVE } = useScale();
    const { pl, pr, pt, pb, mt, mr, mb, ml, px, py, mx, my, font, w, h, m, lineHeight, p, unit = layout.unit, scale = 1, ...innerProps } = restProps;

    return (
      <Element className={useClasses('box padding margin width height font lineHeight hide show', className)} ref={ref} {...innerProps}>
        {children}
        <style jsx>{`
          ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom}  ${value.left};`)}
          ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom}  ${value.left};`)}
          ${RESPONSIVE.w(0, value => `width: ${value};`, 'auto')}
          ${RESPONSIVE.h(0, value => `height: ${value};`, 'auto')}
          ${RESPONSIVE.font(1, value => `font-size: ${value};`, 'inherit')}
          ${RESPONSIVE.lineHeight(1, value => `font-size: ${value};`, 'inherit')}
          ${responsiveCss(hide, 'hide', layout.breakpoints, value => `display: ${value ? `none` : 'inherit'};`)}
          ${responsiveCss(show, 'show', layout.breakpoints, value => `display: ${value ? `inherit` : 'none'};`)}
        `}</style>
      </Element>
    );
  },
);

Box.displayName = 'HimalayaBox';
export default withScale(Box);
