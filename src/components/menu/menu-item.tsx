import { PropsWithChildren } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { MenuItemPropsNative } from './index';

function MenuItemComponent({ children, icon, ...other }: PropsWithChildren<MenuItemPropsNative>) {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <div {...other} className={useClasses({ 'context-menu-item': true, 'has-icon': icon !== undefined }, CLASS_NAMES)}>
      {icon && <span className="context-menu-icon">{icon}</span>}
      {children}
      <style jsx>{`
        .context-menu-item {
          display: flex;
          gap: 8px;
          justify-content: flex-start;
          align-items: center;

          &:hover {
            background: var(--color-background-900);
          }
        }

        ${SCALE.font(0.9, value => `font-size: ${value};`, undefined, 'context-menu-item')}
        ${SCALE.padding(0.5, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'context-menu-item')}
        ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'context-menu-item')}
        ${UNIT('context-menu-item')}
      `}</style>
    </div>
  );
}

MenuItemComponent.displayName = 'HimalayaMenuItem';
const MenuItem = withScale(MenuItemComponent);

export default MenuItem;
