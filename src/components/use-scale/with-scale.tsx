'use client';

import React, { forwardRef } from 'react';
import { useConfig } from '../use-config';
import { ScaleConfig, ScaleContext, ScaleProps } from './scale-context';
import { generateGetAllScaleProps, generateGetScaleProps, hideAttribute, scaleAttribute, scaleHandler1X, scaleHandler4X } from './utils';

export type ContentScaleProps = {
  children?: React.ReactNode | (() => React.ReactNode) | string | undefined | null | number;
} & ScaleProps;

const withScale = <T, P = {}>(Render: React.ComponentType<P & { ref?: React.Ref<T> }>, className: string = 'component') => {
  const ScaleFC = forwardRef<T, P & ContentScaleProps>(({ children, ...props }, ref) => {
    const { layout } = useConfig();
    const {
      r,
      pl,
      pr,
      pt,
      pb,
      mt,
      mr,
      mb,
      ml,
      px,
      py,
      mx,
      my,
      font,
      w,
      h,
      m,
      p,
      hideOn,
      showOn,
      lineHeight,
      unit = 'var(--layout-unit)',
      scale = 1,
      ...innerProps
    } = props;

    const value: ScaleConfig = {
      unit: unit,

      UNIT: scaleAttribute(scale, unit, layout.breakpoints, className),
      CLASS_NAMES: hideAttribute(hideOn, showOn),
      SCALE: {
        r: scaleHandler1X(r, layout.breakpoints, className),
        pt: scaleHandler1X(pt ?? py ?? p, layout.breakpoints, className),
        pr: scaleHandler1X(pr ?? px ?? p, layout.breakpoints, className),
        pb: scaleHandler1X(pb ?? py ?? p, layout.breakpoints, className),
        pl: scaleHandler1X(pl ?? px ?? p, layout.breakpoints, className),

        padding: scaleHandler4X(pl ?? px ?? p, pr ?? px ?? p, pt ?? py ?? p, pb ?? py ?? p, layout.breakpoints, className),
        margin: scaleHandler4X(ml ?? mx ?? m, mr ?? mx ?? m, mt ?? my ?? m, mb ?? my ?? m, layout.breakpoints, className),

        px: scaleHandler1X(px ?? pl ?? pr ?? p, layout.breakpoints, className),
        py: scaleHandler1X(py ?? pt ?? pb ?? p, layout.breakpoints, className),

        mt: scaleHandler1X(mt ?? my ?? m, layout.breakpoints, className),
        mr: scaleHandler1X(mr ?? mx ?? m, layout.breakpoints, className),
        mb: scaleHandler1X(mb ?? my ?? m, layout.breakpoints, className),
        ml: scaleHandler1X(ml ?? mx ?? m, layout.breakpoints, className),

        mx: scaleHandler1X(mx ?? ml ?? mr ?? m, layout.breakpoints, className),
        my: scaleHandler1X(my ?? mt ?? mb ?? m, layout.breakpoints, className),

        w: scaleHandler1X(w ?? w, layout.breakpoints, className),
        h: scaleHandler1X(h ?? h, layout.breakpoints, className),
        font: scaleHandler1X(font, layout.breakpoints, className),
        lineHeight: scaleHandler1X(lineHeight, layout.breakpoints, className),
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
