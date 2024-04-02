import _ from 'lodash';
import css from 'styled-jsx/css';
import { UIThemesBreakpoints } from '../use-config/shared';
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
  HideInterface,
  HideUpOrDown,
  ScalePropKeys,
  ScaleProps,
  ScaleResponsiveParameter,
  ScaleResponsivePipe,
} from './scale-context';

export const generateGetScaleProps = <P>(props: P & ScaleProps): GetScalePropsFunction => {
  const getScaleProps: GetScalePropsFunction = keyOrKeys => {
    if (!Array.isArray(keyOrKeys)) return props[keyOrKeys as keyof ScaleProps];
    for (const key of keyOrKeys) {
      const currentValue = props[key];
      if (typeof currentValue !== 'undefined') {
        return currentValue;
      }
    }
    return undefined;
  };
  return getScaleProps;
};
export const reduceScaleCoefficient = (scale: number) => {
  if (scale === 1) return scale;
  const diff = Math.abs((scale - 1) / 2);
  return scale > 1 ? 1 + diff : 1 - diff;
};

export const scaleHandler4X =
  (
    left: ScaleResponsiveParameter | undefined,
    right: ScaleResponsiveParameter | undefined,
    top: ScaleResponsiveParameter | undefined,
    bottom: ScaleResponsiveParameter | undefined,
    breakpoints: UIThemesBreakpoints,
    className: string,
  ): DynamicLayoutResponsivePipe4X =>
  (scale1x, render, defaultValue, renderClassName) => {
    const t = getResponsiveValues(top, typeof scale1x === 'object' ? scale1x.top : scale1x, typeof defaultValue === 'object' ? defaultValue.top : defaultValue);
    const l = getResponsiveValues(
      left,
      typeof scale1x === 'object' ? scale1x.left : scale1x,
      typeof defaultValue === 'object' ? defaultValue.left : defaultValue,
    );
    const r = getResponsiveValues(
      right,

      typeof scale1x === 'object' ? scale1x.right : scale1x,
      typeof defaultValue === 'object' ? defaultValue.right : defaultValue,
    );
    const b = getResponsiveValues(
      bottom,
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
      if (t[key] !== undefined || b[key] !== undefined || r[key] !== undefined || l[key] !== undefined) {
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
  (attrValue: ScaleResponsiveParameter | undefined): DynamicLayoutPipe =>
  (scale1x, defaultValue) => {
    return getSingleHandlerValue(attrValue, scale1x, defaultValue);
  };

export const makeScaleHandler4X =
  (
    left: ScaleResponsiveParameter | undefined,
    right: ScaleResponsiveParameter | undefined,
    top: ScaleResponsiveParameter | undefined,
    bottom: ScaleResponsiveParameter | undefined,
  ): DynamicLayoutPipe4X =>
  (scale1x, defaultValue) => {
    const t = getSingleHandlerValue(
      top,
      typeof scale1x === 'object' ? scale1x.top : scale1x,
      typeof defaultValue === 'object' ? defaultValue.top : defaultValue,
    );
    const l = getSingleHandlerValue(
      left,
      typeof scale1x === 'object' ? scale1x.left : scale1x,
      typeof defaultValue === 'object' ? defaultValue.left : defaultValue,
    );
    const r = getSingleHandlerValue(
      right,
      typeof scale1x === 'object' ? scale1x.right : scale1x,
      typeof defaultValue === 'object' ? defaultValue.right : defaultValue,
    );
    const b = getSingleHandlerValue(
      bottom,
      typeof scale1x === 'object' ? scale1x.bottom : scale1x,
      typeof defaultValue === 'object' ? defaultValue.bottom : defaultValue,
    );

    return `${t} ${r} ${b} ${l}`;
  };

export const getSingleHandlerValue = (attrValue, scale1x: number, defaultValue?: number | string): string => {
  if (scale1x === 0) {
    scale1x = 1;
    defaultValue = defaultValue || 0;
  }

  if (typeof attrValue === 'undefined') {
    if (typeof defaultValue !== 'undefined') return `${defaultValue}`;
    return `calc(var(--scale-unit-scale) * ${scale1x})`;
  }

  if (typeof attrValue === 'object') {
    if ('xs' in attrValue) {
      const xsValue = attrValue['xs'];
      if (!isCSSNumberValue(xsValue)) return `${xsValue}`;
      return `calc(var(--scale-unit-scale)  * ${scale1x} * ${Number(xsValue)})`;
    } else {
      return `${defaultValue}`;
    }
  } else {
    if (!isCSSNumberValue(attrValue)) return `${attrValue}`;
    return `calc(var(--scale-unit-scale) * ${Number(attrValue)} * ${scale1x})`;
  }
};

export const getResponsiveValues = (
  attrValue: ScaleResponsiveParameter | undefined,
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
  if (typeof attrValue === 'undefined') {
    if (typeof defaultValue !== 'undefined') {
      result.xs = defaultValue;
    } else {
      result.xs = `calc(var(--scale-unit-scale) * ${scale1x})`;
    }
  } else if (typeof attrValue === 'object' && attrValue !== undefined) {
    for (const [key, value] of Object.entries(attrValue)) {
      if (key === 'xs') {
        if (typeof value === 'undefined') {
          if (typeof defaultValue !== 'undefined') {
            result.xs = defaultValue;
          } else {
            result.xs = `calc(var(--scale-unit-scale) * ${scale1x})`;
          }
        } else {
          if (!isCSSNumberValue(value)) {
            result.xs = value;
          } else {
            result.xs = `calc(var(--scale-unit-scale) * ${Number(value)} * ${scale1x})`;
          }
        }
      } else {
        if (!isCSSNumberValue(value)) {
          result[key] = value;
        } else {
          result[key] = `calc(var(--scale-unit-scale) * ${Number(value)} * ${scale1x})`;
        }
      }
    }
  }
  //is not responive object
  else if (typeof attrValue !== 'object') {
    if (!isCSSNumberValue(attrValue)) {
      result['xs'] = attrValue;
    } else {
      result['xs'] = `calc(var(--scale-unit-scale) * ${Number(attrValue)} * ${scale1x})`;
    }
  }

  return result;
};

export const scaleHandler1X =
  (attrValue: ScaleResponsiveParameter | undefined, breakpoints: UIThemesBreakpoints, className: string): DynamicLayoutResponsivePipe =>
  (scale1x, render, defaultValue, renderClassName) => {
    let responsiveContent: string = ``;
    const values = getResponsiveValues(attrValue, scale1x, defaultValue);
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

/**
 * Make a custom attribute reponsive
 * @param property
 * @param className
 * @param breakpoints
 * @param reflect
 * @returns
 */
export const customResponsiveAttribute = (
  property,
  className,
  breakpoints: UIThemesBreakpoints,
  reflect: (value: any, responsive: string) => string,
): string => {
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

export const mergeParameters = (fields: { [key: string]: ScaleResponsiveParameter<any> }) => {
  const result = Object.entries(fields)
    .map(df => {
      df[1] = typeof df[1] !== 'object' ? { xs: df[1] } : df[1];
      return df;
    })
    .map(data => {
      return Object.entries(data[1]).map(item => {
        return {
          key: data[0],
          size: item[0],
          value: item[1],
        };
      });
    });

  return _.groupBy(_.concat(...result), 'size');
};

/**
 * Create scale and unit vars
 * @param scale
 * @param unit
 * @param breakpoints
 * @param className
 * @returns
 */
export const scaleAttribute =
  (scale: ScaleResponsiveParameter<number>, unit: string, breakpoints: UIThemesBreakpoints, className: string): ScaleResponsivePipe =>
  renderClassName => {
    let responsiveContent: string = ``;
    const attributeClassName = renderClassName ?? className;

    if (typeof scale === 'number') {
      const factor = reduceScaleCoefficient(scale);
      responsiveContent += css`
        .${attributeClassName} {
          --scale-factor: ${factor};
          --scale-unit: ${unit};
          --scale-unit-scale: calc(${unit} * ${factor});
        }
      `;
    } else {
      for (const [key, value] of Object.entries(scale)) {
        const factor = reduceScaleCoefficient(value);

        if (key == 'xs') {
          responsiveContent += css`
            .${attributeClassName} {
              --scale-factor: ${factor};
              --scale-unit: ${unit};
              --scale-unit-scale: calc(${unit} * ${factor});
            }
          `;
        } else {
          responsiveContent += css`
            @media only screen and (min-width: ${breakpoints[key].min}) {
              .${attributeClassName} {
                --scale-factor: ${factor};
                --scale-unit: ${unit};
                --scale-unit-scale: calc(${unit} * ${factor});
              }
            }
          `;
        }
      }
    }

    return responsiveContent;
  };

export const extractHideAttributeClassName = (className: string, value: HideInterface | undefined): string[] => {
  const classNames: string[] = [];

  if (value === false || value === undefined) {
    return [];
  } else if (value === true) {
    return [className];
  } else if (value === 'up') {
    return [className + '-up'];
  } else if (value === 'down') {
    return [className + '-down'];
  } else if (typeof value === 'object') {
    for (const key of Object.keys(value)) {
      const brValue: boolean | HideUpOrDown | undefined = value[key];
      if (brValue === undefined || brValue === false) {
        continue;
      }
      if (brValue === true) {
        classNames.push(className + '-' + key);
      } else if (brValue === 'up') {
        classNames.push(className + '-' + key + '-up');
      } else if (brValue === 'down') {
        classNames.push(className + '-' + key + '-down');
      }
    }
  }

  return classNames;
};

/**
 * Create hide attribute classes
 * @param scale
 * @param unit
 * @param breakpoints
 * @param className
 * @returns
 */
export const hideAttribute = (hideOn?: HideInterface, showOn?: HideInterface): string | undefined => {
  const hideClasses: string[] = [...extractHideAttributeClassName('hide', hideOn), ...extractHideAttributeClassName('show', showOn)];
  return hideClasses.length > 0 ? hideClasses.join(' ') : undefined;
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
