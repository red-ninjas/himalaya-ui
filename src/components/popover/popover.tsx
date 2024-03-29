'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { UIColorTypes } from '../themes/presets';
import Tooltip, { TooltipOnVisibleChange, TooltipProps } from '../tooltip/tooltip';
import useClasses from '../use-classes';
import { withScale } from '../use-scale';
import { getReactNode } from '../utils/collections';
import { Placement, TriggerTypes } from '../utils/prop-types';
import { PopoverConfig, PopoverContext } from './popover-context';

export type PopoverTriggerTypes = TriggerTypes;
export type PopoverPlacement = Placement;
interface Props {
  content?: React.ReactNode | (() => React.ReactNode);
  trigger?: PopoverTriggerTypes;
  placement?: Placement;
  disableItemsAutoClose?: boolean;
}

type ExcludeTooltipProps = {
  content: any;
  text: any;
  trigger: any;
  placement: any;
};

export type PopoverProps = Props & Omit<TooltipProps, keyof ExcludeTooltipProps>;

const PopoverComponent: React.FC<React.PropsWithChildren<PopoverProps>> = ({
  content,
  children,
  hideArrow = false,
  trigger = 'click' as PopoverTriggerTypes,
  placement = 'bottom' as Placement,
  initialVisible = false,
  portalClassName = '',
  disableItemsAutoClose = false,
  onVisibleChange = (() => {}) as TooltipOnVisibleChange,
  visible: customVisible,
  offset = 12,
  type = 'default' as UIColorTypes,
  enterDelay = 100,
  leaveDelay = 150,
  ...props
}: React.PropsWithChildren<PopoverProps>) => {
  const [visible, setVisible] = useState<boolean>(initialVisible);
  const textNode = useMemo(() => getReactNode(content), [content]);
  const onChildClick = () => {
    onPopoverVisibleChange(false);
  };
  const value = useMemo<PopoverConfig>(
    () => ({
      onItemClick: onChildClick,
      disableItemsAutoClose,
    }),
    [disableItemsAutoClose],
  );
  const classes = useClasses('popover', portalClassName);

  const onPopoverVisibleChange = (next: boolean) => {
    setVisible(next);
    onVisibleChange(next);
  };

  useEffect(() => {
    if (customVisible === undefined) return;
    onPopoverVisibleChange(customVisible);
  }, [customVisible]);
  return (
    <PopoverContext.Provider value={value}>
      <Tooltip
        text={textNode}
        offset={offset}
        hideArrow={hideArrow}
        trigger={trigger}
        type={type}
        placement={placement}
        portalClassName={classes}
        visible={visible}
        onVisibleChange={onPopoverVisibleChange}
        {...props}
      >
        {children}
      </Tooltip>
    </PopoverContext.Provider>
  );
};

PopoverComponent.displayName = 'HimalayaPopover';
const Popover = withScale(PopoverComponent);
export default Popover;
