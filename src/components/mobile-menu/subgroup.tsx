'use client';
import React, { PropsWithChildren, ReactNode } from 'react';
import { INavigationItem } from './index';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

export interface MobileNavigationSubGroupProps extends INavigationItem {
  expanded?: boolean;
  subgroupTitle?: string;
}

const MobileNavigationSubGroup: React.FC<PropsWithChildren<MobileNavigationSubGroupProps>> = ({ children, title }) => {
  const theme = useTheme();
  const { SCALES } = useScale();

  const childs = (childElements: ReactNode) => {
    return (
      <div className="sub-group">
        {title && <h4 className="sub-group-title">{title}</h4>}
        <div className="sub-group-inner">{childElements}</div>
        <style jsx>{`
          .sub-group {
            padding: ${SCALES.pt(0)} ${SCALES.pr(0.8)} ${SCALES.pb(0)} ${SCALES.pl(0.8)};
          }
          .sub-group-title {
            color: ${theme.palette.background.hex_400};
            margin-bottom: ${SCALES.pt(0.5)};
            margin-top: ${SCALES.pt(0.5)};
            font-size: ${SCALES.pt(0.75)};
            text-transform: uppercase;
            font-weight: normal;
          }
          .sub-group-inner {
            border-left: 1px solid ${theme.palette.border.value};
            margin: ${SCALES.pt(0)} ${SCALES.pr(0.6)} ${SCALES.pb(0)} ${SCALES.pl(0.6)};
            padding-left: ${SCALES.pl(0.55)};
          }
          :global(.sub-group-inner > .item) {
            border-bottom: 0 !important;
          }
        `}</style>
      </div>
    );
  };

  return childs(children);
};
MobileNavigationSubGroup.displayName = 'HimalayaNavigationItem';

export default withScale(MobileNavigationSubGroup);
