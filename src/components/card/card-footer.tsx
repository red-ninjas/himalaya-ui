'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  disableAutoMargin?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type CardFooterProps = Props & NativeAttrs;

const CardFooterComponent: React.FC<React.PropsWithChildren<CardFooterProps>> = ({
  children,
  className = '',
  disableAutoMargin = false,
  ...props
}: CardFooterProps) => {
  const { RESPONSIVE, SCALER, HIDER } = useScale();
  const classes = useClasses('card-footer', { 'auto-margin': !disableAutoMargin }, className, HIDER);

  return (
    <footer className={classes} {...props}>
      {children}
      <style jsx>{`
        .card-footer {
          display: flex;
          align-items: center;
          overflow: hidden;
          color: inherit;
          background-color: inherit;
          border-top: 1px solid var(--color-border);
          border-bottom-left-radius: var(--card-border-radius);
          border-bottom-right-radius: var(--card-border-radius);
        }

        .auto-margin :global(*) {
          margin-top: 0;
          margin-bottom: 0;
          margin-right: var(--layout-gap-quarter);
        }

        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'card-footer')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'card-footer')}
        ${RESPONSIVE.h(3.3, value => `min-height: ${value};`, undefined, 'card-footer')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'card-footer')}

        ${RESPONSIVE.padding(
          {
            left: 1.31,
            right: 1.31,
            top: 0.66,
            bottom: 0.66,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'card-footer',
        )}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'card-footer')}
        ${SCALER('card-footer')}
      `}</style>
    </footer>
  );
};

CardFooterComponent.displayName = 'HimalayaCardFooter';
const CardFooter = withScale(CardFooterComponent);
export default CardFooter;
