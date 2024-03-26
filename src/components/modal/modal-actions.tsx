'use client';
import React, { useEffect, useRef, useState } from 'react';

const ModalActionsComponent: React.FC<React.PropsWithChildren<unknown>> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>('auto');

  useEffect(() => {
    if (!ref.current) return;
    setHeight(`${ref.current.clientHeight}px`);
  }, [ref]);

  return (
    <>
      <div />
      <footer ref={ref} {...props}>
        {children}
      </footer>
      <style jsx>{`
        footer {
          display: flex;
          overflow: hidden;
          width: 100%;
          height: auto;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: 1px solid var(--color-border-1000);
          border-bottom-left-radius: var(--layout-radius);
          border-bottom-right-radius: var(--layout-radius);
        }

        footer > :global(button.btn + button.btn) {
          border-left: 1px solid var(--color-border-1000);
        }

        div {
          height: ${height};
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
};

ModalActionsComponent.displayName = 'HimalayaModalActions';
const ModalActions = React.memo(ModalActionsComponent);
export default ModalActions;
