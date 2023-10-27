'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import useLayout from '../use-layout';
import useTheme from '../use-theme';

export interface Props {
  url?: string;
  title: string;
  onClick?: () => void;
}

const SidebarLink: React.FC<Props> = ({ url, title, onClick }) => {
  const theme = useTheme();
  const layout = useLayout();
  const pathname = usePathname();

  const isActive = pathname === url;

  const handleClick = (e: any) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <>
      <Link legacyBehavior href={url || ''}>
        <a onClick={handleClick} className={`link ${isActive ? 'active' : ''}`}>
          {title}
        </a>
      </Link>
      <style jsx>{`
        a {
          font: inherit;
        }

        .link {
          display: flex;
          align-items: baseline;
          font-size: 0.9rem;
          color: ${theme.palette.accents_6};
          padding: calc(${layout.gap} * 0.375) 0;
          transition: all 200ms ease;
        }

        .link:hover {
          color: ${theme.palette.foreground};
        }

        .link.active {
          color: ${theme.palette.link};
          font-weight: 600;
        }

        .link.active span {
          color: ${theme.palette.foreground};
        }
      `}</style>
    </>
  );
};

export default SidebarLink;
