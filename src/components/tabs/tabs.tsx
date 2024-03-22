'use client';
import React, { CSSProperties, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import useTheme from '../use-theme';
import { TabsHeaderItem, TabsConfig, TabsContext } from './tabs-context';
import useScale, { withScale } from '../use-scale';
import Highlight from '../shared/highlight';
import { useRect } from '../utils/layouts';
import { isUIElement } from '../utils/collections';
import useClasses from '../use-classes';

interface Props {
  initialValue?: string;
  value?: string;
  hideDivider?: boolean;
  hideBorder?: boolean;
  highlight?: boolean;
  onChange?: (val: string) => void;
  className?: string;
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
  className = '',
  leftSpace = '12px' as CSSProperties['marginLeft'],
  gap = '0px' as CSSProperties['gap'],
  highlight = true,
  hoverHeightRatio = 0.7,
  hoverWidthRatio = 1.15,
  activeClassName = '',
  activeStyle = {},
  align = 'left',
  ...props
}: React.PropsWithChildren<TabsProps>) => {
  const theme = useTheme();
  const { RESPONSIVE } = useScale();
  const [tabs, setTabs] = useState<Array<TabsHeaderItem>>([]);
  const [selfValue, setSelfValue] = useState<string | undefined>(userCustomInitialValue);
  const ref = useRef<HTMLDivElement | null>(null);
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

  const clickHandler = (value: string) => {
    setSelfValue(value);
    onChange && onChange(value);
  };
  const tabItemMouseOverHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (!isUIElement(event.target as HTMLDivElement)) return;
    setRect(event, () => ref.current);
    if (highlight) {
      setDisplayHighlight(true);
    }
  };

  return (
    <TabsContext.Provider value={initialValue}>
      <div className={useClasses('tabs padding margin font width height', className)} {...props}>
        <header ref={ref} onMouseLeave={() => setDisplayHighlight(false)}>
          <Highlight rect={rect} visible={displayHighlight} hoverHeightRatio={hoverHeightRatio} hoverWidthRatio={hoverWidthRatio} />
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
            border-bottom: 1px solid ${theme.palette.border.value};
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

          ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`)}
          ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`)}
          ${RESPONSIVE.font(1, value => `font-size: ${value};`)}
          ${RESPONSIVE.w(1, value => `width: ${value};`, 'initial')}
          ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto')}
        `}</style>
      </div>
    </TabsContext.Provider>
  );
};

TabsComponent.displayName = 'HimalayaTabs';
const Tabs = withScale(TabsComponent);
export default Tabs;
