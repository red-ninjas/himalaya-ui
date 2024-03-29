'use client';
import { LoadingSpinner } from 'components';
import React, { Suspense, lazy } from 'react';
import Title from './title';

const LayzPreview = lazy(() => import('./dynamic-live'));

type Props = {
  title?: React.ReactNode | string;
  desc?: React.ReactNode | string;
  code: string;
  scope: {
    [key: string]: any;
  };
};

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type PlaygroundProps = Props & NativeAttrs;

const Playground: React.FC<PlaygroundProps> = React.memo(({ title: inputTitle, code: inputCode = '', desc = '', scope, ...props }: PlaygroundProps) => {
  const code = inputCode.trim();
  const title = inputTitle || 'General';

  return (
    <>
      <Title title={title} desc={desc} />
      <div {...props} className="playground">
        <Suspense
          fallback={
            <div style={{ padding: '20pt 0' }}>
              <LoadingSpinner />
            </div>
          }
        >
          <LayzPreview code={code} scope={scope} />
        </Suspense>
        <style jsx>{`
          .playground {
            width: 100%;
            border-radius: var(--layout-radius);
            border: 1px solid var(--color-border-1000);
          }
        `}</style>
      </div>
    </>
  );
});

Playground.displayName = 'HimalayaPlayground';
export default Playground;
