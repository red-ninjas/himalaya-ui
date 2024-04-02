import { UIColorTypes } from '../themes/presets';
import { ScaleResponsiveParameter } from '../use-scale';

export interface ActionProps {
  tooltip?: string | React.ReactNode;
  active?: boolean;
  type?: UIColorTypes;
  space?: ScaleResponsiveParameter<number | string>;
}

type ActionPropsNative = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ActionProps>;
export type QuickActionProps = ActionProps & ActionPropsNative;
