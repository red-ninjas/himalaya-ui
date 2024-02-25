import { LinkProps } from 'components/link';
import { HybridCode, HybridLink } from './lib/components';
import { Image } from 'components';
import { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ children, ...props }) => <HybridLink {...(props as LinkProps)}>{children}test</HybridLink>,
    img: props => <Image {...(props as React.ComponentPropsWithoutRef<'img'>)}></Image>,
    pre: ({ children, ...props }) => <HybridCode {...(props as React.ComponentPropsWithoutRef<'pre'>)}>{children}</HybridCode>,
    ...components,
  };
}
