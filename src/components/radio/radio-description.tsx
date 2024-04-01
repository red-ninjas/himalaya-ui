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
  const { UNIT, SCALE, CLASS_NAMES } = useScale();

  return (
    <span className={useClasses('radio-description', className, CLASS_NAMES)} {...props}>
      {children}
      <style jsx>{`
        .radio-description {
          color: var(--color-background-600);
        }

        ${SCALE.font(0.85, value => `font-size: ${value};`, undefined, 'radio-description')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'radio-description')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'radio-description')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'radio-description')}
        ${SCALE.margin(
          0,
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left}; margin-left: calc(var(--radio-size) + var(--radio-size) * 0.375);`,
          undefined,
          'radio-description',
        )}

        ${UNIT('radio-description')}
      `}</style>
    </span>
  );
};

RadioDescriptionComponent.displayName = 'HimalayaRadioDescription';
const RadioDescription = withScale(RadioDescriptionComponent);
export default RadioDescription;
