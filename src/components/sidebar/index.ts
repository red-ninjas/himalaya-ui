import Sidebar from './sidebar';
import SidebarGroup from './sidebar-group';
import SidebarLink from './sidebar-link';
export type { SidebarProps } from './sidebar';

export type SidebarComponentType = typeof Sidebar & {
	Group: typeof SidebarGroup;
	Item: typeof SidebarLink;
};

(Sidebar as SidebarComponentType).Group = SidebarGroup;
(Sidebar as SidebarComponentType).Item = SidebarLink;

export default Sidebar as SidebarComponentType;
