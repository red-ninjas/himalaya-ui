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
    const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();

    return (
      <a ref={ref} {...props} className={useClasses(`sidebar-link`, { active: isActive, className }, SCALE_CLASSES)}>
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
            transition: all 200ms ease;
            display: inline-flex;
          }

          .sidebar-link {
            display: flex;
            align-items: baseline;
            color: var(--color-foreground-700);
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
            font-weight: 500;
          }

          ${RESPONSIVE.font(0.85, value => `font-size: ${value};`, undefined, 'sidebar-link')}
          ${RESPONSIVE.margin(
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
          ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'sidebar-link')}

          ${RESPONSIVE.padding(
            0.6,
            value => `--padding-top: ${value.top}; --padding-right: ${value.right}; --padding-bottom: ${value.bottom}; --padding-left: ${value.left};`,
            undefined,
            'sidebar-link',
          )}

          ${SCALER('sidebar-link')}
        `}</style>
      </a>
    );
  },
);
SidebarLink.displayName = 'HimalayaSidebarLink';
export default withScale(SidebarLink);
