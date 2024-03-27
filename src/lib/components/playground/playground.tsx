'use client';
import { LoadingSpinner } from 'components';
import dynamic from 'next/dynamic';
import React from 'react';
import Title from './title';

const DynamicLive = dynamic(() => import('./dynamic-live'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: '20pt 0' }}>
      <LoadingSpinner />
    </div>
  ),
});

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
        <DynamicLive code={code} scope={scope} />
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
