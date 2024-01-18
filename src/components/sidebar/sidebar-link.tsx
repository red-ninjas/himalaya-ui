'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import useLayout from '../use-layout';
import useTheme from '../use-theme';

export interface Props {}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Props>;
export type SideBarLinkProp = Props & NativeAttrs;

const SidebarLink: React.FC<PropsWithChildren<SideBarLinkProp>> = ({ children, href, ...props }) => {
  const theme = useTheme();
  const layout = useLayout();
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <>
      <Link legacyBehavior href={href || ''}>
        <a {...props} className={`link ${isActive ? 'active' : ''}`}>
          {children}
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
          color: ${theme.palette.accents_5};
          padding: calc(${layout.gap} * 0.375) 0;
          transition: all 200ms ease;
        }

        .link:hover {
          color: ${theme.palette.foreground};
        }

        .link.active {
          color: ${theme.palette.link.value};
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
