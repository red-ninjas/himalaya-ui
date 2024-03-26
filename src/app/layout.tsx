import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/roboto-mono';

import { Analytics } from '@vercel/analytics/react';
import { Providers } from '../lib/providers';

import NextStyleRegistry from 'components/next/registry';
import TilteInjector from 'lib/title-injector';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <TilteInjector />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="robots" content="index,follow" />
      </head>
      <body>
        <NextStyleRegistry>
          <Providers defaultTheme="light">{children}</Providers>
        </NextStyleRegistry>
        <Analytics></Analytics>
      </body>
    </html>
  );
}
