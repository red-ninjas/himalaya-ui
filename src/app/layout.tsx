import '@fontsource-variable/inter';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from '../lib/providers';

import { THEME_COOKIE_NAME } from 'components/constants';
import TilteInjector from 'lib/title-injector';
import { cookies } from 'next/headers';
import StyledJsxRegistry from 'components/use-context/registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const defaultTheme = cookies().get(THEME_COOKIE_NAME)?.value || 'dark';
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <TilteInjector />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="robots" content="index,follow" />
      </head>
      <body>
        <StyledJsxRegistry>
          <Providers defaultTheme={defaultTheme}>{children}</Providers>
        </StyledJsxRegistry>
        <Analytics></Analytics>
      </body>
    </html>
  );
}
