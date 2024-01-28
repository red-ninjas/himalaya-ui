'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import useLayout from '../use-layout';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

export interface Props {
  icon?: React.ReactNode;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Props>;
export type SideBarLinkProp = Props & NativeAttrs;

const SidebarLink: React.FC<PropsWithChildren<SideBarLinkProp>> = ({ children, icon, href, ...props }) => {
  const theme = useTheme();
  const layout = useLayout();
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
            margin-right: 6px;
            color: ${theme.palette.accents_3};
            transition: all 200ms ease;
          }

          .sidebar-link {
            display: flex;
            align-items: baseline;
            font-size: 0.9rem;
            color: ${theme.palette.accents_5};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0.5)} ${SCALES.mb(0)} ${SCALES.ml(0)};
            padding: ${SCALES.pt(0.6)} 0 ${SCALES.pb(0.6)} 0;

            padding-left: ${SCALES.pl(0.6)};
            padding-right: ${SCALES.pl(0.6)};
            box-sizing: border-box;
            align-self: stretch;
            transition: all 200ms ease;
            align-items: center;
            border-radius: ${theme.style.radius};
          }

          .sidebar-link:hover {
            color: ${theme.palette.foreground};
          }

          .sidebar-link:hover .sidebar-link-icon {
            color: ${theme.palette.foreground};
          }

          .sidebar-link.active {
            color: ${theme.palette.link.value};
            background: ${theme.palette.accents_0};
            font-weight: 600;
          }

          .sidebar-link.active .sidebar-link-title {
            color: ${theme.palette.foreground};
          }

          .sidebar-link.active .sidebar-link-icon {
            color: ${theme.palette.foreground};
          }
        `}</style>
      </a>
    </Link>
  );
};

export default withScale(SidebarLink);
