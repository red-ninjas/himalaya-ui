'use client';
import React, { useMemo } from 'react';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import useScale, { ScaleResponsiveParameter, customResponsiveAttribute } from '../use-scale';
import { GridAlignContent, GridAlignItems, GridDirection, GridJustify } from './grid-types';

export type GridBreakpointsValue = number | boolean;
export interface GridBasicComponentProps {
  xs?: GridBreakpointsValue;
  sm?: GridBreakpointsValue;
  md?: GridBreakpointsValue;
  lg?: GridBreakpointsValue;
  xl?: GridBreakpointsValue;
  justify?: ScaleResponsiveParameter<GridJustify>;
  direction?: ScaleResponsiveParameter<GridDirection>;
  alignItems?: ScaleResponsiveParameter<GridAlignItems>;
  alignContent?: ScaleResponsiveParameter<GridAlignContent>;
  className?: string;
  order?: ScaleResponsiveParameter<number>;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof GridBasicComponentProps>;
export type GridBasicItemProps = GridBasicComponentProps & NativeAttrs;

type ItemLayoutValue = {
  grow: number;
  width: string;
  basis: string;
  display: string;
};
const getItemLayout = (val: GridBreakpointsValue): ItemLayoutValue => {
  const display = val === 0 ? 'display: none;' : 'display: inherit;';
  if (typeof val === 'number') {
    const width = (100 / 24) * val;
    const ratio = width > 100 ? '100%' : width < 0 ? '0' : `${width}%`;
    return {
      grow: 0,
      display,
      width: ratio,
      basis: ratio,
    };
  }
  return {
    grow: 1,
    display,
    width: '100%',
    basis: '0',
  };
};

const GridBasicItem: React.FC<React.PropsWithChildren<GridBasicItemProps>> = ({
  xs = false as GridBreakpointsValue,
  sm = false as GridBreakpointsValue,
  md = false as GridBreakpointsValue,
  lg = false as GridBreakpointsValue,
  xl = false as GridBreakpointsValue,
  justify,
  order,
  direction,
  alignItems,
  alignContent,
  children,
  className = '',
}: React.PropsWithChildren<GridBasicItemProps>) => {
  const layoutRoot = useLayout();
  const { RESPONSIVE, SCALER, HIDER } = useScale();

  const classes = useMemo(() => {
    const aligns: { [key: string]: any } = {
      justify,
      direction,
      alignItems,
      alignContent,
      order,
      xs,
      sm,
      md,
      lg,
      xl,
    };
    const classString = Object.keys(aligns).reduce((pre, name) => {
      if (aligns[name] !== undefined && aligns[name] !== false) {
        return `${pre} ${name}`;
      }
      return pre;
    }, '');
    return classString.trim();
  }, [justify, order, direction, alignItems, alignContent, xs, sm, md, lg, xl]);

  const layout = useMemo<{
    [key in ['xs', 'sm', 'md', 'lg', 'xl'][number]]: ItemLayoutValue;
  }>(
    () => ({
      xs: getItemLayout(xs),
      sm: getItemLayout(sm),
      md: getItemLayout(md),
      lg: getItemLayout(lg),
      xl: getItemLayout(xl),
    }),
    [xs, sm, md, lg, xl],
  );

  return (
    <div className={useClasses('grid-item', classes, className, HIDER)}>
      {children}
      <style jsx>
        {`
          .xs {
            flex-grow: ${layout.xs.grow};
            max-width: ${layout.xs.width};
            flex-basis: ${layout.xs.basis};
            ${layout.xs.display}
          }

          @media only screen and (min-width: ${layoutRoot.breakpoints.sm.min}) {
            .sm {
              flex-grow: ${layout.sm.grow};
              max-width: ${layout.sm.width};
              flex-basis: ${layout.sm.basis};
              ${layout.sm.display}
            }
          }
          @media only screen and (min-width: ${layoutRoot.breakpoints.md.min}) {
            .md {
              flex-grow: ${layout.md.grow};
              max-width: ${layout.md.width};
              flex-basis: ${layout.md.basis};
              ${layout.md.display}
            }
          }
          @media only screen and (min-width: ${layoutRoot.breakpoints.lg.min}) {
            .lg {
              flex-grow: ${layout.lg.grow};
              max-width: ${layout.lg.width};
              flex-basis: ${layout.lg.basis};
              ${layout.lg.display}
            }
          }
          @media only screen and (min-width: ${layoutRoot.breakpoints.xl.min}) {
            .xl {
              flex-grow: ${layout.xl.grow};
              max-width: ${layout.xl.width};
              flex-basis: ${layout.xl.basis};
              ${layout.xl.display}
            }
          }

          ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'grid-item')}
          ${RESPONSIVE.font(1, value => `font-size: ${value};`, 'inherit', 'grid-item')}

          ${customResponsiveAttribute(order, 'grid-item', layoutRoot.breakpoints, value => `order: ${value};`)}
          ${customResponsiveAttribute(justify, 'grid-item', layoutRoot.breakpoints, value => `justify-content: ${value};`)}
          ${customResponsiveAttribute(direction, 'grid-item', layoutRoot.breakpoints, value => `flex-direction: ${value};`)}
          ${customResponsiveAttribute(alignContent, 'grid-item', layoutRoot.breakpoints, value => `align-content: ${value};`)}
          ${customResponsiveAttribute(alignItems, 'grid-item', layoutRoot.breakpoints, value => `align-items: ${value};`)}

          ${SCALER('grid-item')}
        `}
      </style>
    </div>
  );
};

GridBasicItem.displayName = 'HimalayaGridBasicItem';
export default GridBasicItem;
