'use client';
import { getValidChildren } from 'components/utils/collections';
import React, { createRef, useEffect, useState } from 'react';
import Sidebar from '.';
import {
  Drawer,
  InnerScroll,
  useConfigs,
  useScale,
  useSidebar,
  useTheme,
  withScale,
} from '../';
import useLayout from '../use-layout';

export interface SidebarLayoutProps {
  width?: number;
  hasBorder?: boolean;
  hideOnMobile?: boolean;
}

const useRefDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      const offsetHeight = ref?.current?.getBoundingClientRect() || undefined;
      if (offsetHeight) {
        const space = offsetHeight?.bottom - offsetHeight?.height;
        if (space !== height) {
          setHeight(space);
        }
      }
    });

    resizeObserver.observe(ref.current);

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [ref.current]);

  return height;
};

const SidebarLayout: React.FC<React.PropsWithChildren<SidebarLayoutProps>> = ({
  children,
  width,
  hasBorder = true,
  hideOnMobile = true,
}) => {
  const sidebar = getValidChildren(children).map(item => {
    if (item.type === Sidebar) {
      return item;
    }
  });
  const content = getValidChildren(children).map(item => {
    if (item.type !== Sidebar) {
      return item;
    }
  });

  const { isEnabled, setIsEnabled } = useSidebar();

  const ref = createRef<HTMLDivElement>();
  const theme = useTheme();
  const layout = useLayout();
  const { isMobile } = useConfigs();
  const height = useRefDimensions(ref);
  const { SCALES } = useScale();
  const isActive = (isMobile && !hideOnMobile) || !isMobile;
  const sideBarWidth = width ? width : `230px`;
  return (
    <>
      {isMobile && (
        <Drawer
          width={SCALES.width(1, '85%')}
          visible={isEnabled}
          wrapClassName={'sidebar-drawer'}
          onClose={() => setIsEnabled(false)}
          placement="right"
        >
          <div className="sidebar-content">
            <InnerScroll width={'100%'} height={'100%'} type="vertical">
              {sidebar}
            </InnerScroll>
          </div>
        </Drawer>
      )}

      <div className="layout" ref={ref}>
        {isActive && (
          <div className="sidebar-holder">
            <div
              className="sidebar"
              style={{
                height: height === undefined ? '100%' : `calc(100% - ${height}px)`,
              }}
            >
              <InnerScroll
                transparentBg={true}
                width={'100%'}
                height={'100%'}
                type="vertical"
              >
                {' '}
                {sidebar}
              </InnerScroll>
            </div>
          </div>
        )}
        <main
          className="main"
          style={{ width: !isActive ? '100%' : `calc(100% - ${sideBarWidth})` }}
        >
          {content}
        </main>
        <div className="border-right-holder">
          <div
            className="border-right"
            style={{
              height: height === undefined ? '100%' : `calc(100% - ${height}px)`,
            }}
          ></div>
        </div>
        <style jsx>{`
          .main {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            flex: 1;
            padding: 0;
          }

          :global(.sidebar-content) {
            text-align: left;
            height: 100%;
            positon: relative;
            overflow: hidden;
            width: 100%;
          }
          .sidebar-holder {
            width: ${sideBarWidth};
            min-width: ${sideBarWidth};
            position: relative;
            height: 100%;
          }

          .border-right-holder {
            position: relative;
            height: 100%;
            width: 1px;
          }

          .sidebar {
            height: 100%;
            position: fixed;
            width: ${sideBarWidth};
            z-index: 100;
            overflow: hidden;
            border-right: ${hasBorder
              ? '1px solid ' + theme.palette.border
              : '0px solid transparent'};
            padding: ${SCALES.pt(1)} 0 ${SCALES.pb(1)} 0;
          }

          :global(.sidebar-drawer) {
            max-width: 85% !important;
            min-width: 85% !important;
          }
          .layout {
            min-height: 100%;
            display: flex;
            justify-content: space-between;
            width: 100%;
            position: relative;
            padding: ${SCALES.pt(0)} ${SCALES.pr(1)} ${SCALES.pb(0)} ${SCALES.pl(1)};
          }

          .border-right {
            position: fixed;
            height: 100%;
            width: 1px;
            background: ${hasBorder ? theme.palette.border : 'transparent'};
          }

          @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
            .sidebar-holder {
              display: ${hideOnMobile === true ? 'none' : 'block'};
            }
            .border-right-holder {
              display: ${hideOnMobile === true ? 'none' : 'block'};
            }
            .layout {
              padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
            }
          }
        `}</style>
      </div>
    </>
  );
};

SidebarLayout.displayName = 'HimalayaSidebarLayout';
export default withScale(SidebarLayout);
