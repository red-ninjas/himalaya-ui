'use client';
import React, { CSSProperties, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import Highlight from '../shared/highlight';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { isUIElement } from '../utils/collections';
import { useRect } from '../utils/layouts';
import { TabsConfig, TabsContext, TabsHeaderItem } from './tabs-context';

interface Props {
  initialValue?: string;
  value?: string;
  hideDivider?: boolean;
  hideBorder?: boolean;
  highlight?: boolean;
  onChange?: (val: string) => void;
  leftSpace?: CSSProperties['marginLeft'];
  gap?: CSSProperties['gap'];
  hoverHeightRatio?: number;
  hoverWidthRatio?: number;
  align?: CSSProperties['justifyContent'];
  activeClassName?: string;
  activeStyle?: CSSProperties;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type TabsProps = Props & NativeAttrs;

const TabsComponent: React.FC<React.PropsWithChildren<TabsProps>> = ({
  initialValue: userCustomInitialValue,
  value,
  hideDivider = false,
  hideBorder,
  children,
  onChange,
  className,
  leftSpace = '12px' as CSSProperties['marginLeft'],
  gap = '0px' as CSSProperties['gap'],
  highlight = true,
  hoverHeightRatio = 0.7,
  hoverWidthRatio = 1,
  activeClassName = '',
  activeStyle = {},
  align = 'left',
  ...props
}: React.PropsWithChildren<TabsProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const [tabs, setTabs] = useState<Array<TabsHeaderItem>>([]);
  const [selfValue, setSelfValue] = useState<string | undefined>(userCustomInitialValue);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    velocity: 0,
    lastX: 0,
    walkFactor: 1,
    animationFrameId: null as number | null,
  });

  const [displayHighlight, setDisplayHighlight] = useState<boolean>(false);
  const { rect, setRect } = useRect();

  const register = (next: TabsHeaderItem) => {
    setTabs(last => {
      const hasItem = last.find(item => item.value === next.value);
      if (!hasItem) return [...last, next];
      return last.map(item => {
        if (item.value !== next.value) return item;
        return {
          ...item,
          ...next,
        };
      });
    });
  };

  const initialValue = useMemo<TabsConfig>(
    () => ({
      register,
      currentValue: selfValue,
      inGroup: true,
      leftSpace,
      gap,
    }),
    [selfValue, leftSpace, gap],
  );

  useEffect(() => {
    if (typeof value === 'undefined') return;
    setSelfValue(value);
  }, [value]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const startDrag = e => {
      dragState.current.isDown = true;
      dragState.current.startX = e.pageX;
      dragState.current.scrollLeft = header.scrollLeft;
      dragState.current.lastX = e.pageX;
      if (dragState.current.animationFrameId !== null) {
        cancelAnimationFrame(dragState.current.animationFrameId);
      }
      dragState.current.animationFrameId = null;
    };

    const endDrag = () => {
      dragState.current.isDown = false;
      continueMomentum();
    };

    const moveDrag = e => {
      if (!dragState.current.isDown) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = (x - dragState.current.lastX) * dragState.current.walkFactor;
      header.scrollLeft -= walk;
      dragState.current.velocity = walk;
      dragState.current.lastX = x;
    };

    const continueMomentum = () => {
      if (Math.abs(dragState.current.velocity) > 1) {
        header.scrollLeft -= dragState.current.velocity;
        dragState.current.velocity *= 0.92;
        dragState.current.animationFrameId = requestAnimationFrame(continueMomentum);
      } else {
        dragState.current.animationFrameId = null;
      }
    };

    header.addEventListener('mousedown', startDrag);
    header.addEventListener('mouseup', endDrag);
    header.addEventListener('mousemove', moveDrag);
    header.addEventListener('mouseleave', endDrag);

    return () => {
      if (dragState.current.animationFrameId !== null) {
        cancelAnimationFrame(dragState.current.animationFrameId);
      }
      header.removeEventListener('mousedown', startDrag);
      header.removeEventListener('mouseup', endDrag);
      header.removeEventListener('mousemove', moveDrag);
      header.removeEventListener('mouseleave', endDrag);
    };
  }, []);

  const clickHandler = (value: string) => {
    setSelfValue(value);
    onChange && onChange(value);
  };
  const tabItemMouseOverHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (!isUIElement(event.target as HTMLDivElement)) return;
    setRect(event, () => headerRef.current);
    if (highlight) {
      setDisplayHighlight(true);
    }
  };

  return (
    <TabsContext.Provider value={initialValue}>
      <div className={useClasses('tabs', CLASS_NAMES, className)} {...props}>
        <header ref={headerRef} onMouseLeave={() => setDisplayHighlight(false)}>
          <Highlight
            background={'var(--color-background-900)'}
            rect={rect}
            visible={displayHighlight}
            hoverHeightRatio={hoverHeightRatio}
            hoverWidthRatio={hoverWidthRatio}
          />
          <div className={useClasses('scroll-container', { 'hide-divider': hideDivider })}>
            {tabs.map(({ cell: Cell, value }, index) => (
              <Cell
                key={'list-prop-' + index + value}
                onClick={clickHandler}
                onMouseOver={tabItemMouseOverHandler}
                activeClassName={activeClassName}
                activeStyle={activeStyle}
                hideBorder={hideBorder}
              />
            ))}
          </div>
        </header>
        <div className="content">{children}</div>
        <style jsx>{`
          header {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            overflow-y: hidden;
            overflow-x: scroll;
            scrollbar-width: none;
            position: relative;
          }
          .scroll-container {
            height: 100%;
            flex: 1;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: ${align};
            border-bottom: 1px solid var(--color-border-1000);
            padding-left: ${leftSpace};
            gap: ${gap};
          }
          header::-webkit-scrollbar {
            display: none;
          }
          .hide-divider {
            border-color: transparent;
          }
          .content {
            padding-top: 0.625rem;
          }

          ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tabs')}
          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tabs')}
          ${SCALE.font(1, value => `font-size: ${value};`, undefined, 'tabs')}
          ${SCALE.w(1, value => `width: ${value};`, 'initial', 'tabs')}
          ${SCALE.h(1, value => `height: ${value};`, 'auto', 'tabs')}
          ${UNIT('tabs')}
        `}</style>
      </div>
    </TabsContext.Provider>
  );
};

TabsComponent.displayName = 'HimalayaTabs';
const Tabs = withScale(TabsComponent);
export default React.memo(Tabs);
