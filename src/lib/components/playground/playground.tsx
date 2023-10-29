'use client';
import { LoadingSpinner, useTheme } from 'components';
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

export type PlaygroundProps = {
  title?: React.ReactNode | string;
  desc?: React.ReactNode | string;
  code: string;
  scope: {
    [key: string]: any;
  };
};

const Playground: React.FC<PlaygroundProps> = React.memo(({ title: inputTitle, code: inputCode = '', desc = '', scope }: PlaygroundProps) => {
  const theme = useTheme();
  const code = inputCode.trim();
  const title = inputTitle || 'General';

  return (
    <>
      <Title title={title} desc={desc} />
      <div className="playground">
        <DynamicLive code={code} scope={scope} />
        <style jsx>{`
          .playground {
            width: 100%;
            border-radius: ${theme.style.radius};
            border: 1px solid ${theme.palette.border};
          }
        `}</style>
      </div>
    </>
  );
});

Playground.displayName = 'HimalayaPlayground';
export default Playground;
