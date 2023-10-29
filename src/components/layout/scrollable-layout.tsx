'use client';
import useTheme from '../use-theme';
import { ScrollableLayoutProps } from '.';
import InnerScroll from '../scroll/inner-scroll';
import React from 'react';

const ScrollableLayout: React.FC<React.PropsWithChildren<ScrollableLayoutProps>> = ({ children, background, onScroll = () => {} }) => {
  const theme = useTheme();

  return (
    <div className="scroll-area">
      <InnerScroll onScroll={onScroll} width={'100%'} height={'100%'} type="vertical">
        {children}
      </InnerScroll>
      <style jsx>{`
        .scroll-area {
          width: 100%;
          height: 100%;
          position: relative;
          background: ${background || theme.palette.background};
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ScrollableLayout;
