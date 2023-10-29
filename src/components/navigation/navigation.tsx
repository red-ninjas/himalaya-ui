'use client';
import Highlight from '../shared/highlight';
import { pickChild } from '../utils/collections';
import { ReactiveDomReact } from '../utils/layouts';
import React, { PropsWithChildren, useRef, useState } from 'react';
import NavigationItem from './item';
import { NavigationContext } from './navigation-context';
import { withScale } from '../use-scale';
import useLayout from '../use-layout';
import useTheme from '../use-theme';

export interface NavigationProps {
  hoverHeightRatio?: number;
  hoverWidthRatio?: number;
  hideOnMobile?: boolean;
}
const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  width: 0,
  height: 0,
  elementTop: -1000,
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof NavigationProps>;
export type NavigationPropsExternal = NavigationProps & NativeAttrs;

const NavigationComponent: React.FC<PropsWithChildren<NavigationPropsExternal>> = ({
  children,
  hoverHeightRatio = 0.7,
  hoverWidthRatio = 1.15,
  hideOnMobile = true,
  ...props
}) => {
  const [, navigationElement] = pickChild(children, NavigationItem);
  const [rect, setRect] = useState<ReactiveDomReact>(defaultRect);
  const [displayHighlight, setDisplayHighlight] = useState<boolean>(false);

  const theme = useTheme();

  const ref = useRef<HTMLDivElement | null>(null);
  const tabItemMouseOverHandler = (event: ReactiveDomReact) => {
    if (rect?.rect != event.rect) {
      if (rect.deactive) {
        rect.deactive();
      }
    }
    const origRect = (ref?.current as HTMLElement)?.getBoundingClientRect();
    event.left -= origRect.left;
    event.top -= origRect.top;
    event.elementTop = 0;
    setDisplayHighlight(true);
    setRect(event);
  };

  const layout = useLayout();
  return (
    <NavigationContext.Provider value={{ onMouseOver: tabItemMouseOverHandler }}>
      <div {...props} className="navigation" ref={ref} onMouseLeave={() => setDisplayHighlight(false)}>
        <Highlight
          background={theme.palette.foreground}
          activeOpacity={1}
          hoverHeightRatio={hoverHeightRatio}
          hoverWidthRatio={hoverWidthRatio}
          visible={displayHighlight}
          rect={rect}
        />
        {navigationElement}

        <style jsx>{`
          .navigation {
            flex: 1 1;
            display: inline-flex;
            padding: 0;
            position: relative;
            gap: 3px;
          }

          .navigation-inner {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            overflow: hidden;
            position: relative;
          }

          @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
            .navigation {
              display: ${hideOnMobile === true ? 'none' : 'block'};
            }
          }
        `}</style>
      </div>
    </NavigationContext.Provider>
  );
};

NavigationComponent.displayName = 'HimalayaNavigation';
const Navigation = withScale(NavigationComponent);
export default Navigation;
