'use client';
import React from 'react';
import css from 'styled-jsx/css';
import useClasses from '../use-classes';
import useConfig from '../use-config';
import useScale, { ScaleResponsiveParameter, customResponsiveAttribute, withScale } from '../use-scale';
import GridBasicItem, { GridBasicItemProps } from './basic-item';
import { GridWrap } from './grid-types';

interface Props {
  gap?: ScaleResponsiveParameter<number>;
  rowGap?: ScaleResponsiveParameter<number>;
  order?: ScaleResponsiveParameter<number>;
  wrap?: ScaleResponsiveParameter<GridWrap>;
  className?: string;
}

export type GridContainerProps = Props & GridBasicItemProps;

const GridContainerComponent: React.FC<React.PropsWithChildren<GridContainerProps>> = ({
  gap = 0,
  rowGap,
  wrap = 'wrap',
  children,
  className = '',
  ...props
}: React.PropsWithChildren<GridContainerProps>) => {
  const { unit, SCALE } = useScale();
  const { layout } = useConfig();
  const { className: resolveClassName, styles } = css.resolve`
    .grid-container {
      display: flex;
      box-sizing: border-box;
    }

    ${SCALE.w(0, value => `width: ${value};`, 'var(--grid-container-width)', 'grid-container')}
    ${SCALE.margin(
      0,
      value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
      {
        top: 'var(--grid-row-container-margin)',
        bottom: 'var(--grid-row-container-margin)',
        left: 'var(--grid-container-margin)',
        right: 'var(--grid-container-margin)',
      },
      'grid-container',
    )}
    ${customResponsiveAttribute(
      rowGap ?? gap ?? 0,
      'grid-container',
      layout.breakpoints,
      value => `--grid-row-gap-unit: calc(${value} * ${unit} * 1/3); --grid-row-container-margin: calc(-1 * var(--grid-row-gap-unit));`,
    )}
    ${customResponsiveAttribute(
      gap ?? 0,
      'grid-container',
      layout.breakpoints,
      value =>
        `--grid-gap-unit: calc(${value} * ${unit} * 1/3); --grid-container-margin: calc(-1 * var(--grid-gap-unit)); --grid-container-width: calc(100% + var(--grid-gap-unit) * 2);`,
    )}
    ${customResponsiveAttribute(wrap, 'grid-container', layout.breakpoints, value => `flex-wrap: ${value};`)}
  `;
  const classes = useClasses(resolveClassName, 'grid-container', className);
  return (
    <GridBasicItem className={classes} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  );
};

GridContainerComponent.displayName = 'HimalayaGridContainer';
const GridContainer = withScale(GridContainerComponent);
export default GridContainer;
