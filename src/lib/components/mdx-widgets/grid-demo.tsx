'use client';

import React from 'react';

const GridDemo: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className="grid-demo">
      {children}
      <style jsx>{`
        .grid-demo {
          background: transparent;
          background-image: linear-gradient(var(--color-border-1000) 1px, transparent 0), linear-gradient(90deg, var(--color-border-1000) 1px, transparent 0);
          background-size:
            15px 15px,
            15px 15px,
            75px 75px,
            75px 75px;
          border: 2px solid var(--color-border-1000);
          border-radius: 4px;
          overflow: hidden;
          width: 500px;
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
        }
        .grid-demo :global(> *) {
          margin-bottom: 15px;
        }
        .grid-demo :global(> *:last-of-type) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default GridDemo;
