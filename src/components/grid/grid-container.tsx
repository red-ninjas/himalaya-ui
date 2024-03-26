'use client';
import React from 'react';
import css from 'styled-jsx/css';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
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
  const { unit, RESPONSIVE } = useScale();
  const layout = useLayout();
  const { className: resolveClassName, styles } = css.resolve`
    .grid-item {
      display: flex;
      box-sizing: border-box;
    }

    ${customResponsiveAttribute(
      gap ?? 0,
      'grid-item',
      layout.breakpoints,
      value =>
        `--grid-gap-unit: calc(${value} * ${unit} * 1/3); --grid-container-margin: calc(-1 * var(--grid-gap-unit)); --grid-container-width: calc(100% + var(--grid-gap-unit) * 2);`,
    )}
    ${RESPONSIVE.w(0, value => `width: ${value};`, 'var(--grid-container-width)')}
    ${customResponsiveAttribute(
      rowGap ?? gap ?? 0,
      'grid-item',
      layout.breakpoints,
      value => `--grid-row-gap-unit: calc(${value} * ${unit} * 1/3); --grid-row-container-margin: calc(-1 * var(--grid-row-gap-unit));`,
    )}

    ${customResponsiveAttribute(wrap, 'grid-item', layout.breakpoints, value => `flex-wrap: ${value};`)}
    ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, {
      top: 'var(--grid-row-container-margin)',
      bottom: 'var(--grid-row-container-margin)',
      left: 'var(--grid-container-margin)',
      right: 'var(--grid-container-margin)',
    })}
  `;
  const classes = useClasses(resolveClassName, className);

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
