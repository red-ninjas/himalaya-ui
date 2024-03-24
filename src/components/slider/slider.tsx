'use client';
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useTheme from '../use-theme';
import useDrag, { DraggingEvent } from '../utils/use-drag';
import useCurrentState from '../utils/use-current-state';
import SliderDot from './slider-dot';
import SliderMark from './slider-mark';
import { getColors } from './styles';
import { NormalTypes } from '../utils/prop-types';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export type SliderTypes = NormalTypes;
interface Props {
  hideValue?: boolean;
  value?: number | [number, number];
  type?: SliderTypes;
  initialValue?: number | [number, number];
  step?: number;
  max?: number;
  min?: number;
  disabled?: boolean;
  showMarkers?: boolean;
  onChange?: (val: number | [number, number]) => void;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
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
  type = 'default' as SliderTypes,
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
  const theme = useTheme();
  const { SCALES } = useScale();
  const [value, setValue] = useState<number | [number, number]>(initialValue);

  const [, setSliderWidth, sideWidthRef] = useCurrentState<number>(0);

  const [, setLastDargOffset1, lastDargOffsetRef1] = useCurrentState<number>(0);
  const [, setLastDargOffset2, lastDargOffsetRef2] = useCurrentState<number>(0);
  const [pendingValue, setPendingValue] = useState<number | [number, number] | null>(null);

  const [isClick, setIsClick] = useState<boolean>(false);

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

  const { bg } = useMemo(() => getColors(theme.palette, type), [theme.palette, type]);

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
    if (disabled) return;
    if (!sliderRef || !sliderRef.current) return;
    setIsClick(true);
    setSliderWidth(getRefWidth(sliderRef));
    const clickOffset = event.clientX - sliderRef.current.getBoundingClientRect().x;
    const ratio = clickOffset / sideWidthRef.current;
    const closestIndex = ratio < 0.5 ? 0 : 1;
    const newOffset = ratio * sideWidthRef.current;
    if (closestIndex === 0) {
      setLastDargOffset1(newOffset);
      updateValue(newOffset, 0);
    } else {
      setLastDargOffset2(newOffset);
      updateValue(newOffset, 1);
    }
  };

  useDrag(dotRef1, event => dragHandler(event, 0), dragStartHandler, dragEndHandler);
  useDrag(dotRef2, event => dragHandler(event, 1), dragStartHandler, dragEndHandler);

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

  return (
    <div className={useClasses('slider', className)} onClick={clickHandler} ref={sliderRef} {...props}>
      <SliderDot disabled={disabled} ref={dotRef1} isClick={isClick} left={currentRatio1}>
        {hideValue ? undefined : Array.isArray(value) ? value[0] : value}
      </SliderDot>
      <SliderDot disabled={disabled} ref={dotRef2} isClick={isClick} left={currentRatio2} style={{ visibility: Array.isArray(value) ? 'visible' : 'hidden' }}>
        {hideValue ? undefined : value[1]}
      </SliderDot>
      {showMarkers && <SliderMark max={max} min={min} step={step} />}
      <style jsx>{`
        .slider {
          border-radius: 50px;
          background-color: ${disabled ? theme.palette.background.accents.accents_2 : bg};
          position: relative;
          cursor: ${disabled ? 'not-allow' : 'pointer'};
          --slider-font-size: ${SCALES.font(1)};
          width: ${SCALES.w(1, '100%')};
          height: ${SCALES.h(0.5)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </div>
  );
};

SliderComponent.displayName = 'HimalayaSlider';
const Slider = withScale(SliderComponent);
export default Slider;
