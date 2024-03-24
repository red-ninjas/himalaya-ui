import { QuickActionTypes } from '../utils/prop-types';
import { HTMLAttributeAnchorTarget } from 'react';

export interface QuickBarLayoutProps {
  animationTime?: number;
}

export interface QuickActionProps {
  tooltip?: string | React.ReactNode;
  exactMatch?: boolean;
  target?: HTMLAttributeAnchorTarget | undefined;
  highlightLeft?: number;
  href?: string;
  type?: QuickActionTypes;
}
