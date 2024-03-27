import { QuickActionTypes } from '../utils/prop-types';
import { HTMLAttributeAnchorTarget } from 'react';

export interface LayoutProps {
  animationTime?: number;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof LayoutProps>;
export type QuickBarLayoutProps = LayoutProps & NativeAttrs;

export interface QuickActionProps {
  tooltip?: string | React.ReactNode;
  exactMatch?: boolean;
  target?: HTMLAttributeAnchorTarget | undefined;
  highlightLeft?: number;
  href?: string;
  type?: QuickActionTypes;
}
