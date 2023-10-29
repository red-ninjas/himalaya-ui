import React from 'react';
import MobileMenu from './mobile-menu';
import MobileNavigationItem from './item';
import MobileNavigationGroup from './group';
import MobileNavigationSubGroup from './subgroup';

export type INavigationItem = {
  title?: string;
  url?: string;
  desc?: string;
  icon?: React.ReactNode;
  exactMatch?: boolean;
};

export type MobileMenuProps = {
  isSwipeable?: boolean;
  direction?: 'left' | 'right';
  animationTime?: number;
};

export type MobileMenuButtonProps = {
  notHiding?: boolean;
  toggleMenu?: () => void;
};

export type MobileNavigationComponentType = typeof MobileMenu & {
  Item: MobileNavigationItemComponentType;
  Group: MobileNavigationGroupComponentType;
  SubGroup: MobileNavigationSubGroupComponentType;
};

export type MobileNavigationItemComponentType = typeof MobileNavigationItem;
export type MobileNavigationGroupComponentType = typeof MobileNavigationGroup;
export type MobileNavigationSubGroupComponentType = typeof MobileNavigationSubGroup;
(MobileMenu as MobileNavigationComponentType).Item = MobileNavigationItem as MobileNavigationItemComponentType;
(MobileMenu as MobileNavigationComponentType).Group = MobileNavigationGroup as MobileNavigationGroupComponentType;
(MobileMenu as MobileNavigationComponentType).SubGroup = MobileNavigationSubGroup as MobileNavigationSubGroupComponentType;

export { default as MobileMenuButton } from './mobile-menu-button';
export default MobileMenu as MobileNavigationComponentType;
