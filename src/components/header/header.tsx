'use client';

import useClasses from '../use-classes';
import React, { ReactNode, useEffect, useState } from 'react';
import ContentLayout from '../layout/content-layout';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { pickChild } from '../utils/collections';
import { addColorAlpha } from '../utils/color';
import CenterHeaderControl from './controls/center-control';
import { default as LeftHeaderControl } from './controls/left-control';
import RightHeaderControl from './controls/right-control';
import useLayout from '../use-layout';

export interface HeaderProps {
  children?: ReactNode | undefined;
  transcluent?: boolean;
}

const HeaderComponent: React.FC<HeaderProps> = ({ children, transcluent = true }) => {
  const theme = useTheme();
  const layout = useLayout();
  const { SCALES } = useScale();

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
    <>
      <nav
        className={useClasses({
          'header-outer': true,
          transcluent: transcluent,
        })}
      >
        <ContentLayout paddingTop={0} paddingBottom={0}>
          <div className="navigation">
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
        </ContentLayout>
      </nav>
      <style jsx>{`
        .header-outer {
          border-bottom: 1px solid ${theme.palette.border};
        }
        .transcluent {
          backdrop-filter: saturate(180%) blur(5px);
          background-color: ${addColorAlpha(theme.palette.background, 0.8)};
        }
        .header-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          max-width: ${layout.pageWidthWithMargin};
          margin: 0 auto;
        }
        .header-outer .navigation {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          user-select: none;
          padding: 0;
          height: ${SCALES.height(1, '60px')};
          gap: 12px;
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
          gap: 6px;
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
          gap: 6px;
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
          gap: 6px;
          height: 100%;
        }
      `}</style>
    </>
  );
};

const Header = withScale(HeaderComponent);

Header.displayName = 'HimalayaHeader';
export default Header;
