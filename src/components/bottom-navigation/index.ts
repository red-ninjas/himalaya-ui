import BottomNavigationItem from './item';
import BottomNavigation from './bottom-navigation';
import React from 'react';

export interface IBottomNavigationItem {
  url?: string;
  icon?: React.ReactNode;
  exactMatch?: boolean;
}

export type NavigationItemComponentType = typeof BottomNavigationItem;

export type NavigationComponentType = typeof BottomNavigation & {
  Item: NavigationItemComponentType;
};
(BottomNavigation as NavigationComponentType).Item = BottomNavigationItem as NavigationItemComponentType;

export type { BottomNavigationItemProps } from './item';
export default BottomNavigation as NavigationComponentType;
