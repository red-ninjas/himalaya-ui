import NavigationItem from './item';
import NavigationSubItem from './sub-item';
import Navigation from './navigation';

export interface INavigationItem {
  title?: string;
  desc?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export type NavigationItemComponentType = typeof NavigationItem & {
  Child: typeof NavigationSubItem;
};
(NavigationItem as NavigationItemComponentType).Child = NavigationSubItem;

export type NavigationComponentType = typeof Navigation & {
  Item: NavigationItemComponentType;
};
(Navigation as NavigationComponentType).Item = NavigationItem as NavigationItemComponentType;

export type { NavigationPropsExternal } from './item';
export default Navigation as NavigationComponentType;
