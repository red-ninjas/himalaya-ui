'use client';

import { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
import { HeroTagProps } from './share';

const HeroTag: React.FC<PropsWithChildren<HeroTagProps>> = ({
  children,
  hasGradient = false,
  gradient,
  textColor,
  background,
  Tag = 'h6',
}: PropsWithChildren<HeroTagProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  return (
    <Tag className={useClasses('tag', { gradient: hasGradient }, CLASS_NAMES)}>
      {children}
      <style jsx>{`
        .tag {
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 30px;
          border: 1px solid var(--color-background-700);
          color: var(--color-background-100);
          background: ${background || 'transparent'};
          display: inline-block;
          word-break: break-word;

          --start-color: ${gradient ? gradient.from : 'var(--gradient-1-from)'};
          --end-color: ${gradient ? gradient.to : 'var(--gradient-1-to)'};
          --font-color: ${textColor || 'var(--color-background-100)'};

          color: var(--font-color);
          overflow: hidden;
        }

        .gradient {
          border: 0 solid transparent;
          background: linear-gradient(90deg, var(--start-color), var(--end-color));
          color: var(--font-color);
        }

        ${SCALE.font(0.75, value => `font-size: ${value};`, undefined, 'tag')}
        ${SCALE.padding(
          {
            top: 0.45,
            right: 1.9,
            bottom: 0.45,
            left: 1.9,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'tag',
        )} ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, 'auto', 'tag')}

        ${UNIT('tag')}
      `}</style>
    </Tag>
  );
};

HeroTag.displayName = 'HimalayaHeroTag';
export default withScale(HeroTag);
