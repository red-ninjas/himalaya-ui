import { PropsWithChildren } from 'react';
import useTheme from '../use-theme';
import { MenuItemProps } from './index';

export default function MenuItem({
  children,
  ...other
}: PropsWithChildren<MenuItemProps>) {
  const theme = useTheme();
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

          &:hover {
            background: ${theme.expressiveness.linkHoverStyle};
          }
        }
      `}</style>
    </>
  );
}
