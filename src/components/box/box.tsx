'use client';

import React from 'react';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import { DynamicScales, makeScaleHandler, ScaleProps } from '../use-scale';

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
    const layout = useLayout();
    const { pl, pr, pt, pb, mt, mr, mb, ml, px, py, mx, my, font, w, h, m, p, unit = layout.unit, scale = 1, ...innerProps } = restProps;

    const SCALES: DynamicScales = {
      pt: makeScaleHandler(pt ?? py ?? p, scale, unit),
      pr: makeScaleHandler(pr ?? px ?? p, scale, unit),
      pb: makeScaleHandler(pb ?? py ?? p, scale, unit),
      pl: makeScaleHandler(pl ?? px ?? p, scale, unit),
      px: makeScaleHandler(px ?? pl ?? pr ?? p, scale, unit),
      py: makeScaleHandler(py ?? pt ?? pb ?? p, scale, unit),
      mt: makeScaleHandler(mt ?? my ?? m, scale, unit),
      mr: makeScaleHandler(mr ?? mx ?? m, scale, unit),
      mb: makeScaleHandler(mb ?? my ?? m, scale, unit),
      ml: makeScaleHandler(ml ?? mx ?? m, scale, unit),
      mx: makeScaleHandler(mx ?? ml ?? mr ?? m, scale, unit),
      my: makeScaleHandler(my ?? mt ?? mb ?? m, scale, unit),
      w: makeScaleHandler(w ?? w, scale, unit),
      h: makeScaleHandler(h ?? h, scale, unit),
      font: makeScaleHandler(font, scale, unit),
    };

    return (
      <Element className={useClasses('box', className)} ref={ref} {...innerProps}>
        {children}
        <style jsx>{`
          .box {
            line-height: ${SCALES.h(1)};
            font-size: ${SCALES.font(1)};
            width: ${SCALES.w(0, 'auto')};
            height: ${SCALES.h(0, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }
        `}</style>
      </Element>
    );
  },
);

Box.displayName = 'HimalayaBox';

export default Box;
