'use client';
import React from 'react';
import { ScrollableLayoutProps } from '.';
import InnerScroll from '../scroll/inner-scroll';

const ScrollableLayout: React.FC<React.PropsWithChildren<ScrollableLayoutProps>> = ({ children, background, onScroll = () => {} }) => {
  return (
    <div className="scroll-area">
      <InnerScroll onScroll={onScroll} w={'100%'} h={'100%'} type="vertical">
        {children}
      </InnerScroll>
      <style jsx>{`
        .scroll-area {
          width: 100%;
          height: 100%;
          position: relative;
          background: ${background || `var(--color-background-1000)`};
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default ScrollableLayout;
