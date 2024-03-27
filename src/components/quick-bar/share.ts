import { HTMLAttributeAnchorTarget } from 'react';
import { COLOR_TYPES } from '../utils/prop-types';
import { ScaleResponsiveParameter } from '../use-scale';

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
  type?: COLOR_TYPES;
  space?: ScaleResponsiveParameter<number | string>;
}
