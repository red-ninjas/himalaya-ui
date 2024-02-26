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
  const { RESPONSIVE } = useScale();
  const { className: resolveClassName, styles } = css.resolve`
    div {
      box-sizing: border-box;
    }

    ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom}  ${value.left};`, 'var(--grid-gap-unit)')}
    ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom}  ${value.left};`)}
  `;
  const classes = useClasses('padding margin', resolveClassName, className);

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
