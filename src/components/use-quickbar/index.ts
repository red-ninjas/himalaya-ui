export interface QuickBarProviderProps {
  hideOnMobile?: boolean;
}

import { useQuickBar } from './quickbar-context';
export { default as QuickBarProvider } from './quickbar-provider';
export default useQuickBar;
