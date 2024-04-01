'use client';
import useClasses from '../use-classes';
import React, { PropsWithChildren, useRef, useState } from 'react';
import Highlight from '../shared/highlight';
import useScale, { withScale } from '../use-scale';
import { ReactiveDomReact } from '../utils/layouts';
import { NavigationContext } from './navigation-context';

export interface NavigationProps {
  hoverHeightRatio?: number;
  hoverWidthRatio?: number;
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

const NavigationComponent: React.FC<PropsWithChildren<NavigationPropsExternal>> = ({ children, hoverHeightRatio = 1, hoverWidthRatio = 1, ...props }) => {
  const [rect, setRect] = useState<ReactiveDomReact>(defaultRect);
  const [displayHighlight, setDisplayHighlight] = useState<boolean>(false);

  const { CLASS_NAMES, SCALE, UNIT } = useScale();
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
    setDisplayHighlight(true);
    setRect(event);
  };

  return (
    <NavigationContext.Provider value={{ onMouseOver: tabItemMouseOverHandler }}>
      <div {...props} className={useClasses('navigation', CLASS_NAMES)} ref={ref} onMouseLeave={() => setDisplayHighlight(false)}>
        <Highlight
          background={'var(--color-background-900)'}
          activeOpacity={1}
          hoverHeightRatio={hoverHeightRatio}
          hoverWidthRatio={hoverWidthRatio}
          visible={displayHighlight}
          rect={rect}
        />
        {children}

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

          ${SCALE.w(1, value => `width: ${value};`, 'auto', 'navigation')}
          ${SCALE.h(1, value => `height: ${value};`, '100%', 'navigation')}
          ${UNIT('navigation')}
        `}</style>
      </div>
    </NavigationContext.Provider>
  );
};

NavigationComponent.displayName = 'HimalayaNavigation';
const Navigation = withScale(NavigationComponent);
export default Navigation;
