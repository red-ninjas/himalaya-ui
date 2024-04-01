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

type NativeAttrs = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof Props>;
export type TagProps = Props & NativeAttrs;

const TagComponent: React.FC<React.PropsWithChildren<TagProps>> = ({
  type = 'default' as UIColorTypes,
  children,
  className = '',
  filled = true,
  ...props
}: React.PropsWithChildren<TagProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const classes = useClasses('tag', className, type ? 'color-' + type : null, { filled }, CLASS_NAMES);

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
          --tag-bg: var(--color-base);
          --tag-color: var(--color-foreground-1000);
          --tag-border: var(--color-contrast);
        }

        .tag.color-default.filled {
          --tag-bg: var(--color-contrast);
          --tag-color: var(--color-base);
          --tag-border: var(--color-contrast);
        }

        .tag.filled {
          --tag-bg: var(--color-base);
          --tag-color: var(--color-contrast);
          --tag-border: var(--color-base);
        }

        ${SCALE.h(1.75, value => `height: ${value};`, undefined, 'tag')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'tag')}
        ${SCALE.r(0.3125, value => `border-radius: ${value};`, 'var(--layout-radius)', 'tag')}
        ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'tag')}
        ${SCALE.padding(0.375, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tag')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tag')}

        ${UNIT('tag')}
      `}</style>
    </span>
  );
};

TagComponent.displayName = 'HimalayaTag';
const Tag = withScale(TagComponent);
export default Tag;
