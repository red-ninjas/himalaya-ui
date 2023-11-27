import { Gradient } from '../themes/presets';
import { HTMLAttributes } from 'react';
export interface HeroProps {
  extraPaddingDown?: number;
  withDownArrow?: boolean;
  scrollToId?: string;
}

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof HeroProps>;
export type HeroPropsNative = HeroProps & NativeAttrs;

export interface HeroCoreProps {
  Tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface HeroTagProps extends HeroCoreProps {
  hasGradient?: boolean;
  background?: string;
  gradient?: Gradient;
  textColor?: string;
}
