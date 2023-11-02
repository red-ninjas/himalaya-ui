'use client';

import { PropsWithChildren } from 'react';
import { useScale, withScale } from '../use-scale';
import useTheme from '../use-theme';
import { HeroCoreProps } from './share';

const HeroDesc: React.FC<PropsWithChildren<HeroCoreProps>> = ({ Tag = 'h2', children, ...props }: PropsWithChildren<HeroCoreProps>) => {
  const theme = useTheme();
  const { SCALES } = useScale();

  return (
    <Tag className="desc" {...props}>
      {children}

      <style jsx>{`
        .desc {
          font-size: ${SCALES.font(1.3)};
          word-break: break-word;
          font-weight: 400;
          display: inline-block;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0, 'auto')} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0, 'auto')} ${SCALES.ml(0, 'auto')};
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </Tag>
  );
};

HeroDesc.displayName = 'HimalayaHeroDesc';
export default withScale(HeroDesc);
