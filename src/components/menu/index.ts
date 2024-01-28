import { ReactElement } from 'react';
import { Placement } from '../utils/prop-types';
import Menu from './menu';
import MenuItem from './menu-item';

export type MenuProps = {
  content: ReactElement | string;
  placement?: Placement | undefined;
};

type MenuItemProps = { icon?: React.ReactNode };

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof MenuItemProps>;
export type MenuItemPropsNative = MenuItemProps & NativeAttrs;

export type MenuComponentType = typeof Menu & {
  Item: typeof MenuItem;
};

(Menu as MenuComponentType).Item = MenuItem;

export default Menu as MenuComponentType;
