import css from 'styled-jsx/css';
import { UIThemesBreakpoints } from '../use-layout/shared';
import { isCSSNumberValue } from '../utils/collections';
import {
  BreakpointInterface,
  DynamicLayoutPipe,
  DynamicLayoutPipe4X,
  DynamicLayoutResponsivePipe,
  DynamicLayoutResponsivePipe4X,
  DynamicScale4X,
  GetAllScalePropsFunction,
  GetScalePropsFunction,
  ScalePropKeys,
  ScaleProps,
  ScaleResponsiveParameter,
} from './scale-context';

export const generateGetScaleProps = <P>(props: P & ScaleProps): GetScalePropsFunction => {
  const getScaleProps: GetScalePropsFunction = keyOrKeys => {
    if (!Array.isArray(keyOrKeys)) return props[keyOrKeys as keyof ScaleProps];
    let value: string | undefined | number = undefined;
    for (const key of keyOrKeys) {
      const currentValue = props[key];
      if (typeof currentValue !== 'undefined') {
        if (typeof currentValue === 'object' && 'xs' in currentValue) {
          value = currentValue.xs;
        } else {
          value = currentValue;
        }
      }
    }
    return value;
  };
  return getScaleProps;
};
export const reduceScaleCoefficient = (scale: number) => {
  if (scale === 1) return scale;
  const diff = Math.abs((scale - 1) / 2);
  return scale > 1 ? 1 + diff : 1 - diff;
};

export const makeScaleHandlerResponsive4X =
  (
    left: ScaleResponsiveParameter | undefined,
    right: ScaleResponsiveParameter | undefined,
    top: ScaleResponsiveParameter | undefined,
    bottom: ScaleResponsiveParameter | undefined,
    scale: number,
    unit: string,
    breakpoints: UIThemesBreakpoints,
    className: string,
  ): DynamicLayoutResponsivePipe4X =>
  (scale1x, render, defaultValue, renderClassName) => {
    const t = getResponsiveValues(
      top,
      scale,
      unit,
      typeof scale1x === 'object' ? scale1x.top : scale1x,
      typeof defaultValue === 'object' ? defaultValue.top : defaultValue,
    );
    const l = getResponsiveValues(
      left,
      scale,
      unit,
      typeof scale1x === 'object' ? scale1x.left : scale1x,
      typeof defaultValue === 'object' ? defaultValue.left : defaultValue,
    );
    const r = getResponsiveValues(
      right,
      scale,
      unit,
      typeof scale1x === 'object' ? scale1x.right : scale1x,
      typeof defaultValue === 'object' ? defaultValue.right : defaultValue,
    );
    const b = getResponsiveValues(
      bottom,
      scale,
      unit,
      typeof scale1x === 'object' ? scale1x.bottom : scale1x,
      typeof defaultValue === 'object' ? defaultValue.bottom : defaultValue,
    );

    let responsiveContent: string = ``;
    const lastKnowValues: DynamicScale4X<string | number> = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
    for (const [key] of Object.entries(breakpoints)) {
      if (t[key] || b[key] || r[key] || l[key]) {
        if (key == 'xs') {
          responsiveContent += css`
            .${renderClassName ?? className} {
              ${render({ top: t[key], left: l[key], bottom: b[key], right: r[key] }, key)}
            }
          `;
        } else {
          responsiveContent += css`
            @media only screen and (min-width: ${breakpoints[key].min}) {
              .${renderClassName ?? className} {
                ${render(
                  {
                    top: t[key] ?? lastKnowValues.top,
                    left: l[key] ?? lastKnowValues.left,
                    bottom: b[key] ?? lastKnowValues.bottom,
                    right: r[key] ?? lastKnowValues.right,
                  },
                  key,
                )}
              }
            }
          `;
        }

        if (t[key] !== undefined) {
          lastKnowValues.top = t[key];
        }

        if (r[key] !== undefined) {
          lastKnowValues.right = r[key];
        }

        if (b[key] !== undefined) {
          lastKnowValues.bottom = b[key];
        }

        if (l[key] !== undefined) {
          lastKnowValues.left = l[key];
        }
      }
    }

    return `${responsiveContent}`;
  };

export const makeScaleHandler =
  (attrValue: ScaleResponsiveParameter | undefined, scale: number, unit: string): DynamicLayoutPipe =>
  (scale1x, defaultValue) => {
    return getSingleHandlerValue(attrValue, scale, unit, scale1x, defaultValue);
  };

export const makeScaleHandler4X =
  (
    left: ScaleResponsiveParameter | undefined,
    right: ScaleResponsiveParameter | undefined,
    top: ScaleResponsiveParameter | undefined,
    bottom: ScaleResponsiveParameter | undefined,
    scale: number,
    unit: string,
  ): DynamicLayoutPipe4X =>
  (scale1x, defaultValue) => {
    const t = getSingleHandlerValue(
      top,
      scale,
      unit,
      typeof scale1x === 'object' ? scale1x.top : scale1x,
      typeof defaultValue === 'object' ? defaultValue.top : defaultValue,
    );
    const l = getSingleHandlerValue(
      left,
      scale,
      unit,
      typeof scale1x === 'object' ? scale1x.left : scale1x,
      typeof defaultValue === 'object' ? defaultValue.left : defaultValue,
    );
    const r = getSingleHandlerValue(
      right,
      scale,
      unit,
      typeof scale1x === 'object' ? scale1x.right : scale1x,
      typeof defaultValue === 'object' ? defaultValue.right : defaultValue,
    );
    const b = getSingleHandlerValue(
      bottom,
      scale,
      unit,
      typeof scale1x === 'object' ? scale1x.bottom : scale1x,
      typeof defaultValue === 'object' ? defaultValue.bottom : defaultValue,
    );

    return `${t} ${r} ${b} ${l}`;
  };

export const getSingleHandlerValue = (attrValue, scale: number, unit: string, scale1x: number, defaultValue?: number | string): string => {
  if (scale1x === 0) {
    scale1x = 1;
    defaultValue = defaultValue || 0;
  }
  const factor = reduceScaleCoefficient(scale) * scale1x;

  if (typeof attrValue === 'undefined') {
    if (typeof defaultValue !== 'undefined') return `${defaultValue}`;
    return `calc(${factor} * ${unit})`;
  }

  if (typeof attrValue === 'object') {
    if ('xs' in attrValue) {
      const xsValue = attrValue['xs'];
      if (!isCSSNumberValue(xsValue)) return `${xsValue}`;
      const customFactor = factor * Number(xsValue);
      return `calc(${customFactor} * ${unit})`;
    } else {
      return `${defaultValue}`;
    }
  } else {
    if (!isCSSNumberValue(attrValue)) return `${attrValue}`;
    const customFactor = factor * Number(attrValue);
    return `calc(${customFactor} * ${unit})`;
  }
};

export const getResponsiveValues = (
  attrValue: ScaleResponsiveParameter | undefined,
  scale: number,
  unit: string,
  scale1x: number,
  defaultValue?: string | number,
): BreakpointInterface<string | number> => {
  const result: BreakpointInterface<string | number> = {
    xs: 0,
  };
  if (scale1x === 0) {
    scale1x = 1;
    defaultValue = defaultValue || 0;
  }
  const factor = reduceScaleCoefficient(scale) * scale1x;
  if (typeof attrValue === 'undefined') {
    if (typeof defaultValue !== 'undefined') {
      result.xs = defaultValue;
    } else {
      result.xs = `calc(${factor} * ${unit})`;
    }
  } else if (typeof attrValue === 'object' && attrValue !== undefined) {
    for (const [key, value] of Object.entries(attrValue)) {
      if (key === 'xs') {
        if (typeof value === 'undefined') {
          if (typeof defaultValue !== 'undefined') {
            result.xs = defaultValue;
          } else {
            result.xs = `calc(${factor} * ${unit})`;
          }
        } else {
          if (!isCSSNumberValue(value)) {
            result.xs = value;
          } else {
            result.xs = `calc(${factor * Number(value)} * ${unit})`;
          }
        }
      } else {
        if (!isCSSNumberValue(value)) {
          result[key] = value;
        } else {
          result[key] = `calc(${factor * Number(value)} * ${unit})`;
        }
      }
    }
  }
  //is not responive object
  else if (typeof attrValue !== 'object') {
    if (!isCSSNumberValue(attrValue)) {
      result['xs'] = attrValue;
    } else {
      result['xs'] = `calc(${factor * Number(attrValue)} * ${unit})`;
    }
  }

  return result;
};

export const makeScaleHandlerResponsive =
  (
    attrValue: ScaleResponsiveParameter | undefined,
    scale: number,
    unit: string,
    breakpoints: UIThemesBreakpoints,
    className: string,
  ): DynamicLayoutResponsivePipe =>
  (scale1x, render, defaultValue, renderClassName) => {
    let responsiveContent: string = ``;
    const values = getResponsiveValues(attrValue, scale, unit, scale1x, defaultValue);

    for (const [key, value] of Object.entries(values)) {
      if (key == 'xs') {
        responsiveContent += css`
          .${renderClassName ?? className} {
            ${render(value, 'xs')}
          }
        `;
      } else {
        responsiveContent += css`
          @media only screen and (min-width: ${breakpoints[key].min}) {
            .${renderClassName ?? className} {
              ${render(value, key)}
            }
          }
        `;
      }
    }

    return responsiveContent;
  };

export const generateGetAllScaleProps = <P>(props: P & ScaleProps): GetAllScalePropsFunction => {
  const getAllScaleProps: GetAllScalePropsFunction = () => {
    const scaleProps: ScaleProps = {};
    for (const key of ScalePropKeys) {
      const value = props[key as keyof ScaleProps];
      if (typeof value !== 'undefined') {
        scaleProps[key as keyof ScaleProps] = value as any;
      }
    }
    return scaleProps;
  };
  return getAllScaleProps;
};

export const responsiveCss = (property, className, breakpoints: UIThemesBreakpoints, reflect: (value: any, responsive: string) => string): string => {
  let responsiveContent: string = ``;
  if (typeof property === 'object' && 'xs' in property) {
    for (const key in property) {
      const value = property[key];
      if (key == 'xs' && value !== undefined && value !== null) {
        responsiveContent += css`
          .${className} {
            ${reflect(value, key)}
          }
        `;
      } else if (value !== undefined && value !== null) {
        responsiveContent += css`
          @media only screen and (min-width: ${breakpoints[key].min}) {
            .${className} {
              ${reflect(value, key)}
            }
          }
        `;
      }
    }
  } else if (property != undefined && property != null) {
    responsiveContent += css`
      .${className} {
        ${reflect(property, 'xs')}
      }
    `;
  }

  return responsiveContent;
};
