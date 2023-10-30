'use client';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useConfigs } from '../use-context/config-context';
import useLayout from '../use-layout';

export interface SidebarProps {
  header?: React.ReactNode;
}

const Sidebar: React.FC<PropsWithChildren<SidebarProps>> = ({ children, ...props }) => {
  const layout = useLayout();
  const pathname = usePathname();
  const boxRef = useRef<HTMLDivElement>(null);
  const { sidebarScrollHeight, updateSidebarScrollHeight } = useConfigs();

  useEffect(() => {
    if (!boxRef.current) return;
    updateSidebarScrollHeight?.(boxRef.current.scrollTop || 0);
  }, [pathname]);

  useEffect(() => {
    if (!boxRef.current) return;
    boxRef.current.scrollTo({ top: sidebarScrollHeight });
  }, [boxRef.current]);

  return (
    <div ref={boxRef} className="sides box">
      {props.header}
      {children}
      <style jsx>{`
        .sides {
          width: 100%;
          padding-bottom: ${layout.gap};
        }
        .box {
          overflow-y: auto;
          overflow-x: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .box::-webkit-scrollbar {
          width: 0;
          background-color: transparent;
        }
        .box > :global(.item) {
          margin-bottom: ${layout.gap};
        }
      `}</style>
    </div>
  );
};

Sidebar.displayName = 'HimalayaSidebar';
export default Sidebar;
