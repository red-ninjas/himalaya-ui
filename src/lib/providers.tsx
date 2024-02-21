'use client';

import { ConfigProvider, LayoutProvider, SwipeProvider } from 'components';
import React from 'react';
import { CoreLayout } from './layouts/core-layout';

export function Providers({ children, defaultTheme }: { children: React.ReactNode; defaultTheme: string }) {
  return (
    <ConfigProvider detectTheme={true} themeType={defaultTheme}>
      <SwipeProvider>
        <LayoutProvider pageWidth="900pt" pageWidthWithMargin="932pt">
          <CoreLayout>{children}</CoreLayout>
        </LayoutProvider>
      </SwipeProvider>
    </ConfigProvider>
  );
}
