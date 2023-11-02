'use client';

import useScale, { withScale } from '../use-scale';
import { PropsWithChildren } from 'react';

const HeroActions: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  const { SCALES } = useScale();
  return (
    <div className="actions" {...props}>
      {children}
      <style jsx>{`
        .actions {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(2)} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0, 'auto')} ${SCALES.ml(0, 'auto')};
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

HeroActions.displayName = 'HimalayaHeroActions';
export default withScale(HeroActions);
