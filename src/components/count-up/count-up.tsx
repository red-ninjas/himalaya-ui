'use client';
import type { Props, ReturnProps } from './';
import { useCountUp } from './useCountUp';

export interface CountUpProps {
  children: (value: ReturnProps) => React.ReactNode | string;
}

export const CountUp: React.FC<Props & CountUpProps> = ({ children, ...props }) => {
  const countUpProps = useCountUp(props);
  return typeof children === 'function' ? children(countUpProps) : countUpProps.value;
};

CountUp.displayName = 'CountUp';
