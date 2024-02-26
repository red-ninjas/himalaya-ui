'use client';
import React from 'react';

export const ScalePropKeys = ['p', 'm', 'w', 'h', 'pl', 'pr', 'pt', 'pb', 'ml', 'mr', 'mt', 'mb', 'px', 'py', 'mx', 'my', 'font', 'unit', 'scale'];

export type BreakpointInterface<T = number | string> = {
  xs: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export type ScaleResponsiveParameter<T = number | string> = T | BreakpointInterface<T>;

export type ScaleProps = {
  p?: ScaleResponsiveParameter;
  m?: ScaleResponsiveParameter;
  w?: ScaleResponsiveParameter;
  h?: ScaleResponsiveParameter;
  pl?: ScaleResponsiveParameter;
  pr?: ScaleResponsiveParameter;
  pt?: ScaleResponsiveParameter;
  pb?: ScaleResponsiveParameter;
  ml?: ScaleResponsiveParameter;
  mr?: ScaleResponsiveParameter;
  mt?: ScaleResponsiveParameter;
  mb?: ScaleResponsiveParameter;
  px?: ScaleResponsiveParameter;
  py?: ScaleResponsiveParameter;
  mx?: ScaleResponsiveParameter;
  my?: ScaleResponsiveParameter;
  font?: ScaleResponsiveParameter;
  lineHeight?: ScaleResponsiveParameter;
  unit?: string;
  scale?: number;
};

export interface DynamicScale4X<T> {
  left: T;
  right: T;
  top: T;
  bottom: T;
}
export interface DynamicScale4XOptional<T> {
  left?: T;
  right?: T;
  top?: T;
  bottom?: T;
}
export type IRenderFunction4XResponsive = (values: DynamicScale4X<string | number>, responiveType: string) => string;

export type DynamicLayoutPipe = (scale1x: number, defaultValue?: string | number) => string;
export type DynamicLayoutPipe4X = (scale1x: DynamicScale4X<number>, defaultValue?: DynamicScale4X<string | number>) => string;
export type IRenderFunction = (value: string | number, responiveType: string) => string;
export type DynamicLayoutResponsivePipe = (scale1x: number, render: IRenderFunction, defaultValue?: string | number, className?: string) => string | undefined;

export type DynamicLayoutResponsivePipe4X = (
  scale1x: DynamicScale4X<number> | number,
  render: IRenderFunction4XResponsive,
  defaultValue?: DynamicScale4XOptional<string | number> | string | number,
  className?: string,
) => string | undefined;

export type ScaleInputKeys = 'pl' | 'pr' | 'pt' | 'pb' | 'px' | 'py' | 'ml' | 'mr' | 'mt' | 'mb' | 'mx' | 'my' | 'w' | 'h' | 'font' | 'lineHeight';

export type DynamicScalesExtra = {
  padding: DynamicLayoutPipe4X;
  margin: DynamicLayoutPipe4X;
};
export type DynamicScales = {
  [key in ScaleInputKeys]: DynamicLayoutPipe;
} & DynamicScalesExtra;

export type DynamicResponsiveScalesExtra = {
  padding: DynamicLayoutResponsivePipe4X;
  margin: DynamicLayoutResponsivePipe4X;
};
export type DynamicResponsiveScales = {
  [key in ScaleInputKeys]: DynamicLayoutResponsivePipe;
} & DynamicResponsiveScalesExtra;

export type GetScalePropsFunction = (key: keyof ScaleProps | Array<keyof ScaleProps>) => ScaleProps[keyof ScaleProps];

export type GetAllScalePropsFunction = () => ScaleProps;

export interface ScaleConfig {
  SCALES: DynamicScales;
  RESPONSIVE: DynamicResponsiveScales;
  getScaleProps: GetScalePropsFunction;
  getAllScaleProps: GetAllScalePropsFunction;
  unit: string;
}

const defaultDynamicLayoutPipe: DynamicLayoutPipe = scale1x => {
  return `${scale1x}`;
};

const defaultDynamicLayoutPipe4x: DynamicLayoutPipe4X = scale1x => {
  return `${scale1x.top} ${scale1x.right} ${scale1x.bottom} ${scale1x.left}`;
};

const defaultDynamicResponsiveLayoutPipe = () => undefined;

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
    lineHeight: defaultDynamicLayoutPipe,
    margin: defaultDynamicLayoutPipe4x,
    padding: defaultDynamicLayoutPipe4x,
  },
  RESPONSIVE: {
    pl: defaultDynamicResponsiveLayoutPipe,
    pr: defaultDynamicResponsiveLayoutPipe,
    pb: defaultDynamicResponsiveLayoutPipe,
    pt: defaultDynamicResponsiveLayoutPipe,
    px: defaultDynamicResponsiveLayoutPipe,
    py: defaultDynamicResponsiveLayoutPipe,
    mb: defaultDynamicResponsiveLayoutPipe,
    ml: defaultDynamicResponsiveLayoutPipe,
    mr: defaultDynamicResponsiveLayoutPipe,
    mt: defaultDynamicResponsiveLayoutPipe,
    mx: defaultDynamicResponsiveLayoutPipe,
    my: defaultDynamicResponsiveLayoutPipe,
    w: defaultDynamicResponsiveLayoutPipe,
    h: defaultDynamicResponsiveLayoutPipe,
    font: defaultDynamicResponsiveLayoutPipe,
    lineHeight: defaultDynamicResponsiveLayoutPipe,
    margin: defaultDynamicResponsiveLayoutPipe,
    padding: defaultDynamicResponsiveLayoutPipe,
  },
  unit: '16px',
};

export const extractNumberFromScaleProp = (scale: ScaleResponsiveParameter): number => {
  if (typeof scale === 'object' && 'xs' in scale) {
    return typeof scale.xs === 'string' ? parseFloat(scale.xs) : scale.xs;
  } else {
    return typeof scale === 'string' ? parseFloat(scale) : scale;
  }
};

export const extractStringFromScaleProp = (scale: ScaleResponsiveParameter<string | undefined>): string | undefined => {
  if (typeof scale === 'object' && 'xs' in scale) {
    return scale.xs;
  } else {
    return scale;
  }
};

export const ScaleContext = React.createContext<ScaleConfig>(defaultContext);
export const useScale = (): ScaleConfig => React.useContext<ScaleConfig>(ScaleContext);
