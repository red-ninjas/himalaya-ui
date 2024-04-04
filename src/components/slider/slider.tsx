'use client';
import { UIColorTypes } from '../themes';
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useCurrentState from '../utils/use-current-state';
import useDrag, { DraggingEvent } from '../utils/use-drag';
import SliderDot from './slider-dot';
import SliderMark from './slider-mark';

interface Props {
  hideValue?: boolean;
  value?: number;
  valuePosition?: 'inside' | 'top' | 'bottom';
  type?: UIColorTypes;
  initialValue?: number | [number, number];
  step?: number;
  max?: number;
  min?: number;
  disabled?: boolean;
  showMarkers?: boolean;
  onChange?: (val: number | [number, number]) => void;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type SliderProps = Props & NativeAttrs;

const getRefWidth = (elementRef: RefObject<HTMLElement> | null): number => {
  if (!elementRef || !elementRef.current) return 0;
  const rect = elementRef.current.getBoundingClientRect();
  return rect.width || rect.right - rect.left;
};

const getValue = (max: number, min: number, step: number, offsetX: number, railWidth: number): number => {
  if (offsetX < 0) return min;
  if (offsetX > railWidth) return max;
  const widthForEachStep = (railWidth / (max - min)) * step;
  if (widthForEachStep <= 0) return min;

  const slideDistance = Math.round(offsetX / widthForEachStep) * step + min;
  return Number.isInteger(slideDistance) ? slideDistance : Number.parseFloat(slideDistance.toFixed(1));
};

const SliderComponent: React.FC<React.PropsWithChildren<SliderProps>> = ({
  hideValue = false,
  disabled = false,
  type = 'default' as UIColorTypes,
  valuePosition = 'inside',
  step = 1,
  max = 100,
  min = 0,
  initialValue = 0,
  value: customValue,
  onChange,
  className = '',
  showMarkers = false,
  ...props
}: React.PropsWithChildren<SliderProps>) => {
  const { SCALE, CLASS_NAMES, UNIT } = useScale();
  const [value, setValue] = useState<number | [number, number]>(initialValue);
  const [, setSliderWidth, sideWidthRef] = useCurrentState<number>(0);
  const [, setLastDargOffset1, lastDargOffsetRef1] = useCurrentState<number>(0);
  const [, setLastDargOffset2, lastDargOffsetRef2] = useCurrentState<number>(0);
  const [pendingValue, setPendingValue] = useState<number | [number, number] | null>(null);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [showTooltipLeft, setShowTooltipLeft] = useState(false);
  const [showTooltipRight, setShowTooltipRight] = useState(false);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const dotRef1 = useRef<HTMLDivElement>(null);
  const dotRef2 = useRef<HTMLDivElement>(null);

  const currentRatio1 = useMemo(() => {
    const val = Array.isArray(value) ? value[0] : value;
    return ((val - min) / (max - min)) * 100;
  }, [value, max, min]);

  const currentRatio2 = useMemo(() => {
    return Array.isArray(value) ? ((value[1] - min) / (max - min)) * 100 : 0;
  }, [value, max, min]);

  const setLastOffsetManually = (val: number | [number, number]) => {
    const width = getRefWidth(sliderRef);
    let shouldOffset1 = 0;
    let shouldOffset2 = 0;
    if (Array.isArray(val)) {
      shouldOffset1 = ((val[0] - min) / (max - min)) * width;
      shouldOffset2 = ((val[1] - min) / (max - min)) * width;
    } else {
      shouldOffset1 = ((val - min) / (max - min)) * width;
      shouldOffset2 = shouldOffset1;
    }

    setLastDargOffset1(shouldOffset1);
    setLastDargOffset2(shouldOffset2);
  };

  const updateValue = useCallback(
    (offset: number, index: number) => {
      let currentValue = getValue(max, min, step, offset, sideWidthRef.current);
      setValue(prevValue => {
        if (Array.isArray(prevValue)) {
          let newValue: [number, number];
          if (index === 0) {
            currentValue = Math.min(currentValue, prevValue[1]);
            newValue = [currentValue, prevValue[1]];
          } else {
            currentValue = Math.max(currentValue, prevValue[0]);
            newValue = [prevValue[0], currentValue];
          }
          setPendingValue(newValue);
          return newValue;
        } else {
          setPendingValue(currentValue);
          return currentValue;
        }
      });
    },
    [max, min, step, sideWidthRef],
  );

  const dragHandler = (event: DraggingEvent, index: number) => {
    if (disabled || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const currentOffset = event.currentX - sliderRect.left;
    const boundedOffset = Math.max(0, Math.min(currentOffset, sliderRect.width));

    updateValue(boundedOffset, index);
  };

  const dragStartHandler = () => {
    setIsClick(false);
    setSliderWidth(getRefWidth(sliderRef));
  };

  const dragEndHandler = (event: DraggingEvent) => {
    if (disabled) return;
    const offset1 = event.currentX - event.startX + lastDargOffsetRef1.current;
    const boundOffset1 = offset1 < 0 ? 0 : Math.min(offset1, sideWidthRef.current);
    setLastDargOffset1(boundOffset1);

    if (Array.isArray(value)) {
      const offset2 = event.currentX - event.startX + lastDargOffsetRef2.current;
      const boundOffset2 = offset2 < 0 ? 0 : Math.min(offset2, sideWidthRef.current);
      setLastDargOffset2(boundOffset2);
    }
  };

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    if (!sliderRef || !sliderRef.current) return;
    setIsClick(true);
    setSliderWidth(getRefWidth(sliderRef));
    const clickOffset = event.clientX - sliderRef.current.getBoundingClientRect().x;
    const position1 = ((value[0] - min) / (max - min)) * sideWidthRef.current;
    const position2 = Array.isArray(value) ? ((value[1] - min) / (max - min)) * sideWidthRef.current : position1;
    const distanceToFirstHandle = Math.abs(clickOffset - position1);
    const distanceToSecondHandle = Math.abs(clickOffset - position2);

    const closestIndex = distanceToFirstHandle <= distanceToSecondHandle ? 0 : 1;
    const newOffset = clickOffset;
    if (closestIndex === 0) {
      setLastDargOffset1(newOffset);
      updateValue(newOffset, 0);
    } else {
      setLastDargOffset2(newOffset);
      updateValue(newOffset, 1);
    }
  };

  useDrag(dotRef1, event => dragHandler(event, 0), dragStartHandler, dragEndHandler, setIsDraggingLeft);
  useDrag(dotRef2, event => dragHandler(event, 1), dragStartHandler, dragEndHandler, setIsDraggingRight);

  useEffect(() => {
    if (pendingValue !== null) {
      onChange && onChange(pendingValue);
      setPendingValue(null);
    }
  }, [pendingValue, onChange]);

  useEffect(() => {
    if (customValue !== undefined && customValue !== value) {
      setValue(customValue);
    }
  }, [customValue, value]);

  useEffect(() => {
    const effectiveValue = customValue !== undefined ? customValue : initialValue;
    if (effectiveValue !== undefined) {
      setLastOffsetManually(effectiveValue);
    }
  }, []);

  const isRange = Array.isArray(value);
  const isNotRange = isRange && currentRatio2 === currentRatio1;
  const leftStart = isRange ? (isNotRange ? currentRatio1 : Math.min(currentRatio1, currentRatio2)) : 0;
  const leftEnd = isRange ? (isNotRange ? currentRatio1 : Math.max(currentRatio1, currentRatio2)) : currentRatio1;

  return (
    <div
      className={useClasses('slider', className, CLASS_NAMES, type ? 'color-' + type : null, { disabled })}
      onClick={clickHandler}
      ref={sliderRef}
      {...props}
    >
      <SliderDot
        disabled={disabled}
        ref={dotRef1}
        isClick={isClick}
        left={currentRatio1}
        onMouseEnter={() => setShowTooltipLeft(true)}
        onMouseLeave={() => setShowTooltipLeft(false)}
      >
        {valuePosition === 'inside' && (!hideValue ? (Array.isArray(value) ? value[0] : value) : undefined)}
      </SliderDot>
      {valuePosition !== 'inside' && (showTooltipLeft || isDraggingLeft) && (
        <div className={`tooltip left ${valuePosition}`}>{hideValue ? undefined : Array.isArray(value) ? value[0] : value}</div>
      )}

      <SliderDot
        disabled={disabled}
        ref={dotRef2}
        isClick={isClick}
        left={currentRatio2}
        onMouseEnter={() => setShowTooltipRight(true)}
        onMouseLeave={() => setShowTooltipRight(false)}
        style={{ visibility: Array.isArray(value) ? 'visible' : 'hidden' }}
      >
        {valuePosition === 'inside' && (!hideValue ? (Array.isArray(value) ? value[1] : undefined) : undefined)}
      </SliderDot>
      {valuePosition !== 'inside' && (showTooltipRight || isDraggingRight) && (
        <div className={`tooltip right ${valuePosition}`}> {hideValue ? undefined : value[1]}</div>
      )}

      {showMarkers && <SliderMark max={max} min={min} step={step} />}
      <div className="slider-value"></div>
      <style jsx>{`
        .slider {
          border-radius: var(--border-radius);
          --slider-bg: var(--color-base);
          --slider-bg-tint: var(--color-tint);
          --slider-color: var(--color-contrast);
          background-color: ${disabled ? `var(--color-background-800)` : 'var(--color-background-900)'};
          position: relative;
          cursor: ${disabled ? 'not-allow' : 'pointer'};
        }
        .slider.color-default {
          --slider-bg: var(--color-foreground-1000);
          --slider-bg-tint: var(--color-foreground-900);
          --slider-color: var(--color-background-1000);
        }
        .slider.disabled {
          --slider-bg: var(--color-background-900);
          --slider-bg-tint: var(--color-background-700);
          --slider-color: var(--color-foreground-800);
        }
        .slider-value {
          position: absolute;
          left: ${leftStart}%;
          right: ${`calc(100% - ${leftEnd}%)`};
          height: 100%;
          background: var(--slider-bg-tint);
          border-radius: var(--border-radius);
        }
        .tooltip {
          position: absolute;
          height: calc(var(--slider-font-size) * 1.25);
          min-width: calc(var(--slider-font-size) * 1.25);
          line-height: calc(var(--slider-font-size) * 1.25);
          border-radius: calc(var(--slider-font-size) * 0.625);
          font-weight: 700;
          font-size: calc(var(--slider-font-size) * 0.75);
          background-color: var(--slider-bg);
          color: var(--slider-color);
          text-align: center;
          padding: 0 calc(0.57 * var(--slider-font-size));
          z-index: 110;

          &.left {
            left: ${currentRatio1 - 2}%;
          }
          &.right {
            left: ${currentRatio2 - 2}%;
          }
          &.top {
            top: -30px;
          }
          &.bottom {
            top: 20px;
          }
        }

        ${SCALE.h(0.5, value => `height: ${value};`, undefined, 'slider')}
        ${SCALE.w(0, value => `width: ${value};`, '100%', 'slider')}
        ${SCALE.font(1, value => `--slider-font-size: ${value};`, undefined, 'slider')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'slider')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'slider')}
        ${SCALE.r(1, value => `--border-radius: ${value};`, 'var(--layout-radius)', 'slider')}

        ${UNIT('slider')}
      `}</style>
    </div>
  );
};

SliderComponent.displayName = 'HimalayaSlider';
const Slider = React.memo(withScale(SliderComponent));
export default Slider;
