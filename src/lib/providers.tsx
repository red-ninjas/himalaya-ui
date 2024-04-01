'use client';

import { ConfigProvider } from 'components';
import { PropsWithChildren } from 'react';
import { SwipeProvider } from '../components/swipe';
import { CoreLayout } from './layouts/core-layout';

export function Providers({ children, defaultTheme }: PropsWithChildren<{ defaultTheme: string }>) {
  return (
    <ConfigProvider themeType={defaultTheme}>
      <SwipeProvider>
        <CoreLayout>{children}</CoreLayout>
      </SwipeProvider>
    </ConfigProvider>
  );
}
