'use client';
import React, { useMemo } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { useProportions } from '../utils/calculations';

interface Props {
  value?: number;
  limit?: number;
  color?: string;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type CapacityProps = Props & NativeAttrs;

const getColor = (val: number): string => {
  if (val < 33) return `var(--color-success-1000)`;
  if (val < 66) return `var(--color-warning-1000)`;
  return `var(--color-error-1000)`;
};

const CapacityComponent: React.FC<CapacityProps> = ({ value = 0, limit = 100, color: userColor = '', className = '', ...props }: CapacityProps) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const percentValue = useProportions(value, limit);
  const classes = useClasses('capacity', className, CLASS_NAMES);
  const color = useMemo(() => {
    if (userColor && userColor !== '') return userColor;
    return getColor(percentValue);
  }, [userColor, percentValue]);

  return (
    <div className={classes} title={`${percentValue}%`} {...props}>
      <span />
      <style jsx>{`
        .capacity {
          overflow: hidden;
          background-color: var(--color-background-700);
        }

        span {
          width: ${percentValue + '%'};
          background-color: ${color};
          height: 100%;
          margin: 0;
          padding: 0;
          display: block;
        }
        ${SCALE.w(3.125, value => `width: ${value};`, undefined, 'capacity')}
        ${SCALE.h(0.625, value => `height: ${value};`, undefined, 'capacity')}
        ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'capacity')}

        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'capacity')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'capacity')}

        ${UNIT('capacity')}
      `}</style>
    </div>
  );
};

CapacityComponent.displayName = 'HimalayaCapacity';
const Capacity = withScale(CapacityComponent);
export default Capacity;
