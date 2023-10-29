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
      <>
        {title && <h4 className="sub-group">{title}</h4>}
        <div className="sub-group-inner">{childElements}</div>
        <style jsx>{`
          .sub-group {
            color: ${theme.palette.accents_5};
            margin-bottom: ${SCALES.pt(0.875)};
            margin-top: ${SCALES.pt(0.875)};
            font-size: ${SCALES.pt(0.75)};
            text-transform: uppercase;
            font-weight: normal;
          }
          .sub-group-inner {
            border-left: 1px solid ${theme.palette.border};
            margin: ${SCALES.pt(0)} ${SCALES.pr(0.6)} ${SCALES.pb(0)} ${SCALES.pl(0.6)};
          }
        `}</style>
      </>
    );
  };

  return <>{childs(children)}</>;
};
MobileNavigationSubGroup.displayName = 'HimalayaNavigationItem';

export default withScale(MobileNavigationSubGroup);
