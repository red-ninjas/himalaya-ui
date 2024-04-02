'use client';
import React from 'react';
import css from 'styled-jsx/css';
import GridBasicItem, { GridBasicItemProps } from './basic-item';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  className?: string;
}

export type GridProps = Props & GridBasicItemProps;

const GridComponent: React.FC<React.PropsWithChildren<GridProps>> = ({ children, className = '', ...props }: React.PropsWithChildren<GridProps>) => {
  const { SCALE } = useScale();
  const { className: resolveClassName, styles } = css.resolve`
    .grid-item-inner {
      box-sizing: border-box;
    }

    ${SCALE.padding(
      0,
      value => `padding: ${value.top} ${value.right} ${value.bottom}  ${value.left};`,
      {
        top: 'var(--grid-row-gap-unit)',
        left: 'var(--grid-gap-unit)',
        right: 'var(--grid-gap-unit)',
        bottom: 'var(--grid-row-gap-unit)',
      },
      'grid-item-inner',
    )}
    ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom}  ${value.left};`, undefined, 'grid-item-inner')}
  `;

  const classes = useClasses(resolveClassName, 'grid-item-inner', className);

  return (
    <GridBasicItem className={classes} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  );
};

GridComponent.displayName = 'HimalayaGrid';
const Grid = withScale(GridComponent);
export default Grid;
