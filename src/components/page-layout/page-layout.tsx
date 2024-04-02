'use client';

import React from 'react';
import useConfig from '../use-config';
import { customResponsiveAttribute, useScale, withScale } from '../use-scale';
import { isCSSNumberValue } from '../utils/collections';
import { PageLayoutProps } from './shared';
import { usePageLayout } from './page-layout-context';
import { InnerScroll } from '../scroll';
import useClasses from '../use-classes';

const PageLayout: React.FC<React.PropsWithChildren<PageLayoutProps>> = ({
  children,
  className,
  quickbarContent,
  headerContent,
  sidebarContent,
  headerHeight = '60px',
  sidebarWidth = '300px',
  quickbarWidth = '60px',
  animationTime = 200,
  quickbarVisible = true,
  sidebarVisible = true,
  headerVisible = true,
  withPageMargin = true,
  maximalContentWidth = 'var(--layout-page-width-with-margin)',
  ...props
}) => {
  const { UNIT, CLASS_NAMES } = useScale();
  const { isQuickbarEnabled, isSidebarEnabled } = usePageLayout();
  const { layout } = useConfig();
  return (
    <>
      <div
        className={useClasses('layout', CLASS_NAMES, className, {
          'quickbar-disabled': isQuickbarEnabled === false || !quickbarContent,
          'sidebar-disabled': isSidebarEnabled === false || !sidebarContent,
          'header-disabled': !headerContent,
        })}
        {...props}
      >
        {quickbarContent && (
          <aside className="quickbar">
            <InnerScroll type="vertical" transparentBg={true}>
              {quickbarContent}
            </InnerScroll>
          </aside>
        )}
        <div className="content">
          {headerContent && <header>{headerContent}</header>}
          <div className="content-margin">
            {sidebarContent && (
              <aside className="sidebar">
                <div className="sidebar-inner">
                  <InnerScroll type="vertical" transparentBg={true}>
                    <div className="sidebar-content">{sidebarContent}</div>
                  </InnerScroll>
                </div>
              </aside>
            )}
            <main className="content-inner">{children}</main>
          </div>
        </div>
      </div>
      <style jsx>{`
        .header-inner {
          max-width: var(--page-width);
          margin: 0 auto;
          height: 100%;
          padding: 0 var(--inner-page-margin);
        }
        .quickbar {
          position: fixed;
          height: 100vh;
          width: var(--quickbar-inner-width);
          transition: transform var(--animation-time) ease;
          transform: translateX(var(--quickbar-inner-position));
          border-right: 1px solid var(--color-border-1000);
        }

        .layout {
          --mobile-width: 80%;
          --quickbar-position: 0px;
          --animation-time: ${animationTime}ms;
          --quickbar-inner-width: var(--quickbar-width);
          --sidebar-inner-width: var(--sidebar-width);
          --content-position: var(--quickbar-inner-width);
          --quickbar-inner-position: var(--quickbar-position);
          --page-margin: var(--layout-page-margin);
          --content-height: auto;
          --content-overflow: inherit;
          --mobile-position: -80%;
          --page-width: var(--layout-page-width-with-margin);
          width: 100%;
          overflow-x: hidden;
          min-height: 100vh;

          &.quickbar-disabled {
            --quickbar-inner-width: 0px;
          }

          &.page-margin-disabled {
            --inner-page-margin: 0px;
          }

          &.sidebar-disabled {
            --sidebar-inner-width: 0px;
          }

          &.header-disabled {
            --header-height: 0px;
          }
        }

        .layout.scroll-disabled {
        }
        .layout.mobile-active {
          --content-height: 100vh;
          --mobile-position: 0;
        }

        .sidebar {
          position: fixed;
          top: var(--header-height);
          bottom: 0;
          width: var(--sidebar-inner-width);

          transition: width var(--animation-time) ease;
          overflow: hidden;

          .sidebar-inner {
            height: 100%;
            border-right: 1px solid var(--color-border-1000);
            width: 100%;
          }
          .sidebar-content {
            min-height: 100%;
          }
        }

        .content-margin {
          max-width: var(--page-width);
          margin: 0 auto;
          padding-top: var(--header-height);
          height: var(--content-height);
          overflow: var(--content-overflow);

          transition: padding-top var(--animation-time) ease;
        }

        main {
          margin: var(--inner-page-margin);
          padding-left: var(--sidebar-inner-width);
          transition: padding-left var(--animation-time) ease;
        }

        header {
          position: fixed;
          width: calc(100% - var(--quickbar-inner-width));
          z-index: 999;
          height: var(--header-height);
          transition: height width var(--animation-time) ease;
        }

        .dummy {
          height: 2000px;
          background: #fff;
        }
        .content {
          min-height: 100vh;
          overflow-x: hidden;
          margin-left: var(--content-position);

          transition: margin var(--animation-time) ease;
        }

        ${customResponsiveAttribute(headerHeight, 'layout', layout.breakpoints, value =>
          !isCSSNumberValue(value) ? `--header-height: ${value};` : `--header-height: calc(var(--scale-unit-scale) * ${value})`,
        )}

        ${customResponsiveAttribute(sidebarWidth, 'layout', layout.breakpoints, value =>
          !isCSSNumberValue(value) ? `--sidebar-width: ${value};` : `--sidebar-width: calc(var(--scale-unit-scale) * ${value})`,
        )}

        ${customResponsiveAttribute(quickbarWidth, 'layout', layout.breakpoints, value =>
          !isCSSNumberValue(value) ? `--quickbar-width: ${value};` : `--quickbar-width: calc(var(--scale-unit-scale) * ${value})`,
        )}

        ${customResponsiveAttribute(withPageMargin, 'layout', layout.breakpoints, value =>
          value ? `--inner-page-margin: var(--page-margin); ` : `--inner-page-margin:: 0px;`,
        )}

        ${customResponsiveAttribute(quickbarVisible, 'layout', layout.breakpoints, value =>
          value
            ? `--quickbar-inner-width: var(--quickbar-width); --quickbar-inner-position: 0px;`
            : `--quickbar-inner-width: 0px; --quickbar-inner-position: calc(var(--quickbar-width) * -1);`,
        )}

        ${customResponsiveAttribute(sidebarVisible, 'layout', layout.breakpoints, value =>
          value ? `--sidebar-inner-width: var(--sidebar-width);` : `--sidebar-inner-width: 0px;`,
        )}

        ${customResponsiveAttribute(maximalContentWidth, 'layout', layout.breakpoints, value =>
          !isCSSNumberValue(value) ? `--page-width: ${value};` : `--page-width: calc(var(--scale-unit-scale) * ${value})`,
        )}



        ${UNIT('layout')}
      `}</style>
    </>
  );
};

PageLayout.displayName = 'HimalayaPageLayout';
export default withScale(PageLayout);
