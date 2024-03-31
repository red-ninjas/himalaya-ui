'use client';

import React, { forwardRef } from 'react';
import useLayout from '../use-layout';
import { ScaleConfig, ScaleContext, ScaleProps } from './scale-context';
import { generateGetAllScaleProps, generateGetScaleProps, hideAttribute, scaleAttribute, scaleHandler1X, scaleHandler4X } from './utils';

export type ContentScaleProps = {
  children?: React.ReactNode | (() => React.ReactNode) | string | undefined | null | number;
} & ScaleProps;

const withScale = <T, P = {}>(Render: React.ComponentType<P & { ref?: React.Ref<T> }>) => {
  const ScaleFC = forwardRef<T, P & ContentScaleProps>(({ children, ...props }, ref) => {
    const layout = useLayout();
    const { r, pl, pr, pt, pb, mt, mr, mb, ml, px, py, mx, my, font, w, h, m, p, hideOn, lineHeight, unit = layout.unit, scale = 1, ...innerProps } = props;

    const value: ScaleConfig = {
      unit: unit,

      SCALER: scaleAttribute(scale, unit, layout.breakpoints, 'scale'),
      SCALE_CLASSES: hideAttribute(hideOn),
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
