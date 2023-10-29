'use client';
import useTheme from '../use-theme';
import React from 'react';

export interface SideItemProps {
  title: string;
  isActive?: boolean;
}

const SidebarGroup: React.FC<React.PropsWithChildren<SideItemProps>> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <div className="item">
      <span className={props.isActive ? 'active' : ''}>{props.title}</span>

      {children && <div className="children">{children}</div>}

      <style jsx>{`
        span {
          font-size: 0.75rem;
          transition: all 0.2s ease;
          color: ${theme.palette.accents_4};
          text-transform: uppercase;
          letter-spacing: 1.3px;
        }

        .active {
          color: ${theme.palette.foreground};
        }

        .item {
          width: 100%;
        }

        .children {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          transition: all 0.2s ease-in-out;
          position: relative;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default SidebarGroup;
