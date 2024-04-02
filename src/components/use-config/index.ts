export { useConfig, defaultToastLayout } from './config-context';
import { useConfig } from './config-context';
export type { UpdateToastsFunction, UpdateToastsLayoutFunction, UpdateToastsIDFunction } from './config-context';

export type { LayoutProps, BreakpointsItem, UIThemesBreakpoints, LayoutPropsContext, ConfigProps } from './shared';
export { defaultBreakpoints } from './shared';

export default useConfig;
