import { InnerScrollEvent } from '../scroll';

export { default as GradientContent } from './gradient-content';
export { default as LayoutProvider } from './layout-provider';

export interface ScrollableLayoutProps {
  background?: string;
  onScroll?: (event: InnerScrollEvent) => void;
}

export interface GradientContentProps {
  gradient?: string;
  img?: string;
  maxHeight?: string;
}
