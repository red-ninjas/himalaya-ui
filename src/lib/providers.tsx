'use client';

import { ConfigProvider } from 'components';
import { PropsWithChildren } from 'react';
import { SwipeProvider } from '../components/swipe';
import { DocumentationProvider } from './doc-provider';
import { ProjectParams } from './get-docs';
import { CoreLayout } from './layouts/core-layout';

export function Providers({ children, defaultTheme, projectDoc }: PropsWithChildren<{ defaultTheme: string; projectDoc: ProjectParams }>) {
  return (
    <ConfigProvider themeType={defaultTheme}>
      <SwipeProvider>
        <DocumentationProvider projectDoc={projectDoc}>
          <CoreLayout>{children}</CoreLayout>
        </DocumentationProvider>
      </SwipeProvider>
    </ConfigProvider>
  );
}
