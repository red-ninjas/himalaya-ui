import ConfigProvider from './config-provider'
export type { ConfigProps } from './config-provider'
export { THEME_COOKIE_NAME } from './share'
export { useConfigs, defaultToastLayout } from './config-context'
export { default as ThemeProvider } from './theme-provider'
export type {
  UpdateToastsFunction,
  UpdateToastsLayoutFunction,
  UpdateToastsIDFunction,
} from './config-context'
export default ConfigProvider
