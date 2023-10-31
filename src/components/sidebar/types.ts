import { default as SidebarComponent } from './sidebar';
import SidebarGroup from './sidebar-group';
import SidebarLink from './sidebar-link';

export type SidebarComponentType = typeof SidebarComponent & {
  Group: typeof SidebarGroup;
  Item: typeof SidebarLink;
};

(SidebarComponent as SidebarComponentType).Group = SidebarGroup;
(SidebarComponent as SidebarComponentType).Item = SidebarLink;

export const Sidebar = SidebarComponent as SidebarComponentType;
