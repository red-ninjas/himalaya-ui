'use client';
import React, { useRef, useState } from 'react';
import { LivePreview, LiveProvider, LiveError } from 'react-live';
import { useLayout, useTheme } from 'components';
import makeCodeTheme from './code-theme';
import Editor from './editor';

export interface Props {
  code: string;
  scope: {
    [key: string]: any;
  };
}

const DynamicLive: React.FC<Props> = ({ code, scope }) => {
  const theme = useTheme();
  const layout = useLayout();
  const codeTheme = makeCodeTheme(theme);

  scope['useState'] = useState;
  scope['useRef'] = useRef;
  scope['useLayout'] = useLayout;
  scope['useTheme'] = useTheme;

  return (
    <LiveProvider code={code} scope={scope} theme={codeTheme}>
      <div className="wrapper">
        <LivePreview />
        <LiveError className="live-error" />
      </div>
      <Editor code={code} />
      <style jsx>{`
        .wrapper {
          width: 100%;
          padding: ${layout.pageMargin};
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .wrapper > :global(div) {
          width: 100%;
          background-color: transparent;
        }
        .wrapper > :global(.live-error) {
          padding: 10px 12px 0 12px;
          margin-bottom: 0;
          border: 2px ${theme.palette.error.value} dotted;
          border-radius: 10px;
          color: ${theme.palette.error.light};
          font-size: 13px;
        }
      `}</style>
    </LiveProvider>
  );
};

export default DynamicLive;
