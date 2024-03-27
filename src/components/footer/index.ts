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
type FooterProps = {};
type FooterPropsNative = Omit<React.HTMLAttributes<HTMLDivElement>, keyof FooterProps>;
export type FooterPropsNativeProps = FooterPropsNative & FooterProps;

type BottomItemProps = {
  justify?: FooterBlockJustify;
};

type BottomItemPropsNative = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BottomItemProps>;
export type FooterBottomItemProps = BottomItemProps & BottomItemPropsNative;

type NavigationProps = {
  title?: string;
};

type FooterNavigationPropsNative = Omit<React.HTMLAttributes<HTMLDivElement>, keyof NavigationProps>;
export type FooterNavigationProps = NavigationProps & FooterNavigationPropsNative;

type NavigationItemProps = {
  href: string;
  target?: HTMLAttributeAnchorTarget;
};

type NativeAttrsNavigationItems = Omit<React.HTMLAttributes<HTMLLIElement>, keyof NavigationItemProps>;
export type FooterNavigationItemProps = NavigationItemProps & NativeAttrsNavigationItems;

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
