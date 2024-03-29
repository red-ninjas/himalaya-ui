'use client';

import useScale, { withScale } from '../use-scale';
import { PropsWithChildren } from 'react';
import useClasses from '../use-classes';

const HeroActions: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  return (
    <div className={useClasses('actions', SCALE_CLASSES)} {...props}>
      {children}
      <style jsx>{`
        .actions {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: center;
        }

        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'actions')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, 'auto', 'actions')}
        ${RESPONSIVE.mt(2, value => `margin-top: ${value}`, undefined, 'actions')}

        ${SCALER('actions')}
      `}</style>
    </div>
  );
};

HeroActions.displayName = 'HimalayaHeroActions';
export default withScale(HeroActions);
