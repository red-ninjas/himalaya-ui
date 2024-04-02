'use client';
import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type CardContentProps = Props & NativeAttrs;

const CardContentComponent: React.FC<React.PropsWithChildren<CardContentProps>> = ({ className = '', children, ...props }: CardContentProps) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <div className={useClasses('content', className, CLASS_NAMES)} {...props}>
      {children}
      <style jsx>{`
        .content > :global(p:first-child) {
          margin-top: 0;
        }

        .content > :global(p:last-child) {
          margin-bottom: 0;
        }

        ${SCALE.padding(1, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'content')}
        ${SCALE.margin(1, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, 0, 'content')}
        ${SCALE.w(1, value => `width: ${value};`, '100%', 'content')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'content')}

        ${UNIT('content')}
      `}</style>
    </div>
  );
};

CardContentComponent.displayName = 'HimalayaCardContent';
const CardContent = withScale(CardContentComponent);
export default CardContent;
