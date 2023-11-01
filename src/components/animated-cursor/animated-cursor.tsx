'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useTheme from '../use-theme';
import { addColorAlpha } from '../utils/color';
import type { AnimatedCursorCoordinates, AnimatedCursorOptions, AnimatedCursorProps, Clickable } from './';
import find from './find';
import { useEventListener } from './useEventListener';
import isDevice from './is-device';
import useClasses from '../use-classes';

const CursorCore: React.FC<AnimatedCursorProps> = ({
  clickables = [
    'a',
    'input[type="text"]',
    'input[type="email"]',
    'input[type="number"]',
    'input[type="submit"]',
    'input[type="image"]',
    'label[for]',
    'select',
    'textarea',
    'button',
    '.link',
  ],
  children,
  color,
  innerScale = 0.6,
  innerSize = 8,
  outerAlpha = 0.4,
  outerScale = 6,
  outerSize = 8,
  showSystemCursor = true,
  trailingSpeed = 8,
}) => {
  const defaultOptions = useMemo(
    () => ({
      children,
      color,
      innerScale,
      innerSize,
      outerAlpha,
      outerScale,
      outerSize,
    }),
    [children, color, innerScale, innerSize, outerAlpha, outerScale, outerSize],
  );

  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const [coords, setCoords] = useState<AnimatedCursorCoordinates>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [isActive, setIsActive] = useState<boolean | AnimatedCursorOptions>(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const endX = useRef(0);
  const endY = useRef(0);
  const theme = useTheme();

  let currentColor = theme.palette.tertiary.value;
  let currentBackgroundColor = theme.palette.foreground;

  if (color === undefined) {
    currentColor = addColorAlpha(theme.palette.primary.value, 1.0);
    currentBackgroundColor = addColorAlpha(theme.palette.primary.value, options.outerAlpha);
  } else {
    currentColor = addColorAlpha(color, 1.0);
    currentBackgroundColor = addColorAlpha(color, options.outerAlpha);
  }

  /**
   * Primary Mouse move event
   * @param {number} clientX - MouseEvent.clientX
   * @param {number} clientY - MouseEvent.clientY
   */
  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isInit) {
        return;
      }
      const { clientX, clientY } = event;
      setCoords({ x: clientX, y: clientY });
      if (cursorInnerRef.current !== null) {
        cursorInnerRef.current.style.top = `${clientY}px`;
        cursorInnerRef.current.style.left = `${clientX}px`;
      }
      endX.current = clientX;
      endY.current = clientY;
    },
    [isInit],
  );

  // Outer Cursor Animation Delay
  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / trailingSpeed;
        coords.y += (endY.current - coords.y) / trailingSpeed;
        if (cursorOuterRef.current !== null) {
          cursorOuterRef.current.style.top = `${coords.y}px`;
          cursorOuterRef.current.style.left = `${coords.x}px`;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [requestRef], // eslint-disable-line
  );

  // Outer cursor RAF setup / cleanup
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateOuterCursor]);

  /**
   * Calculates amount to scale cursor in px3
   * @param {number} orignalSize - starting size
   * @param {number} scaleAmount - Amount to scale
   * @returns {String} Scale amount in px
   */
  const getScaleAmount = (orignalSize: number, scaleAmount: number) => {
    return `${parseInt(String(orignalSize * scaleAmount))}px`;
  };

  // Scales cursor by HxW
  const scaleBySize = useCallback(
    (cursorRef: HTMLDivElement | null, orignalSize: number, scaleAmount: number) => {
      if (cursorRef && isInit) {
        cursorRef.style.height = getScaleAmount(orignalSize, scaleAmount);
        cursorRef.style.width = getScaleAmount(orignalSize, scaleAmount);
      }
    },
    [isInit],
  );

  // Mouse Events State updates
  const onMouseDown = useCallback(() => {
    setIsActive(true);
  }, []);
  const onMouseUp = useCallback(() => setIsActive(false), []);
  const onMouseEnterViewport = useCallback(() => setIsVisible(true), []);
  const onMouseLeaveViewport = useCallback(() => setIsVisible(false), []);

  useEventListener('mousemove', onMouseMove);
  useEventListener('mousedown', onMouseDown);
  useEventListener('mouseup', onMouseUp);
  useEventListener('mouseover', onMouseEnterViewport);
  useEventListener('mouseout', onMouseLeaveViewport);

  // Cursors Hover/Active State
  useEffect(() => {
    if (isActive) {
      scaleBySize(cursorInnerRef.current, options.innerSize, options.innerScale);
      scaleBySize(cursorOuterRef.current, options.outerSize, options.outerScale);
    } else {
      scaleBySize(cursorInnerRef.current, options.innerSize, 1);
      scaleBySize(cursorOuterRef.current, options.outerSize, 1);
    }
  }, [options.innerSize, options.innerScale, options.outerSize, options.outerScale, scaleBySize, isActive]);

  // Cursors Click States
  useEffect(() => {
    if (isActiveClickable) {
      scaleBySize(cursorInnerRef.current, options.innerSize, options.innerScale * 1.2);
      scaleBySize(cursorOuterRef.current, options.outerSize, options.outerScale * 1.4);
    }
  }, [options.innerSize, options.innerScale, options.outerSize, options.outerScale, scaleBySize, isActiveClickable]);

  // Cursor Visibility Statea
  useEffect(() => {
    if (cursorInnerRef.current == null || cursorOuterRef.current == null || !isInit) return;

    if (isVisible) {
      cursorInnerRef.current.style.opacity = '1';
      cursorOuterRef.current.style.opacity = '1';
    } else {
      cursorInnerRef.current.style.opacity = '0';
      cursorOuterRef.current.style.opacity = '0';
    }
  }, [isVisible, isInit]);

  // Click event state updates
  useEffect(() => {
    const clickableEls = document.querySelectorAll<HTMLElement>(
      clickables.map(clickable => (typeof clickable === 'object' && clickable?.target ? clickable.target : clickable ?? '')).join(','),
    );

    clickableEls.forEach(el => {
      if (!showSystemCursor) el.style.cursor = 'none';

      const clickableOptions =
        typeof clickables === 'object' ? find(clickables, (clickable: Clickable) => typeof clickable === 'object' && el.matches(clickable.target)) : {};

      const options = {
        ...defaultOptions,
        ...clickableOptions,
      };

      el.addEventListener('mouseover', () => {
        setIsActive(true);
        setOptions(options);
      });
      el.addEventListener('click', () => {
        setIsActive(true);
        setIsActiveClickable(false);
      });
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true);
      });
      el.addEventListener('mouseup', () => {
        setIsActive(true);
      });
      el.addEventListener('mouseout', () => {
        setIsActive(false);
        setIsActiveClickable(false);
        setOptions(defaultOptions);
      });
    });

    return () => {
      clickableEls.forEach(el => {
        const clickableOptions =
          typeof clickables === 'object' ? find(clickables, (clickable: Clickable) => typeof clickable === 'object' && el.matches(clickable.target)) : {};

        const options = {
          ...defaultOptions,
          ...clickableOptions,
        };

        el.removeEventListener('mouseover', () => {
          setIsActive(true);
          setOptions(options);
        });
        el.removeEventListener('click', () => {
          setIsActive(true);
          setIsActiveClickable(false);
        });
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true);
        });
        el.removeEventListener('mouseup', () => {
          setIsActive(true);
        });
        el.removeEventListener('mouseout', () => {
          setIsActive(false);
          setIsActiveClickable(false);
          setOptions(defaultOptions);
        });
      });
    };
  }, [isActive, clickables, showSystemCursor, defaultOptions]);

  useEffect(() => {
    const { isMobileDevice } = isDevice();
    setIsInit(!isMobileDevice);
    if (typeof window === 'object' && !isMobileDevice && !showSystemCursor) {
      document.body.style.cursor = 'none';
    }
  }, []);

  return (
    <>
      <div
        ref={cursorOuterRef}
        className={useClasses('extra cursor-outer', {
          show: isInit,
        })}
      />
      <div
        ref={cursorInnerRef}
        className={useClasses('extra cursor-inner', {
          show: isInit,
        })}
      >
        <div className="cursor">{options.children}</div>
      </div>

      <style global jsx>{`
        .extra {
          z-index: 999999;
          display: none;
          justify-content: center;
          align-items: center;
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition:
            opacity 0.15s ease-in-out,
            height 0.2s ease-in-out,
            width 0.2s ease-in-out;
        }

        .show {
          display: flex;
        }

        .cursor-inner {
          width: ${!options.children ? options.innerSize : 'auto'}px;
          height: ${!options.children ? options.innerSize : 'auto'}px;
          background-color: ${!options.children ? `${currentColor}` : 'transparent'};

          mix-blend-mode: exclusion;
        }
        .cursor {
          opacity: ${!options.children ? 0 : 1};
          transition: opacity 0.3s ease-in-out;
        }

        .cursor-outer {
          width: ${options.outerSize}px;
          height: ${options.outerSize}px;
          background-color: ${currentBackgroundColor};
        }
      `}</style>
    </>
  );
};

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  children,
  clickables,
  color,
  innerScale,
  innerSize,
  outerAlpha,
  outerScale,
  outerSize,
  showSystemCursor,
  trailingSpeed,
}) => {
  return (
    <CursorCore
      clickables={clickables}
      color={color}
      innerScale={innerScale}
      innerSize={innerSize}
      outerAlpha={outerAlpha}
      outerScale={outerScale}
      outerSize={outerSize}
      showSystemCursor={showSystemCursor}
      trailingSpeed={trailingSpeed}
    >
      {children}
    </CursorCore>
  );
};

export default AnimatedCursor;
