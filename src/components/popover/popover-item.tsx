'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { usePopoverContext } from './popover-context';

interface Props {
  line?: boolean;
  title?: boolean;
  disableAutoClose?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type PopoverItemProps = Props & NativeAttrs;

const PopoverItemComponent: React.FC<React.PropsWithChildren<PopoverItemProps>> = ({
  children,
  line = false,
  title = false,
  className,
  onClick,
  disableAutoClose = false,
  ...props
}: React.PropsWithChildren<PopoverItemProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const { disableItemsAutoClose, onItemClick } = usePopoverContext();
  const hasHandler = Boolean(onClick);
  const dontCloseByClick = disableAutoClose || disableItemsAutoClose || title || line;
  const classes = useClasses('item', { line, title }, className, CLASS_NAMES);

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick && onClick(event);
    if (dontCloseByClick) {
      return event.stopPropagation();
    }
    onItemClick(event);
  };

  return (
    <>
      <div className={classes} onClick={clickHandler} {...props}>
        {children}
        <style jsx>{`
          .item {
            display: flex;
            box-sizing: border-box;
            justify-content: flex-start;
            align-items: center;
            color: var(--color-background-400);
            transition:
              color,
              background-color 150ms linear;
            line-height: 1.25em;

            cursor: ${hasHandler ? 'pointer' : 'default'};
          }

          .item:hover {
            color: var(--color-foreground-1000);
          }

          .line {
            line-height: 0;
            padding: 0;
            background-color: var(--color-border-1000);
          }

          .title {
            font-weight: 500;
            color: var(--color-foreground-1000);
          }

          ${SCALE.font(0.925, value => `font-size: ${value};`, undefined, 'title')}

          ${SCALE.w(1, value => `width: ${value};`, '100%', 'line')}
          ${SCALE.h(0.0625, value => `height: ${value};`, undefined, 'line')}
          ${SCALE.margin(
            {
              top: 0.35,
              right: 0,
              bottom: 0.35,
              left: 0,
            },
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'line',
          )}

          ${SCALE.h(1, value => `height: ${value};`, 'auto', 'item')}
          ${SCALE.w(1, value => `width: ${value};`, 'auto', 'item')}

          ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'item')}
          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'item')}
          ${SCALE.padding(
            {
              top: 0.5,
              bottom: 0.5,
              right: 0.75,
              left: 0.75,
            },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'item',
          )}

          ${UNIT('item')}
        `}</style>
      </div>
      {title && <PopoverItem line title={false} />}
    </>
  );
};

PopoverItemComponent.displayName = 'HimalayaPopoverItem';
const PopoverItem = withScale(PopoverItemComponent);
export default PopoverItem;
