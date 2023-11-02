'use client';

import { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import { HeroCoreProps } from './share';
import useTheme from '../use-theme';

const HeroTitle: React.FC<PropsWithChildren<HeroCoreProps>> = ({ Tag = 'h1', children, ...props }: PropsWithChildren<HeroCoreProps>) => {
  const { SCALES } = useScale();
  const theme = useTheme();
  return (
    <Tag className="title" {...props}>
      {children}
      <style jsx>{`
        .title {
          font-size: ${SCALES.font(5, 'clamp(36px, 8vw, 78px)')};
          word-break: break-word;
          font-weight: 800;
          will-change: transform;
          line-height: 1.2;
          color: ${theme.palette.foreground};
          display: inline-block;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0, 'auto')} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0, 'auto')} ${SCALES.ml(0, 'auto')};
        }
      `}</style>
    </Tag>
  );
};

HeroTitle.displayName = 'HimalayaHeroTitle';
export default withScale(HeroTitle);
