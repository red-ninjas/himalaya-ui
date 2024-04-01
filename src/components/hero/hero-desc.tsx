'use client';

import { PropsWithChildren } from 'react';
import { useScale, withScale } from '../use-scale';
import { HeroCoreProps } from './share';
import useClasses from '../use-classes';

const HeroDesc: React.FC<PropsWithChildren<HeroCoreProps>> = ({ Tag = 'h2', children, ...props }: PropsWithChildren<HeroCoreProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <Tag className={useClasses('desc', CLASS_NAMES)} {...props}>
      {children}
      <style jsx>{`
        .desc {
          word-break: break-word;
          font-weight: 400;
          display: inline-block;
          color: var(--color-background-400);
        }

        ${SCALE.font(1.3, value => `font-size: ${value};`, undefined, 'desc')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'desc')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, 'auto', 'desc')}

        ${UNIT('desc')}
      `}</style>
    </Tag>
  );
};

HeroDesc.displayName = 'HimalayaHeroDesc';
export default withScale(HeroDesc);
