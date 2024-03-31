'use client';
import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof Props>;
export type RadioDescriptionProps = Props & NativeAttrs;

const RadioDescriptionComponent: React.FC<React.PropsWithChildren<RadioDescriptionProps>> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<RadioDescriptionProps>) => {
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();

  return (
    <span className={useClasses('radio-description', className, SCALE_CLASSES)} {...props}>
      {children}
      <style jsx>{`
        .radio-description {
          color: var(--color-background-600);
        }

        ${RESPONSIVE.font(0.85, value => `font-size: ${value};`, undefined, 'radio-description')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'radio-description')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'radio-description')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'radio-description')}
        ${RESPONSIVE.margin(
          0,
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left}; margin-left: calc(var(--radio-size) + var(--radio-size) * 0.375);`,
          undefined,
          'radio-description',
        )}

        ${SCALER('radio-description')}
      `}</style>
    </span>
  );
};

RadioDescriptionComponent.displayName = 'HimalayaRadioDescription';
const RadioDescription = withScale(RadioDescriptionComponent);
export default RadioDescription;
