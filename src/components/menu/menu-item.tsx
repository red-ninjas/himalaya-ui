import { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { MenuItemProps } from './index';

function MenuItemComponent({ children, ...other }: PropsWithChildren<MenuItemProps>) {
  const theme = useTheme();
  const { SCALES } = useScale();
  return (
    <>
      <div {...other} className="menu-item">
        {children}
      </div>
      <style jsx>{`
        .menu-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: ${SCALES.font(0.9375)};
          padding-top: ${SCALES.font(0.1875)};
          padding-bottom: ${SCALES.font(0.1875)};

          &:hover {
            background: ${theme.expressiveness.linkHoverStyle};
          }
        }
      `}</style>
    </>
  );
}

MenuItemComponent.displayName = 'HimalayaMenuItem';
const MenuItem = withScale(MenuItemComponent);

export default MenuItem;
