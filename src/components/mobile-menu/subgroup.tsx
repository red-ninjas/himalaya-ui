'use client';
import React, { PropsWithChildren, ReactNode } from 'react';
import { INavigationItem } from './index';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
export interface MobileNavigationSubGroupProps extends INavigationItem {
  expanded?: boolean;
  subgroupTitle?: string;
}

const MobileNavigationSubGroup: React.FC<PropsWithChildren<MobileNavigationSubGroupProps>> = ({ children, title }) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  const childs = (childElements: ReactNode) => {
    return (
      <div className={useClasses('sub-group', SCALE_CLASSES)}>
        {title && <h4 className="sub-group-title">{title}</h4>}
        <div className="sub-group-inner">{childElements}</div>
        <style jsx>{`
          .sub-group-title {
            color: var(--color-background-400);
            text-transform: uppercase;
            font-weight: normal;
          }
          .sub-group-inner {
            border-left: 1px solid var(--color-border-1000);
          }
          :global(.sub-group-inner > .item) {
            border-bottom: 0 !important;
          }

          ${RESPONSIVE.padding(
            { left: 0.8, right: 0.8, top: 0, bottom: 0 },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'sub-group',
          )}
          ${RESPONSIVE.my(0.5, value => `margin-top: ${value};margin-bottom: ${value}`, undefined, 'sub-group-title')}
          ${RESPONSIVE.font(0.75, value => `font-size: ${value};`, undefined, 'sub-group-title')}
          ${RESPONSIVE.margin(
            {
              top: 0,
              left: 0.6,
              right: 0.6,
              bottom: 0,
            },
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'sub-group-inner',
          )}
          ${RESPONSIVE.pl(0.55, value => `padding-left: ${value};`, undefined, 'sub-group-inner')}
          ${SCALER('sub-group')}
        `}</style>
      </div>
    );
  };

  return childs(children);
};
MobileNavigationSubGroup.displayName = 'HimalayaNavigationItem';

export default withScale(MobileNavigationSubGroup);
