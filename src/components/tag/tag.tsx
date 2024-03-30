'use client';

import React from 'react';
import { UIColorTypes } from '../themes/presets';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  type?: UIColorTypes;
  filled?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type TagProps = Props & NativeAttrs;

export type TagColors = {
  color: string;
  bgColor: string;
  borderColor: string;
};

const TagComponent: React.FC<React.PropsWithChildren<TagProps>> = ({
  type = 'default' as UIColorTypes,
  children,
  className = '',
  filled = false,
  ...props
}: React.PropsWithChildren<TagProps>) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();
  const classes = useClasses('tag', className, type ? 'color-' + type : null, { filled }, SCALE_CLASSES);

  return (
    <span className={classes} {...props}>
      {children}
      <style jsx>{`
        .tag {
          --tag-bg: var(--color-background-1000);
          --tag-color: var(--color-base);
          --tag-border: var(--color-tint);

          background-color: var(--tag-bg);
          color: var(--tag-color);
          display: inline-block;
          border: 1px solid var(--tag-border);
          box-sizing: border-box;
          line-height: 1em;
        }

        .tag.color-default {
          --tag-bg: var(--color-background-1000);
          --tag-color: var(--color-foreground-800);
          --tag-border: var(--color-border-1000);
        }

        .tag.color-default.filled {
          --tag-bg: var(--color-background-900);
          --tag-color: var(--color-foreground-800);
          --tag-border: var(--color-background-900);
        }

        .tag.filled {
          --tag-bg: var(--color-base);
          --tag-color: var(--color-contrast);
          --tag-border: var(--color-base);
        }

        ${RESPONSIVE.h(1.75, value => `height: ${value};`, undefined, 'tag')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'tag')}
        ${RESPONSIVE.r(0.3125, value => `border-radius: ${value};`, 'var(--layout-radius)', 'tag')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'tag')}
        ${RESPONSIVE.padding(0.375, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tag')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tag')}

        ${SCALER('tag')}
      `}</style>
    </span>
  );
};

TagComponent.displayName = 'HimalayaTag';
const Tag = withScale(TagComponent);
export default Tag;
