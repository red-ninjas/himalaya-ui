import '@fontsource-variable/inter'
import { Analytics } from '@vercel/analytics/react'

import { Providers } from '../lib/providers'

import { THEME_COOKIE_NAME } from 'components'
import TilteInjector from 'lib/title-injector'
import { cookies } from 'next/headers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const defaultTheme = cookies().get(THEME_COOKIE_NAME)?.value || 'dark'
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0" />
        <TilteInjector />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="robots" content="index,follow" />
      </head>
      <body>
        <Providers defaultTheme={defaultTheme}>{children}</Providers>
        <Analytics></Analytics>
      </body>
    </html>
  )
}
