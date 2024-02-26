'use client';

import { ConfigProvider, LayoutProvider } from 'components';
import React from 'react';
import { SwipeProvider } from '../components/swipe';
import { CoreLayout } from './layouts/core-layout';

export function Providers({ children, defaultTheme }: { children: React.ReactNode; defaultTheme: string }) {
  return (
    <ConfigProvider detectTheme={true} themeType={defaultTheme}>
      <SwipeProvider>
        <div className="app-layout">
          <LayoutProvider pageWidth="900pt" pageWidthWithMargin="932pt">
            <CoreLayout>{children}</CoreLayout>
          </LayoutProvider>
        </div>

        <style global jsx>{`
          .app-layout {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        `}</style>
      </SwipeProvider>
    </ConfigProvider>
  );
}
