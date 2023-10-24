import CenterHeaderControl from './controls/center-control';
import LeftHeaderControl from './controls/left-control';
import RightHeaderControl from './controls/right-control';
import Header from './header';

export type HeaderComponentType = typeof Header & {
  Left: typeof LeftHeaderControl;
  Right: typeof RightHeaderControl;
  Center: typeof CenterHeaderControl;
};
(Header as HeaderComponentType).Left = LeftHeaderControl;
(Header as HeaderComponentType).Center = CenterHeaderControl;
(Header as HeaderComponentType).Right = RightHeaderControl;

export type { HeaderProps } from './header';
export type { LogoProps } from './logo';
export { default as Logo } from './logo';
export { default as Title } from './title';
export { default as FixedHeader } from './fixed-header';
export default Header as HeaderComponentType;
