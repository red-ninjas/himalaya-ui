'use client';

import useClasses from 'components/use-classes';
import React from 'react';
import { UIColorTypes } from '../themes/presets';
import useScale, { withScale } from '../use-scale';

interface Props {
  type?: UIColorTypes;
  invert?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof Props>;
export type TagProps = Props & NativeAttrs;

const TagComponent: React.FC<React.PropsWithChildren<TagProps>> = ({
  type = 'default' as UIColorTypes,
  children,
  className,
  invert = true,
  ...props
}: React.PropsWithChildren<TagProps>) => {
  const { RESPONSIVE, SCALE_CLASSES, SCALER } = useScale();

  return (
    <span className={useClasses('tag', type ? 'color-' + type : null, { invert }, className, SCALE_CLASSES)} {...props}>
      {children}
      <style jsx>{`
        .tag {
          --tag-border-color: var(--color-base);
          --tag-background-color: var(--color-background-1000);
          --tag-color: var(--color-base);

          display: inline-block;
          border: 1px solid var(--tag-border-color);
          background-color: var(--tag-background-color);
          color: var(--tag-color);
          box-sizing: border-box;
          line-height: 1em;
        }

        .tag.color-default {
          --color-base: var(--color-foreground-1000);
          --color-border: var(--color-border-1000);
          --color-contrast: var(--color-background-1000);
        }

        .tag.invert {
          --tag-border-color: var(--color-border);
          --tag-background-color: var(--color-base);
          --tag-color: var(--color-contrast);
        }

        ${RESPONSIVE.h(1.75, value => `height: ${value};`, undefined, 'tag')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'tag')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'tag')}
        ${RESPONSIVE.r(0.3125, value => `border-radius: ${value};`, 'var(--layout-radius)', `tag`)}

        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tag')}
        ${RESPONSIVE.padding(0.375, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tag')}
        ${SCALER('tag')}
      `}</style>
    </span>
  );
};

TagComponent.displayName = 'HimalayaTag';
const Tag = withScale(TagComponent);
export default Tag;
