import Page from './page';
import PageHeader from './page-header';
import PageContent from './page-content';
import PageFooter from './page-footer';
import { SidebarProps } from '../sidebar/sidebar';

export interface Meta {
  title: string;
}
export interface LayoutProps {
  meta: Meta;
  sidebar?: SidebarProps;
  getStaticProps?: any;
}

export type PageComponentType = typeof Page & {
  Header: typeof PageHeader;
  Content: typeof PageContent;
  Body: typeof PageContent;
  Footer: typeof PageFooter;
};
(Page as PageComponentType).Header = PageHeader;
(Page as PageComponentType).Content = PageContent;
(Page as PageComponentType).Body = PageContent;
(Page as PageComponentType).Footer = PageFooter;

export type { PageProps, PageRenderMode } from './page';
export type { PageHeaderProps } from './page-header';
export type { PageContentProps } from './page-content';
export type { PageFooterProps } from './page-footer';
export { default as ErrorPage404 } from './404';
export { default as MobilePage } from './mobile-page';

export default Page as PageComponentType;
