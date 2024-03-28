import { ScaleResponsiveParameter } from '../use-scale';
import { COLOR_TYPES } from '../utils/prop-types';

export interface LayoutProps {
  animationTime?: number;
  hasBorder?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof LayoutProps>;
export type QuickBarLayoutProps = LayoutProps & NativeAttrs;

export interface ActionProps {
  tooltip?: string | React.ReactNode;
  active?: boolean;
  type?: COLOR_TYPES;
  space?: ScaleResponsiveParameter<number | string>;
}

type ActionPropsNative = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ActionProps>;
export type QuickActionProps = ActionProps & ActionPropsNative;
