'use client';
import React from 'react';
import Image from '../image';
import { UIColorTypes } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { hasChild, pickChild } from '../utils/collections';
import CardContent from './card-content';
import CardFooter from './card-footer';

interface Props {
  hoverable?: boolean;
  shadow?: boolean;
  className?: string;
  hasBorder?: boolean;
  type?: UIColorTypes;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type CardProps = Props & NativeAttrs;

const CardComponent: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  hoverable = true,
  className = '',
  shadow = false,
  hasBorder = true,
  type = 'default' as UIColorTypes,
  ...props
}: CardProps) => {
  const { UNIT, SCALE, CLASS_NAMES } = useScale();

  const [withoutFooterChildren, footerChildren] = pickChild(children, CardFooter);
  const [withoutImageChildren, imageChildren] = pickChild(withoutFooterChildren, Image);
  const hasContent = hasChild(withoutImageChildren, CardContent);

  return (
    <div className={useClasses('card', className, type ? 'color-' + type : null, { hoverable }, CLASS_NAMES)} {...props}>
      {imageChildren}
      {hasContent ? withoutImageChildren : <CardContent>{withoutImageChildren}</CardContent>}
      {footerChildren}
      <style jsx>{`
        .card {
          background: var(--color-background-1000);
          transition: all 0.2s ease;
          box-shadow: ${shadow ? `var(--theme-expressiveness-shadow-small)` : 'none'};
          box-sizing: border-box;

          --card-bg: var(--color-base);
          --card-border: var(--color-border);
          --card-hover-border: var(--color-shade-border);
          --card-hover-border-rgb: var(--color-shade-border-rgb);
          --card-color: var(--color-contrast);

          color: var(--card-color);
          background-color: var(--card-bg);
          border-width: ${hasBorder ? '1px' : '0'};
          border-style: solid;
          border-color: var(--card-border);

          border-radius: var(--card-border-radius);

          &.color-default {
            --card-color: inherit;
          }
        }

        .hoverable {
          &:hover {
            border-color: var(--card-hover-border);
            box-shadow: ${hasBorder ? `0 0 0 4px rgba(var(--card-hover-border-rgb), 0.2)` : `none`};
          }
        }

        .card :global(img) {
          width: 100%;
        }

        .card :global(.image) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'card')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'card')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'card')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'card')}
        ${SCALE.r(1, value => `--card-border-radius: ${value};`, 'var(--layout-radius)', 'card')}
        ${UNIT('card')}
      `}</style>
    </div>
  );
};

CardComponent.displayName = 'HimalayaCard';
const Card = withScale(CardComponent);
export default Card;
