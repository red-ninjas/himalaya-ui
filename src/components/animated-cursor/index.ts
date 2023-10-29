import { ReactNode } from 'react';
import AnimatedCursor from './animated-cursor';

export interface AnimatedCursorOptions {
  children?: ReactNode;
  color?: string;
  innerScale?: number;
  innerSize?: number;
  outerAlpha?: number;
  outerScale?: number;
  outerSize?: number;
}

export type Clickable = string | ({ target: string } & AnimatedCursorOptions);

export interface AnimatedCursorProps extends AnimatedCursorOptions {
  clickables?: Clickable[];
  showSystemCursor?: boolean;
  trailingSpeed?: number;
}

export interface AnimatedCursorCoordinates {
  x: number;
  y: number;
}
export default AnimatedCursor;
