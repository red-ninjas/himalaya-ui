'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
interface Props {
  inline?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof Props>;
export type SpacerProps = Props & NativeAttrs;

const SpacerComponent: React.FC<SpacerProps> = ({ inline = false, className, ...props }: SpacerProps) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  return (
    <span className={useClasses('spacer', className, SCALE_CLASSES)} {...props}>
      <style jsx>{`
        .spacer {
          display: ${inline ? 'inline-block' : 'block'};
        }

        ${RESPONSIVE.w(1, value => `width: ${value};`, undefined, 'spacer')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, undefined, 'spacer')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'spacer')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'spacer')}

        ${SCALER('spacer')}
      `}</style>
    </span>
  );
};

SpacerComponent.displayName = 'HimalayaSpacer';
const Spacer = withScale(SpacerComponent);
export default Spacer;
