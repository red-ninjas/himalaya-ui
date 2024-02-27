'use client';
import React from 'react';
import useTheme from '../use-theme';
import LinkIcon from './icon';
import { addColorAlpha } from '../utils/color';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export interface Props {
  href?: string;
  color?: boolean;
  icon?: boolean;
  underline?: boolean | 'hover';
  block?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<any>, keyof Props>;
export type LinkProps = Props & NativeAttrs;

const LinkComponent = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>(
  (
    { href = '', color = false, underline = false, children, className = '', block = false, icon = false, ...props }: React.PropsWithChildren<LinkProps>,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const theme = useTheme();
    const { RESPONSIVE } = useScale();
    const linkColor = color || block ? theme.palette.link.value : 'inherit';
    const hoverColor = color || block ? theme.palette.link.light : 'inherit';
    const classes = useClasses('link margin padding width height font', { block }, className, {
      underline: underline === true,
      'underline-hover': underline === 'hover',
    });

    return (
      <a className={classes} href={href} {...props} ref={ref}>
        {children}
        {icon && <LinkIcon />}
        <style jsx>{`
          .link {
            display: inline-flex;
            align-items: baseline;
            line-height: inherit;
            color: ${linkColor};
            text-decoration: none;
            border-radius: ${block ? theme.style.radius : 0};
            transition: color 200ms ease 0ms;
            text-decoration: none;
          }

          .underline {
            text-decoration: underline;
          }
          .underline-hover {
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }

          .link:hover {
            background-color: ${block ? addColorAlpha(theme.palette.link.light, 0.1) : 'unset'};
            color: ${hoverColor};
          }

          ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`)}
          ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`)}
          ${RESPONSIVE.padding(
            {
              top: 0.125,
              bottom: 0.125,
              left: 0.25,
              right: 0.25,
            },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'block',
          )}
          ${RESPONSIVE.margin(
            {
              top: 0,
              bottom: 0,
              left: -0.125,
              right: -0.125,
            },
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'block',
          )}
          ${RESPONSIVE.w(1, value => `width: ${value};`, 'fit-content')}
          ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto')}
          ${RESPONSIVE.font(1, value => `font-size: ${value};`, 'inherit')}
        `}</style>
      </a>
    );
  },
);

LinkComponent.displayName = 'HimalayaLink';
const Link = withScale(LinkComponent);
export default Link;
