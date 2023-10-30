import { ReactElement } from 'react';
import { Placement } from '../utils/prop-types';
import Menu from './menu';
import MenuItem from './menu-item';

export type MenuProps = {
  trigger: ReactElement | string;
  placement?: Placement | undefined;
};

export type MenuItemProps = {};

export type MenuComponentType = typeof Menu & {
  Item: typeof MenuItem;
};

(Menu as MenuComponentType).Item = MenuItem;

export default Menu as MenuComponentType;
