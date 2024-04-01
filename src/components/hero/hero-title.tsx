'use client';

import { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import { HeroCoreProps } from './share';
import useClasses from '../use-classes';

const HeroTitle: React.FC<PropsWithChildren<HeroCoreProps>> = ({ Tag = 'h1', children, ...props }: PropsWithChildren<HeroCoreProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <Tag className={useClasses('title', CLASS_NAMES)} {...props}>
      {children}
      <style jsx>{`
        .title {
          word-break: break-word;
          font-weight: 800;
          will-change: transform;
          line-height: 1.2;
          color: var(--color-foreground-1000);
          display: inline-block;
        }

        ${SCALE.font(5, value => `font-size: ${value};`, undefined, 'title')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'title')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, 'auto', 'title')}

        ${UNIT('title')}
      `}</style>
    </Tag>
  );
};

HeroTitle.displayName = 'HimalayaHeroTitle';
export default withScale(HeroTitle);
