'use client';

import React, { forwardRef } from 'react';
import useLayout from '../use-layout';
import { ScaleConfig, ScaleContext, ScaleProps } from './scale-context';
import {
  generateGetAllScaleProps,
  generateGetScaleProps,
  makeScaleHandler,
  makeScaleHandler4X,
  makeScaleHandlerResponsive,
  makeScaleHandlerResponsive4X,
} from './utils';

export type ContentScaleProps = {
  children?: React.ReactNode | (() => React.ReactNode) | string | undefined | null | number;
} & ScaleProps;

const withScale = <T, P = {}>(Render: React.ComponentType<P & { ref?: React.Ref<T> }>) => {
  const ScaleFC = forwardRef<T, P & ContentScaleProps>(({ children, ...props }, ref) => {
    const layout = useLayout();
    const { r, pl, pr, pt, pb, mt, mr, mb, ml, px, py, mx, my, font, w, h, m, p, lineHeight, unit = layout.unit, scale = 1, ...innerProps } = props;

    const value: ScaleConfig = {
      unit: unit,
      SCALES: {
        pt: makeScaleHandler(pt ?? py ?? p, scale, unit),
        r: makeScaleHandler(r, scale, unit),
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
        lineHeight: makeScaleHandler(lineHeight, scale, unit),
        padding: makeScaleHandler4X(pl ?? px ?? p, pr ?? px ?? p, pt ?? py ?? p, pb ?? py ?? p, scale, unit),
        margin: makeScaleHandler4X(ml ?? mx ?? m, mr ?? mx ?? m, mt ?? my ?? m, mb ?? my ?? m, scale, unit),
      },
      RESPONSIVE: {
        r: makeScaleHandlerResponsive(r, scale, unit, layout.breakpoints, 'radius'),
        pt: makeScaleHandlerResponsive(pt ?? py ?? p, scale, unit, layout.breakpoints, 'padding'),
        pr: makeScaleHandlerResponsive(pr ?? px ?? p, scale, unit, layout.breakpoints, 'padding'),
        pb: makeScaleHandlerResponsive(pb ?? py ?? p, scale, unit, layout.breakpoints, 'padding'),
        pl: makeScaleHandlerResponsive(pl ?? px ?? p, scale, unit, layout.breakpoints, 'padding'),

        padding: makeScaleHandlerResponsive4X(pl ?? px ?? p, pr ?? px ?? p, pt ?? py ?? p, pb ?? py ?? p, scale, unit, layout.breakpoints, 'padding'),
        margin: makeScaleHandlerResponsive4X(ml ?? mx ?? m, mr ?? mx ?? m, mt ?? my ?? m, mb ?? my ?? m, scale, unit, layout.breakpoints, 'margin'),

        px: makeScaleHandlerResponsive(px ?? pl ?? pr ?? p, scale, unit, layout.breakpoints, 'padding'),
        py: makeScaleHandlerResponsive(py ?? pt ?? pb ?? p, scale, unit, layout.breakpoints, 'padding'),

        mt: makeScaleHandlerResponsive(mt ?? my ?? m, scale, unit, layout.breakpoints, 'margin'),
        mr: makeScaleHandlerResponsive(mr ?? mx ?? m, scale, unit, layout.breakpoints, 'margin'),
        mb: makeScaleHandlerResponsive(mb ?? my ?? m, scale, unit, layout.breakpoints, 'margin'),
        ml: makeScaleHandlerResponsive(ml ?? mx ?? m, scale, unit, layout.breakpoints, 'margin'),

        mx: makeScaleHandlerResponsive(mx ?? ml ?? mr ?? m, scale, unit, layout.breakpoints, 'margin'),
        my: makeScaleHandlerResponsive(my ?? mt ?? mb ?? m, scale, unit, layout.breakpoints, 'margin'),

        w: makeScaleHandlerResponsive(w ?? w, scale, unit, layout.breakpoints, 'width'),
        h: makeScaleHandlerResponsive(h ?? h, scale, unit, layout.breakpoints, 'height'),
        font: makeScaleHandlerResponsive(font, scale, unit, layout.breakpoints, 'font'),
        lineHeight: makeScaleHandlerResponsive(lineHeight, scale, unit, layout.breakpoints, 'lineHeight'),
      },
      getScaleProps: generateGetScaleProps(props),
      getAllScaleProps: generateGetAllScaleProps(props),
    };

    return (
      <ScaleContext.Provider value={value}>
        <Render {...(innerProps as P)} ref={ref}>
          {children}
        </Render>
      </ScaleContext.Provider>
    );
  });
  ScaleFC.displayName = `Scale${Render.displayName || 'Wrapper'}`;
  return ScaleFC;
};

export default withScale;
