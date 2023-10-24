import { useMobileMenu } from './mobile-menu-context';
export { default as MobileMenuProvider } from './mobile-menu-provider';

export interface MobileMenuProviderProps {
  contentAnimationTime?: number;
  direction?: 'left' | 'right';
}

export default useMobileMenu;
