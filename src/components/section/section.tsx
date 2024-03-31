'use client';

import React from 'react';
import useLayout from '../use-layout';
import useScale, { withScale } from '../use-scale';
import useClasses from 'components/use-classes';

interface SectionProps {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof SectionProps>;
export type SectionComponentProps = SectionProps & NativeAttrs;

const SectionComponent: React.FC<SectionComponentProps> = ({ className, children, ...props }) => {
  const { SCALE, CLASS_NAMES, UNIT } = useScale();
  const { sectionSpace } = useLayout();

  return (
    <section className={useClasses('section', className, CLASS_NAMES)} {...props}>
      {children}

      <style jsx>{`
        ${SCALE.padding(
          0,
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          {
            top: sectionSpace,
            bottom: sectionSpace,
          },
          'section',
        )}
        ${SCALE.margin(0, value => `margin:  ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'section')}
        ${SCALE.w(1, value => `width: ${value};`, '100%', 'section')}
        ${UNIT('section')}
      `}</style>
    </section>
  );
};

SectionComponent.displayName = 'HimalayaSection';
const Section = withScale(SectionComponent);
export default Section;
