'use client';

import { ConfigProvider } from 'components';
import React from 'react';
import { SwipeProvider } from '../components/swipe';
import { CoreLayout } from './layouts/core-layout';

export function Providers({ children, defaultTheme }: { children: React.ReactNode; defaultTheme: string }) {
  return (
    <ConfigProvider themeType={defaultTheme}>
      <SwipeProvider>
        <div className="app-layout">
          <CoreLayout>{children}</CoreLayout>
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
