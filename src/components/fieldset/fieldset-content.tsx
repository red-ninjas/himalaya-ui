'use client';
import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type FieldsetContentProps = Props & NativeAttrs;

const FieldsetContentComponent: React.FC<React.PropsWithChildren<FieldsetContentProps>> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<FieldsetContentProps>) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  const classes = useClasses('content', className, SCALE_CLASSES);

  return (
    <div className={classes} {...props}>
      {children}
      <style jsx>{`
        .content {
        }
        .content :global(> *:first-child) {
          margin-top: 0;
        }
        .content :global(> *:last-child) {
          margin-bottom: 0;
        }

        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'content')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'content')}
        ${RESPONSIVE.font(1, value => `--fieldset-font-size: ${value};`, undefined, 'content')}
        ${RESPONSIVE.padding(1.3, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'content')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'content')}
        ${SCALER('content')}
      `}</style>
    </div>
  );
};

FieldsetContentComponent.displayName = 'HimalayaFieldsetContent';
const FieldsetContent = React.memo(withScale(FieldsetContentComponent));
export default FieldsetContent;
