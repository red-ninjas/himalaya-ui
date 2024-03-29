'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { StarFill } from '../icons';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { tupleNumber } from '../utils/prop-types';
import { UIColorTypes } from '../themes/presets';

const ratingCountTuple = tupleNumber(2, 3, 4, 5, 6, 7, 8, 9, 10);
const ratingValueTuple = tupleNumber(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
export type RatingValue = (typeof ratingValueTuple)[number];
export type RatingCount = (typeof ratingCountTuple)[number];

interface Props {
  type?: UIColorTypes;
  className?: string;
  icon?: JSX.Element;
  count?: RatingCount | number;
  value?: RatingValue | number;
  initialValue?: RatingValue;
  onValueChange?: (value: number) => void;
  locked?: boolean;
  onLockedChange?: (locked: boolean) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type RatingProps = Props & NativeAttrs;

const RatingComponent: React.FC<RatingProps> = ({
  type = 'default' as UIColorTypes,
  className = '',
  icon = <StarFill />,
  count = 5 as RatingCount,
  value: customValue,
  initialValue = 1 as RatingValue,
  onValueChange,
  locked = false,
  onLockedChange,
  ...props
}: React.PropsWithChildren<RatingProps>) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();
  const [value, setValue] = useState<number>(initialValue);
  const [isLocked, setIsLocked] = useState<boolean>(locked);

  const lockedChangeHandler = useCallback(
    (next: boolean) => {
      setIsLocked(next);
      onLockedChange?.(next);
    },
    [onLockedChange],
  );

  const valueChangeHandler = useCallback(
    (next: number) => {
      setValue(next);
      const emitValue = next > count ? count : next;
      onValueChange && onValueChange(emitValue);
    },
    [count, onValueChange],
  );

  const clickHandler = useCallback(
    (index: number) => {
      if (isLocked) return lockedChangeHandler(false);
      valueChangeHandler(index);
      lockedChangeHandler(true);
    },
    [isLocked, lockedChangeHandler, valueChangeHandler],
  );

  const mouseEnterHandler = useCallback(
    (index: number) => {
      if (isLocked) return;
      valueChangeHandler(index);
    },
    [isLocked, valueChangeHandler],
  );

  useEffect(() => {
    if (typeof customValue === 'undefined') return;
    setValue(customValue < 0 ? 0 : customValue);
  }, [customValue]);

  return (
    <div className={useClasses('rating', className, type ? 'color-' + type : null, SCALE_CLASSES)} {...props}>
      {[...Array(count)].map((_, index) => (
        <div
          className={useClasses('icon-box', {
            hovered: index + 1 <= value,
          })}
          key={index}
          onMouseEnter={() => mouseEnterHandler(index + 1)}
          onClick={() => clickHandler(index + 1)}
        >
          {icon}
        </div>
      ))}
      <style jsx>{`
        .rating {
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;

          transition:
            color 0.2s ease 0s,
            background 0.2s ease 0s,
            border-color 0.2s ease 0s;
        }

        .icon-box {
          --rating-color: var(--color-background-800);
          --rating-hover-color: var(--color-base);

          color: var(--rating-color);
          box-sizing: border-box;
          margin-right: calc(var(--rating-font-size) * 1 / 5);
          cursor: ${isLocked ? 'default' : 'pointer'};
        }

        .rating.color-default .icon-box {
          --rating-hover-color: var(--color-foreground-1000);
        }

        .icon-box :global(svg) {
          width: 100%;
          height: 100%;
          fill: transparent;
          transform: scale(1);
          transition:
            transform,
            color,
            fill 0.2s ease 0s;
        }

        .hovered :global(svg) {
          color: var(--rating-hover-color);
          transform: scale(0.9);
        }

        ${RESPONSIVE.h(0.625, value => `height: ${value};`, 'auto', 'rating')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'rating')}
        ${RESPONSIVE.font(1, value => `font-size: ${value};`, undefined, 'rating')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'rating')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'rating')}
        ${SCALER('rating')}
      `}</style>
    </div>
  );
};

RatingComponent.displayName = 'HimalayaRating';
const Rating = withScale(RatingComponent);
export default Rating;
