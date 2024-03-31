'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

export interface Props {
  icon?: React.ReactNode;
  activeColor?: string;
  activeBackground?: string;
  isActive?: boolean;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Props>;
export type SideBarLinkProp = Props & NativeAttrs;

const SidebarLink = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<SideBarLinkProp>>(
  (
    { children, icon, isActive, activeColor, activeBackground, className, ...props }: React.PropsWithChildren<SideBarLinkProp>,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const { UNIT, SCALE, CLASS_NAMES } = useScale();

    return (
      <a ref={ref} {...props} className={useClasses(`sidebar-link`, { active: isActive, className }, CLASS_NAMES)}>
        {icon && <span className="sidebar-link-icon">{icon}</span>}
        <span className="sidebar-link-title">{children}</span>
        <style jsx>{`
          .sidebar-link-title {
            padding-top: var(--padding-top);
            padding-bottom: var(--padding-bottom);
            padding-left: var(--padding-left);
            padding-right: var(--padding-right);
          }

          .sidebar-link .sidebar-link-icon {
            margin-right: 12px;
            color: var(--color-foreground-600);
            transition:
              color 200ms ease,
              background 200ms ease;
            display: inline-flex;
          }

          .sidebar-link {
            display: flex;
            align-items: baseline;
            color: var(--color-foreground-700);
            box-sizing: border-box;
            align-self: stretch;
            transition:
              color 200ms ease,
              background 200ms ease;
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
            font-weight: 500;
          }

          ${SCALE.font(0.85, value => `font-size: ${value};`, undefined, 'sidebar-link')}
          ${SCALE.margin(
            0,
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            {
              top: undefined,
              bottom: undefined,
              left: `calc(var(--padding-left) * -1)`,
              right: `calc(var(--padding-right) * -1)`,
            },
            'sidebar-link',
          )}
          ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'sidebar-link')}

          ${SCALE.padding(
            0.6,
            value => `--padding-top: ${value.top}; --padding-right: ${value.right}; --padding-bottom: ${value.bottom}; --padding-left: ${value.left};`,
            undefined,
            'sidebar-link',
          )}

          ${UNIT('sidebar-link')}
        `}</style>
      </a>
    );
  },
);
SidebarLink.displayName = 'HimalayaSidebarLink';
export default withScale(SidebarLink);
