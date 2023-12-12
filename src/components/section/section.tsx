'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';

interface SectionProps {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof SectionProps>;
export type SectionComponentProps = SectionProps & NativeAttrs;

const SectionComponent: React.FC<SectionComponentProps> = ({ className = '', children, ...props }) => {
  const { SCALES } = useScale();

  return (
    <section className={`inner-section ${className}`} {...props}>
      {children}
      <style jsx>{`
        .inner-section {
          width: ${SCALES.width(1, '100%')};
          padding: ${SCALES.pt(5)} ${SCALES.pr(0)} ${SCALES.pb(5)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </section>
  );
};

SectionComponent.displayName = 'HimalayaSection';
const Section = withScale(SectionComponent);
export default Section;
