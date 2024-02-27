'use client';

import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale, ScaleResponsiveParameter, ScaleProps } from '../use-scale';

type PropsOf<E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
  hide?: ScaleResponsiveParameter<boolean>;
  show?: ScaleResponsiveParameter<boolean>;
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<PropsOf<E>, keyof (BoxOwnProps & ScaleProps)> &
  ScaleProps & { visible?: ScaleResponsiveParameter<string> };

const defaultElement = 'div';

export type BoxComponent = {
  <E extends React.ElementType = typeof defaultElement>(props: BoxProps<E>): React.ReactNode | null;
  displayName?: string;
};

export const Box = React.forwardRef(({ as, children, className, visible, ...restProps }: BoxProps<typeof defaultElement>, ref: typeof restProps.ref | null) => {
  const Element = as || defaultElement;
  const { ...innerProps } = restProps;

  const { RESPONSIVE } = useScale();

  return (
    <Element className={useClasses('box font lineHeight width height padding margin', className)} ref={ref} {...innerProps}>
      {children}
      <style jsx>{`
        .box {
          visibility: ${visible};
        }
        ${RESPONSIVE.font(1, value => `font-size: ${value};`)}
        ${RESPONSIVE.lineHeight(1, value => `line-height: ${value};`)}
        ${RESPONSIVE.w(0, value => `width: ${value};`, 'auto')}
        ${RESPONSIVE.h(0, value => `height: ${value};`, 'auto')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`)}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`)}
      `}</style>
    </Element>
  );
});

Box.displayName = 'HimalayaBox';

export default withScale(Box);
