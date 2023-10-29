'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import TooltipContent, { TooltipIconOffset } from './tooltip-content';
import useClickAway from '../utils/use-click-away';
import { TriggerTypes, Placement, SnippetTypes } from '../utils/prop-types';
import { withScale } from '../use-scale';
import { getRect } from './helper';
import useClasses from '../use-classes';

export type TooltipOnVisibleChange = (visible: boolean) => void;
export type TooltipTypes = SnippetTypes;
export type TooltipTriggers = TriggerTypes;
export type TooltipPlacement = Placement;
interface Props {
  text?: string | React.ReactNode;
  type?: TooltipTypes;
  placement?: TooltipPlacement;
  visible?: boolean;
  initialVisible?: boolean;
  hideArrow?: boolean;
  trigger?: TooltipTriggers;
  enterDelay?: number;
  leaveDelay?: number;
  offset?: number;
  className?: string;
  portalClassName?: string;
  onVisibleChange?: TooltipOnVisibleChange;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TooltipProps = Props & NativeAttrs;

const TooltipComponent: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  initialVisible = false,
  text,
  offset = 12,
  placement = 'top' as TooltipPlacement,
  portalClassName = '',
  enterDelay = 100,
  leaveDelay = 150,
  trigger = 'hover' as TooltipTriggers,
  type = 'default' as TooltipTypes,
  className = '',
  onVisibleChange = (() => {}) as TooltipOnVisibleChange,
  hideArrow = false,
  visible: customVisible,
  ...props
}: React.PropsWithChildren<TooltipProps>) => {
  const timer = useRef<number>();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(initialVisible);
  const iconOffset = useMemo<TooltipIconOffset>(() => {
    if (!ref?.current) return { x: '0.75em', y: '0.75em' };
    const rect = getRect(ref);
    return {
      x: `${rect.width ? rect.width / 2 : 0}px`,
      y: `${rect.height ? rect.height / 2 : 0}px`,
    };
  }, [ref?.current]);
  const contentProps = {
    type,
    visible,
    offset,
    placement,
    hideArrow,
    iconOffset,
    parent: ref,
    className: portalClassName,
  };

  const changeVisible = (nextState: boolean) => {
    if (!text) {
      return;
    }
    const clear = () => {
      clearTimeout(timer.current);
      timer.current = undefined;
    };
    const handler = (nextState: boolean) => {
      setVisible(nextState);
      onVisibleChange(nextState);
      clear();
    };
    clear();
    if (nextState) {
      timer.current = window.setTimeout(() => handler(true), enterDelay);
      return;
    }
    const leaveDelayWithoutClick = trigger === 'click' ? 0 : leaveDelay;
    timer.current = window.setTimeout(() => handler(false), leaveDelayWithoutClick);
  };

  const mouseEventHandler = (next: boolean) => trigger === 'hover' && changeVisible(next);
  const clickEventHandler = () => trigger === 'click' && changeVisible(!visible);

  useClickAway(ref, () => trigger === 'click' && changeVisible(false));
  useEffect(() => {
    if (customVisible === undefined) return;
    changeVisible(customVisible);
  }, [customVisible]);

  return (
    <div
      ref={ref}
      className={useClasses('tooltip', className)}
      onClick={clickEventHandler}
      onMouseEnter={() => mouseEventHandler(true)}
      onMouseLeave={() => mouseEventHandler(false)}
      {...props}
    >
      {children}
      <TooltipContent {...contentProps}>{text}</TooltipContent>
      <style jsx>{`
        .tooltip {
          width: max-content;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

TooltipComponent.displayName = 'HimalayaTooltip';
const Tooltip = withScale(TooltipComponent);
export default Tooltip;
