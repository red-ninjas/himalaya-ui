import NavigationItem from './item';
import NavigationSubItem from './sub-item';
import Navigation from './navigation';

export interface INavigationItem {
  title?: string;
  url?: string;
  desc?: string;
  icon?: React.ReactNode;
  exactMatch?: boolean;
}

export type NavigationItemComponentType = typeof NavigationItem & {
  Child: typeof NavigationSubItem;
};
(NavigationItem as NavigationItemComponentType).Child = NavigationSubItem;

export type NavigationComponentType = typeof Navigation & {
  Item: NavigationItemComponentType;
};
(Navigation as NavigationComponentType).Item = NavigationItem as NavigationItemComponentType;

export type { NavigationItemProps } from './item';
export default Navigation as NavigationComponentType;
