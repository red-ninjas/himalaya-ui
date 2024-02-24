'use client';
import React from 'react';

export const ScalePropKeys = ['p', 'm', 'w', 'h', 'pl', 'pr', 'pt', 'pb', 'ml', 'mr', 'mt', 'mb', 'px', 'py', 'mx', 'my', 'font', 'unit', 'scale'];
export type ScaleNumberOrString = number | string;

export interface BreakpointInterface {
  xs: ScaleNumberOrString;
  sm?: ScaleNumberOrString;
  md?: ScaleNumberOrString;
  lg?: ScaleNumberOrString;
  xl?: ScaleNumberOrString;
}

export type ScaleNumberOrStringOrBreakpoint = number | string | BreakpointInterface;

export type ScaleProps = {
  p?: ScaleNumberOrStringOrBreakpoint;
  m?: ScaleNumberOrStringOrBreakpoint;
  w?: ScaleNumberOrStringOrBreakpoint;
  h?: ScaleNumberOrStringOrBreakpoint;
  pl?: ScaleNumberOrStringOrBreakpoint;
  pr?: ScaleNumberOrStringOrBreakpoint;
  pt?: ScaleNumberOrStringOrBreakpoint;
  pb?: ScaleNumberOrStringOrBreakpoint;
  ml?: ScaleNumberOrStringOrBreakpoint;
  mr?: ScaleNumberOrStringOrBreakpoint;
  mt?: ScaleNumberOrStringOrBreakpoint;
  mb?: ScaleNumberOrStringOrBreakpoint;
  px?: ScaleNumberOrStringOrBreakpoint;
  py?: ScaleNumberOrStringOrBreakpoint;
  mx?: ScaleNumberOrStringOrBreakpoint;
  my?: ScaleNumberOrStringOrBreakpoint;
  font?: ScaleNumberOrStringOrBreakpoint;
  unit?: string;
  scale?: number;
};

export type DynamicLayoutPipe = (scale1x: number, defaultValue?: string | number) => string;

export type ScaleInputKeys = 'pl' | 'pr' | 'pt' | 'pb' | 'px' | 'py' | 'ml' | 'mr' | 'mt' | 'mb' | 'mx' | 'my' | 'w' | 'h' | 'font';

export type DynamicScales = {
  [key in ScaleInputKeys]: DynamicLayoutPipe;
};

export type GetScalePropsFunction = (key: keyof ScaleProps | Array<keyof ScaleProps>) => ScaleProps[keyof ScaleProps];

export type GetAllScalePropsFunction = () => ScaleProps;

export interface ScaleConfig {
  SCALES: DynamicScales;
  getScaleProps: GetScalePropsFunction;
  getAllScaleProps: GetAllScalePropsFunction;
  unit: string;
}

const defaultDynamicLayoutPipe: DynamicLayoutPipe = scale1x => {
  return `${scale1x}`;
};

const defaultContext: ScaleConfig = {
  getScaleProps: () => undefined,
  getAllScaleProps: () => ({}),
  SCALES: {
    pl: defaultDynamicLayoutPipe,
    pr: defaultDynamicLayoutPipe,
    pb: defaultDynamicLayoutPipe,
    pt: defaultDynamicLayoutPipe,
    px: defaultDynamicLayoutPipe,
    py: defaultDynamicLayoutPipe,
    mb: defaultDynamicLayoutPipe,
    ml: defaultDynamicLayoutPipe,
    mr: defaultDynamicLayoutPipe,
    mt: defaultDynamicLayoutPipe,
    mx: defaultDynamicLayoutPipe,
    my: defaultDynamicLayoutPipe,
    w: defaultDynamicLayoutPipe,
    h: defaultDynamicLayoutPipe,
    font: defaultDynamicLayoutPipe,
  },
  unit: '16px',
};

export const extractNumberFromScaleProp = (scale: ScaleNumberOrStringOrBreakpoint): number => {
  if (typeof scale === 'object' && 'xs' in scale) {
    return typeof scale.xs === 'string' ? parseFloat(scale.xs) : scale.xs;
  } else {
    return typeof scale === 'string' ? parseFloat(scale) : scale;
  }
};

export const ScaleContext = React.createContext<ScaleConfig>(defaultContext);
export const useScale = (): ScaleConfig => React.useContext<ScaleConfig>(ScaleContext);
