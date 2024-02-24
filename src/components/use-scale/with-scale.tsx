'use client';

import React, { forwardRef } from 'react';
import { ScaleConfig, ScaleContext, ScaleProps } from './scale-context';
import { generateGetAllScaleProps, generateGetScaleProps, makeScaleHandler } from './utils';
import useLayout from '../use-layout';

export type ContentScaleProps = {
  children?: React.ReactNode | (() => React.ReactNode) | string | undefined | null | number;
} & ScaleProps;

const withScale = <T, P = {}>(Render: React.ComponentType<P & { ref?: React.Ref<T> }>) => {
  const ScaleFC = forwardRef<T, P & ContentScaleProps>(({ children, ...props }, ref) => {
    const layout = useLayout();
    const { pl, pr, pt, pb, mt, mr, mb, ml, px, py, mx, my, font, w, h, m, p, unit = layout.unit, scale = 1, ...innerProps } = props;

    const value: ScaleConfig = {
      unit: unit,
      SCALES: {
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
