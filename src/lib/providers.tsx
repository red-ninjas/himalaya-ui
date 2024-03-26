'use client';

import { ConfigProvider } from 'components';
import { PropsWithChildren } from 'react';
import { SwipeProvider } from '../components/swipe';
import { CoreLayout } from './layouts/core-layout';

export function Providers({ children, defaultTheme }: PropsWithChildren<{ defaultTheme: string }>) {
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
