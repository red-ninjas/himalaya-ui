'use client';

import { PropsWithChildren } from 'react';
import useTheme from '../use-theme';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
import { HeroTagProps } from './share';

const HeroTag: React.FC<PropsWithChildren<HeroTagProps>> = ({
  children,
  hasGradient = false,
  gradient,
  textColor,
}) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  return (
    <h6 className={useClasses('tag', { gradient: hasGradient })}>
      {children}
      <style jsx>{`
        .tag {
          font-size: ${SCALES.font(0.75)};
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 30px;
          border: 1px solid ${theme.palette.accents_2};
          color: ${theme.palette.accents_8};
          display: inline-block;
          word-break: break-word;
          padding: ${SCALES.pt(0.45)} ${SCALES.pr(1.9)} ${SCALES.pb(0.45)}
            ${SCALES.pl(1.9)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};

          --start-color: ${gradient ? gradient.from : theme.palette.gradient_1.from};
          --end-color: ${gradient ? gradient.to : theme.palette.gradient_1.to};
          --font-color: ${textColor || '#fff'};
          overflow: hidden;
        }

        .gradient {
          border: 0 solid transparent;
          background: linear-gradient(90deg, var(--start-color), var(--end-color));
          color: var(--font-color);
        }
      `}</style>
    </h6>
  );
};

HeroTag.displayName = 'HimalayaHeroTag';
export default withScale(HeroTag);
