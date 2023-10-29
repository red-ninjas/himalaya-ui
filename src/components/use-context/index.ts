import ConfigProvider from './config-provider';
export type { ConfigProps } from './config-provider';
export { useConfigs, defaultToastLayout } from './config-context';
export { default as ThemeProvider } from './theme-provider';
export { default as StyledJsxRegistry } from './registry';

export type { UpdateToastsFunction, UpdateToastsLayoutFunction, UpdateToastsIDFunction } from './config-context';
export default ConfigProvider;
