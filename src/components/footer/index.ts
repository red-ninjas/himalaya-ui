import Footer from './footer';
import FooterBottomComponent from './footer-bottom';

import FooterBlock from './footer-block';
import FooterBottomBlock from './footer-bottom-block';
import FooterNavigationComponent from './footer-navigation';
import FooterNavigationItem from './footer-navigation-item';
import { tuple } from '../utils/prop-types';
import { HTMLAttributeAnchorTarget } from 'react';

const justify = tuple('flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly');
export type FooterBlockJustify = (typeof justify)[number];

export interface FooterProps {}
export interface FooterBlockProps {
  justify?: FooterBlockJustify;
}

export interface FooterBottomItemProps {
  justify?: FooterBlockJustify;
}

export interface FooterNavigationProps {
  title?: string;
}

export interface FooterNavigationItemProps {
  href: string;
  target?: HTMLAttributeAnchorTarget;
}

export type FooterNavigationType = typeof FooterNavigationComponent & {
  Item: typeof FooterNavigationItem;
};
(FooterNavigationComponent as FooterNavigationType).Item = FooterNavigationItem;

export const FooterNavigation = FooterNavigationComponent as FooterNavigationType;

export type FooterBottomType = typeof FooterBottomComponent & {
  Block: typeof FooterBottomBlock;
};
(FooterBottomComponent as FooterBottomType).Block = FooterBottomBlock;

export const FooterBottom = FooterBottomComponent as FooterBottomType;

export type FooterType = typeof Footer & {
  Block: typeof FooterBlock;
  Bottom: typeof FooterBottom;
};
(Footer as FooterType).Block = FooterBlock;
(Footer as FooterType).Bottom = FooterBottom;

export default Footer as FooterType;
