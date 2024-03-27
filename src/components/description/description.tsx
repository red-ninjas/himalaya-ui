'use client';

import React, { ReactNode } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  title?: ReactNode | string;
  content?: ReactNode | string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDListElement>, keyof Props>;
export type DescriptionProps = Props & NativeAttrs;

const DescriptionComponent: React.FC<DescriptionProps> = ({
  title = 'Title' as ReactNode | string,
  content = '' as ReactNode | string,
  className,
  ...props
}: DescriptionProps) => {
  const { RESPONSIVE, SCALER } = useScale();
  const classes = useClasses('description', className);

  return (
    <dl className={classes} {...props}>
      <dt className="description-title">{title}</dt>
      <dd className="description-desc">{content}</dd>

      <style jsx>{`
        .description-title {
          font-size: 0.75em;
          line-height: 1em;
          margin-bottom: 0.5em;
          text-transform: uppercase;
          white-space: nowrap;
          color: var(--color-background-400);
          font-weight: 500;
          display: flex;
        }

        .description-desc {
          font-size: 0.875em;
          margin: 0;
          line-height: 1.1em;
          color: var(--color-foreground-1000);
          font-weight: 500;
        }

        .description-desc :global(p),
        .description-title :global(p) {
          margin: 0;
        }

        ${RESPONSIVE.font(0.75, value => `font-size: ${value};`, undefined, 'description-title')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'description-desc')}
        ${RESPONSIVE.font(1, value => `font-size: ${value};`, undefined, 'description')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'description')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'description')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'description')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'description')}

        ${SCALER('description')}
      `}</style>
    </dl>
  );
};

DescriptionComponent.displayName = 'HimalayaDescription';
const Description = withScale(DescriptionComponent);
export default Description;
