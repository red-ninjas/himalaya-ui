import { MenuProps } from './index';
import useScale, { withScale } from '../use-scale';
import Popover from '../popover';
import { pickChild } from '../utils/collections';
import { PropsWithChildren } from 'react';
import MenuItem from './menu-item';

function MenuComponent({ content = 'Menu', placement = 'bottomStart', children, ...other }: PropsWithChildren<MenuProps>) {
  const [, menuItems] = pickChild(children, MenuItem);
  const { RESPONSIVE, SCALER } = useScale();

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
          min-width: var(--menu-items-width);
          display: flex;
          flex-direction: column;
        }

        ${RESPONSIVE.w(8.75, value => `--menu-items-width: ${value};`, undefined, 'menu-items')}
        ${RESPONSIVE.padding(
          {
            top: 0.5,
            right: 0.35,
            left: 0.35,
            bottom: 0.5,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'menu-items',
        )}
        ${SCALER('menu-items')}
      `}</style>
    </>
  );
}

MenuComponent.displayName = 'HimalayaMenu';
const Menu = withScale(MenuComponent);

export default Menu;
