import { MenuProps } from './index';
import useScale, { withScale } from '../use-scale';
import Popover from '../popover';
import { pickChild } from '../utils/collections';
import { PropsWithChildren } from 'react';
import MenuItem from './menu-item';

function MenuComponent({ content = 'Menu', placement = 'bottomStart', children, ...other }: PropsWithChildren<MenuProps>) {
  const [, menuItems] = pickChild(children, MenuItem);
  const { SCALES } = useScale();
  return (
    <>
      <Popover p={0} {...other} placement={placement} content={<div className="menu-items">{menuItems}</div>}>
        <div className="content">{content}</div>
      </Popover>
      <style jsx>{`
        .content {
          cursor: pointer;
          align-items: center;
          justify-content: center;
          display: flex;
        }

        .menu-items {
          min-width: ${SCALES.w(8.75)};
          padding: ${SCALES.pt(0.5)} ${SCALES.pr(0.35)} ${SCALES.pb(0.5)} ${SCALES.pl(0.35)};
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}

MenuComponent.displayName = 'HimalayaMenu';
const Menu = withScale(MenuComponent);

export default Menu;
