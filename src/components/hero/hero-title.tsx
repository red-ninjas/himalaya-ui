'use client';

import { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import { HeroCoreProps } from './share';
import useClasses from '../use-classes';

const HeroTitle: React.FC<PropsWithChildren<HeroCoreProps>> = ({ Tag = 'h1', children, ...props }: PropsWithChildren<HeroCoreProps>) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  return (
    <Tag className={useClasses('title', SCALE_CLASSES)} {...props}>
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

        ${RESPONSIVE.font(5, value => `font-size: ${value};`, undefined, 'title')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'title')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, 'auto', 'title')}

        ${SCALER('title')}
      `}</style>
    </Tag>
  );
};

HeroTitle.displayName = 'HimalayaHeroTitle';
export default withScale(HeroTitle);
