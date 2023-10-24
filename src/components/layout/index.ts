import { InnerScrollEvent } from '../scroll';

export { default as ContentLayout } from './content-layout';
export { default as ScrollableLayout } from './scrollable-layout';
export { default as GradientContent } from './gradient-content';
export { default as PageLayout } from './page-layout';
export interface ScrollableLayoutProps {
  background?: string;
  onScroll?: (event: InnerScrollEvent) => void;
}
export interface ContentLayoutProps {
  maxWidth?: number;
}

export interface GradientContentProps {
  gradient?: string;
  img?: string;
  gradientheight?: string;
}
