import { QuickActionTypes } from '../utils/prop-types';
import { HTMLAttributeAnchorTarget } from 'react';

export interface QuickBarLayoutProps {
  animationTime?: number;
}
interface NativeQuickBarProps {
  header?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof NativeQuickBarProps>;
export type QuickBarProps = NativeQuickBarProps & NativeAttrs;

export interface QuickActionProps {
  tooltip?: string | React.ReactNode;
  exactMatch?: boolean;
  radius?: number;
  target?: HTMLAttributeAnchorTarget | undefined;
  highlightLeft?: number;
  href?: string;
  type?: QuickActionTypes;
}
