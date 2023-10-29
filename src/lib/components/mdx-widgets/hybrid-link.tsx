import React from 'react';
import NextLink from 'next/link';
import { Link, LinkProps } from 'components';
import { usePathname } from 'next/navigation';

export type HybridLinkProps = LinkProps;

const HybridLink: React.FC<HybridLinkProps> = ({ href = '#', children, ...props }) => {
  const isRelativeUrl = !/^([a-z0-9]*:|.{0})\/\/.*$/gim.test(href);
  const pathname = usePathname();
  const isHomePage = pathname.includes('guide/introduction');

  if (isRelativeUrl) {
    return (
      <NextLink href={href} passHref legacyBehavior>
        <Link color block {...props}>
          {children}
        </Link>
      </NextLink>
    );
  }

  return (
    <Link href={href} target="_blank" color icon={!isHomePage} rel="noreferrer nofollow" {...props}>
      {children}
    </Link>
  );
};

export default HybridLink;
