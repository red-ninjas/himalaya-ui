'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import PageWidth from '../page-width';
import useClasses from '../use-classes';
import useLayout from '../use-layout';
import useScale, { ScaleResponsiveParameter, customResponsiveAttribute, withScale } from '../use-scale';
import { isCSSNumberValue, pickChild } from '../utils/collections';
import CenterHeaderControl from './controls/center-control';
import { default as LeftHeaderControl } from './controls/left-control';
import RightHeaderControl from './controls/right-control';

export interface HeaderProps {
  children?: ReactNode | undefined;
  transcluent?: boolean;
  transcluentColor?: string;
  gap?: ScaleResponsiveParameter<string | number>;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof HeaderProps>;
export type HeaderPropsNative = HeaderProps & NativeAttrs;

const HeaderComponent: React.FC<HeaderPropsNative> = ({ children, transcluent = true, className, transcluentColor, gap = 0.375, ...props }) => {
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();
  const layoutRoot = useLayout();

  const [, leftHeaderControl] = pickChild(children, LeftHeaderControl);
  const [, rightHeaderControl] = pickChild(children, RightHeaderControl);
  const [, centerHeaderControl] = pickChild(children, CenterHeaderControl);

  const [, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => {
      const isLocked = document.body.style.overflow === 'hidden';
      setIsLocked(last => (last !== isLocked ? isLocked : last));
    };
    const observer = new MutationObserver(mutations => {
      mutations.forEach(function (mutation) {
        if (mutation.type !== 'attributes') return;
        handler();
      });
    });

    observer.observe(document.body, {
      attributes: true,
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={useClasses(
        'header-outer',
        {
          transcluent: transcluent,
        },
        SCALE_CLASSES,
        className,
      )}
      {...props}
    >
      <PageWidth h={'100%'} pt={0} pb={0}>
        <div className="header-navigation">
          <div className="left-controls">
            <div className="left-controls-inner">{leftHeaderControl}</div>
          </div>
          {centerHeaderControl && centerHeaderControl.length > 0 && (
            <div className="center-controls">
              <div className="center-controls-inner">{centerHeaderControl}</div>
            </div>
          )}
          <div className="right-controls">
            <div className="right-controls-inner">{rightHeaderControl}</div>
          </div>
        </div>
      </PageWidth>
      <style jsx>{`
        .header-outer {
          border-bottom: 1px solid var(--color-border-1000);
          display: flex;
        }
        .transcluent {
          backdrop-filter: saturate(180%) blur(5px);
          background-color: ${transcluentColor ?? `rgba(var(--color-background-1000-rgb), 0.7)`};
        }
        .header-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          max-width: var(--layout-page-width-with-margin);
        }
        .header-navigation {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          user-select: none;
          width: 100%;
          gap: calc(var(--header-gap) * 2);
        }

        .left-controls {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          align-self: stretch;
          overflow: hidden;
        }
        .left-controls-inner {
          display: flex;
          align-items: center;
          gap: var(--header-gap);
          height: 100%;
          width: 100%;
        }

        .center-controls {
          flex: 1 1;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: stretch;
        }

        .center-controls-inner {
          display: flex;
          align-items: center;
          gap: var(--header-gap);
          height: 100%;
        }

        .right-controls {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          align-self: stretch;
        }
        .right-controls-inner {
          display: flex;
          align-items: center;
          gap: var(--header-gap);
          height: 100%;
        }

        ${RESPONSIVE.h(3.75, value => `height: ${value};`, undefined, 'header-outer')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'header-navigation')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'header-navigation')}
        ${RESPONSIVE.margin(
          0,
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          {
            top: undefined,
            right: 'auto',
            left: 'auto',
            bottom: undefined,
          },
          'header-inner',
        )}

        ${SCALER('header-outer')}
        ${customResponsiveAttribute(gap, 'header-outer', layoutRoot.breakpoints, value =>
          !isCSSNumberValue(value) ? `--header-gap: ${value};` : `--header-gap: calc(var(--scale-unit-scale) * ${value});`,
        )}
      `}</style>
    </nav>
  );
};

const Header = withScale(HeaderComponent);

Header.displayName = 'HimalayaHeader';
export default Header;
