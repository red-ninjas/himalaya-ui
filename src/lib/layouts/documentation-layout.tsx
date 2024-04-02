'use client';

import { Footer, Link, PageWidth, Text } from 'components';
import { PropsWithChildren } from 'react';

export default function DocumentationLayout({ children }: PropsWithChildren) {
  return (
    <PageWidth p={0} h={'100%'}>
      <div className="markdown">{children}</div>
      <Footer.Bottom>
        <Footer.Bottom.Block></Footer.Bottom.Block>
        <Footer.Bottom.Block justify="flex-end">
          <Text span font={'12px'}>
            With support of{' '}
            <Link color href="https://redninjas.dev" target="_blank">
              RedNinjas LTD
            </Link>
          </Text>
        </Footer.Bottom.Block>
      </Footer.Bottom>

      <style jsx global>{`
        .markdown h2,
        .markdown h3,
        .markdown h4,
        .markdown h5,
        .markdown h6 {
          margin: 1em 0 0.6em;
        }

        .markdown h1 {
          margin-top: 0;
        }

        .markdown p,
        .markdown small {
          color: var(--color-foreground-800);
        }
      `}</style>
    </PageWidth>
  );
}
