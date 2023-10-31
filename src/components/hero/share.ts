import { Gradient } from 'components/themes/presets';
export interface HeroProps {
  extraPaddingDown?: number;
  withDownArrow?: boolean;
}
export interface HeroTagProps {
  hasGradient?: boolean;
  background?: string;
  gradient?: Gradient;
  textColor?: string;
}
