'use client';

import { ConfigProvider, LayoutProvider } from 'components';
import React from 'react';
import { SwipeProvider } from '../components/swipe';
import { ThemeProvider } from '../components/use-config';
import { CoreLayout } from './layouts/core-layout';

export function Providers({ children, defaultTheme }: { children: React.ReactNode; defaultTheme: string }) {
  return (
    <ConfigProvider>
      <ThemeProvider detectTheme={true} themeType={defaultTheme}>
        <SwipeProvider>
          <LayoutProvider pageWidth="900pt" pageWidthWithMargin="932pt">
            <CoreLayout>{children}</CoreLayout>
          </LayoutProvider>
        </SwipeProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}
