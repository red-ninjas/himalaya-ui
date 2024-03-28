'use client';
import React from 'react';
import useClasses from '../use-classes';
import { ScaleResponsiveParameter, useScale } from '../use-scale/scale-context';
import withScale from '../use-scale/with-scale';
import { customResponsiveAttribute } from '../use-scale';
import { isCSSNumberValue } from '../utils/collections';
import useLayout from '../use-layout';

export interface SideItemProps {
  title: string;
  isActive?: boolean;
  rowGap?: ScaleResponsiveParameter<number | string>;
}

const SidebarGroup: React.FC<React.PropsWithChildren<SideItemProps>> = ({ children, rowGap = 0.0625, ...props }) => {
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();

  const layout = useLayout();
  return (
    <div className={useClasses('sidebar-group', SCALE_CLASSES)}>
      <div className="sidebar-group-label">
        <span
          className={useClasses('sidebar-group-title ', {
            active: props.isActive,
          })}
        >
          {props.title}
        </span>
      </div>
      {children && <div className="childrens">{children}</div>}

      <style jsx>{`
        .sidebar-group-title {
          font-weight: bold;
          transition: all 0.2s ease;
          color: var(--color-foreground-700);
          display: block;

          padding-top: var(--padding-top);
          padding-bottom: var(--padding-bottom);
          padding-left: var(--padding-left);
          padding-right: var(--padding-right);
        }

        .active {
          color: var(--color-foreground-1000);
        }

        .childrens {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          transition: all 0.2s ease-in-out;
          position: relative;
          margin-top: 0.5rem;
        }
        ${customResponsiveAttribute(rowGap, 'childrens', layout.breakpoints, value =>
          !isCSSNumberValue(value) ? `row-gap: ${value};` : `row-gap: calc(var(--scale-unit-scale) * ${value})`,
        )}

        ${RESPONSIVE.margin(
          0,
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          {
            top: undefined,
            bottom: undefined,
            left: undefined,
            right: undefined,
          },
          'sidebar-group',
        )}

        ${RESPONSIVE.margin(
          0,
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          {
            top: undefined,
            bottom: undefined,
            left: `calc(var(--padding-left) * -1)`,
            right: `calc(var(--padding-right) * -1)`,
          },
          'sidebar-group-label',
        )}

        ${RESPONSIVE.padding(
          0.6,
          value => `--padding-top: ${value.top}; --padding-right: ${value.right}; --padding-bottom: ${value.bottom}; --padding-left: ${value.left};`,
          undefined,
          'sidebar-group',
        )}
        ${RESPONSIVE.font(0.85, value => `font-size: ${value};`, undefined, 'sidebar-group')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'sidebar-group')}

        ${SCALER('sidebar-group')}
      `}</style>
    </div>
  );
};

export default withScale(SidebarGroup);
