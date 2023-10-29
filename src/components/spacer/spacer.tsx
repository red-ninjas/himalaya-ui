'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';

interface Props {
  inline?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof Props>;
export type SpacerProps = Props & NativeAttrs;

const SpacerComponent: React.FC<SpacerProps> = ({ inline = false, className = '', ...props }: SpacerProps) => {
  const { SCALES } = useScale();

  return (
    <span className={className} {...props}>
      <style jsx>{`
        span {
          display: ${inline ? 'inline-block' : 'block'};
          width: ${SCALES.width(1)};
          height: ${SCALES.height(1)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </span>
  );
};

SpacerComponent.displayName = 'HimalayaSpacer';
const Spacer = withScale(SpacerComponent);
export default Spacer;
