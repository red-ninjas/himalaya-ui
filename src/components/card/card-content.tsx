'use client';
import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type CardContentProps = Props & NativeAttrs;

const CardContentComponent: React.FC<React.PropsWithChildren<CardContentProps>> = ({ className = '', children, ...props }: CardContentProps) => {
  const { RESPONSIVE, SCALER } = useScale();

  return (
    <div className={useClasses('content', className)} {...props}>
      {children}
      <style jsx>{`
        .content > :global(p:first-child) {
          margin-top: 0;
        }

        .content > :global(p:last-child) {
          margin-bottom: 0;
        }

        ${RESPONSIVE.padding(1, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'content')}
        ${RESPONSIVE.margin(1, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, 0, 'content')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'content')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'content')}

        ${SCALER('content')}
      `}</style>
    </div>
  );
};

CardContentComponent.displayName = 'HimalayaCardContent';
const CardContent = withScale(CardContentComponent);
export default CardContent;
