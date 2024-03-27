'use client';

import React, { forwardRef } from 'react';
import useLayout from '../use-layout';
import { ScaleConfig, ScaleContext, ScaleProps } from './scale-context';
import {
  generateGetAllScaleProps,
  generateGetScaleProps,
  makeScaleHandler,
  makeScaleHandler4X,
  scaleHandler1X,
  scaleHandler4X,
  scaleAttribute,
  hideAttribute,
} from './utils';

export type ContentScaleProps = {
  children?: React.ReactNode | (() => React.ReactNode) | string | undefined | null | number;
} & ScaleProps;

const withScale = <T, P = {}>(Render: React.ComponentType<P & { ref?: React.Ref<T> }>) => {
  const ScaleFC = forwardRef<T, P & ContentScaleProps>(({ children, ...props }, ref) => {
    const layout = useLayout();
    const { r, pl, pr, pt, pb, mt, mr, mb, ml, px, py, mx, my, font, w, h, m, p, hideOn, lineHeight, unit = layout.unit, scale = 1, ...innerProps } = props;

    const value: ScaleConfig = {
      unit: unit,
      SCALES: {
        pt: makeScaleHandler(pt ?? py ?? p),
        r: makeScaleHandler(r),
        pr: makeScaleHandler(pr ?? px ?? p),
        pb: makeScaleHandler(pb ?? py ?? p),
        pl: makeScaleHandler(pl ?? px ?? p),
        px: makeScaleHandler(px ?? pl ?? pr ?? p),
        py: makeScaleHandler(py ?? pt ?? pb ?? p),
        mt: makeScaleHandler(mt ?? my ?? m),
        mr: makeScaleHandler(mr ?? mx ?? m),
        mb: makeScaleHandler(mb ?? my ?? m),
        ml: makeScaleHandler(ml ?? mx ?? m),
        mx: makeScaleHandler(mx ?? ml ?? mr ?? m),
        my: makeScaleHandler(my ?? mt ?? mb ?? m),
        w: makeScaleHandler(w ?? w),
        h: makeScaleHandler(h ?? h),
        font: makeScaleHandler(font),
        lineHeight: makeScaleHandler(lineHeight),
        padding: makeScaleHandler4X(pl ?? px ?? p, pr ?? px ?? p, pt ?? py ?? p, pb ?? py ?? p),
        margin: makeScaleHandler4X(ml ?? mx ?? m, mr ?? mx ?? m, mt ?? my ?? m, mb ?? my ?? m),
      },
      SCALER: scaleAttribute(scale, unit, layout.breakpoints, 'scale'),
      HIDER: hideAttribute(hideOn),
      RESPONSIVE: {
        r: scaleHandler1X(r, layout.breakpoints, 'radius'),
        pt: scaleHandler1X(pt ?? py ?? p, layout.breakpoints, 'padding'),
        pr: scaleHandler1X(pr ?? px ?? p, layout.breakpoints, 'padding'),
        pb: scaleHandler1X(pb ?? py ?? p, layout.breakpoints, 'padding'),
        pl: scaleHandler1X(pl ?? px ?? p, layout.breakpoints, 'padding'),

        padding: scaleHandler4X(pl ?? px ?? p, pr ?? px ?? p, pt ?? py ?? p, pb ?? py ?? p, layout.breakpoints, 'padding'),
        margin: scaleHandler4X(ml ?? mx ?? m, mr ?? mx ?? m, mt ?? my ?? m, mb ?? my ?? m, layout.breakpoints, 'margin'),

        px: scaleHandler1X(px ?? pl ?? pr ?? p, layout.breakpoints, 'padding'),
        py: scaleHandler1X(py ?? pt ?? pb ?? p, layout.breakpoints, 'padding'),

        mt: scaleHandler1X(mt ?? my ?? m, layout.breakpoints, 'margin'),
        mr: scaleHandler1X(mr ?? mx ?? m, layout.breakpoints, 'margin'),
        mb: scaleHandler1X(mb ?? my ?? m, layout.breakpoints, 'margin'),
        ml: scaleHandler1X(ml ?? mx ?? m, layout.breakpoints, 'margin'),

        mx: scaleHandler1X(mx ?? ml ?? mr ?? m, layout.breakpoints, 'margin'),
        my: scaleHandler1X(my ?? mt ?? mb ?? m, layout.breakpoints, 'margin'),

        w: scaleHandler1X(w ?? w, layout.breakpoints, 'width'),
        h: scaleHandler1X(h ?? h, layout.breakpoints, 'height'),
        font: scaleHandler1X(font, layout.breakpoints, 'font'),
        lineHeight: scaleHandler1X(lineHeight, layout.breakpoints, 'lineHeight'),
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
