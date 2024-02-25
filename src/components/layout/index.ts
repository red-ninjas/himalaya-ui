import { InnerScrollEvent } from '../scroll';

export { default as ScrollableLayout } from './scrollable-layout';
export { default as GradientContent } from './gradient-content';
export { default as PageLayout } from './page-layout';
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
