'use client';

import useScale, { withScale } from '../use-scale';
import { PropsWithChildren } from 'react';
import useClasses from '../use-classes';

const HeroActions: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <div className={useClasses('actions', CLASS_NAMES)} {...props}>
      {children}
      <style jsx>{`
        .actions {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: center;
        }

        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'actions')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, 'auto', 'actions')}
        ${SCALE.mt(2, value => `margin-top: ${value}`, undefined, 'actions')}

        ${UNIT('actions')}
      `}</style>
    </div>
  );
};

HeroActions.displayName = 'HimalayaHeroActions';
export default withScale(HeroActions);
