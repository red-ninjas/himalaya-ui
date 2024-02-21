'use client';

import { ConfigProvider } from 'components';
import React from 'react';
import { CoreLayout } from './layouts/core-layout';
import { LayoutProvider } from 'components';

export function Providers({ children, defaultTheme }: { children: React.ReactNode; defaultTheme: string }) {
  return (
    <ConfigProvider detectTheme={true} themeType={defaultTheme}>
      <LayoutProvider pageWidth="900pt" pageWidthWithMargin="932pt">
        <CoreLayout>{children}</CoreLayout>
      </LayoutProvider>
    </ConfigProvider>
  );
}
