'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';
import useLayout from '../use-layout';

interface SectionProps {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof SectionProps>;
export type SectionComponentProps = SectionProps & NativeAttrs;

const SectionComponent: React.FC<SectionComponentProps> = ({ className = '', children, ...props }) => {
  const { SCALES } = useScale();
  const { sectionSpace } = useLayout();
  return (
    <section className={`inner-section ${className}`} {...props}>
      {children}
      <style jsx>{`
        .inner-section {
          width: ${SCALES.w(1, '100%')};
          padding: ${SCALES.pt(0, sectionSpace)} ${SCALES.pr(0)} ${SCALES.pb(0, sectionSpace)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </section>
  );
};

SectionComponent.displayName = 'HimalayaSection';
const Section = withScale(SectionComponent);
export default Section;
