'use client';

import React from 'react';
import useLayout from '../use-layout';
import useScale, { withScale } from '../use-scale';

interface SectionProps {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof SectionProps>;
export type SectionComponentProps = SectionProps & NativeAttrs;

const SectionComponent: React.FC<SectionComponentProps> = ({ className = '', children, ...props }) => {
  const { RESPONSIVE } = useScale();
  const { sectionSpace } = useLayout();

  return (
    <section className={`${className} padding margin width`} {...props}>
      {children}

      <style jsx>{`
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom}  ${value.left};`, {
          top: sectionSpace,
          bottom: sectionSpace,
        })}
        ${RESPONSIVE.margin(0, value => `margin:  ${value.top} ${value.right} ${value.bottom}  ${value.left};`)}
        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%')}
      `}</style>
    </section>
  );
};

SectionComponent.displayName = 'HimalayaSection';
const Section = withScale(SectionComponent);
export default Section;
