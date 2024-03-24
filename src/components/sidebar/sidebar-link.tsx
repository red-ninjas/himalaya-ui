'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';

export interface Props {
  icon?: React.ReactNode;
  activeColor?: string;
  activeBackground?: string;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Props>;
export type SideBarLinkProp = Props & NativeAttrs;

const SidebarLink: React.FC<PropsWithChildren<SideBarLinkProp>> = ({ children, icon, activeColor, activeBackground, href, ...props }) => {
  const pathname = usePathname();
  const { SCALES } = useScale();

  const isActive = pathname === href;

  return (
    <Link legacyBehavior href={href || ''}>
      <a {...props} className={`sidebar-link ${isActive ? 'active' : ''}`}>
        {icon && <span className="sidebar-link-icon">{icon}</span>}
        <span className="sidebar-link-title">{children}</span>
        <style jsx>{`
          .sidebar-link-title {
          }
          .sidebar-link .sidebar-link-icon {
            margin-right: 12px;
            color: var(--color-foreground-600);
            transition: all 200ms ease;
            display: inline-flex;
          }

          .sidebar-link {
            display: flex;
            align-items: baseline;
            font-size: ${SCALES.font(0.85)};
            color: var(--color-foreground-700);
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
            padding: ${SCALES.pt(0.6)} 0 ${SCALES.pb(0.6)} 0;

            padding-left: ${SCALES.pl(0.6)};
            padding-right: ${SCALES.pl(0.6)};
            box-sizing: border-box;
            align-self: stretch;
            transition: all 200ms ease;
            align-items: center;
          }

          .sidebar-link:hover {
            color: var(--color-foreground-1000);
            background: ${activeBackground || `var(--color-background-900)`};
          }

          .sidebar-link:hover .sidebar-link-icon {
            color: var(--color-foreground-1000);
          }

          .sidebar-link.active {
            background: ${activeBackground || `var(--color-background-900)`};
          }

          .sidebar-link.active .sidebar-link-title,
          .sidebar-link.active .sidebar-link-icon {
            color: ${activeColor || `var(--color-foreground-1000)`};
          }
        `}</style>
      </a>
    </Link>
  );
};

export default withScale(SidebarLink);
