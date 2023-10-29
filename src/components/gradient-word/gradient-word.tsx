'use client';

import useTheme from '../use-theme';
import { PropsWithChildren } from 'react';
import { Gradient } from '../themes/presets';

interface GradientWordProps {
  gradient?: Gradient & { degrees?: string };
  animationTime?: number;
}

const GradientWord: React.FC<PropsWithChildren<GradientWordProps>> = ({ children, gradient, animationTime = 8000 }: PropsWithChildren<GradientWordProps>) => {
  const theme = useTheme();
  return (
    <div className="gradient">
      <span>{children}</span>

      <style jsx>
        {`
          .gradient {
            --degrees: ${gradient?.degrees ?? '90deg'};
            --start-color: ${gradient?.from || theme.palette.gradient_1.from};
            --end-color: ${gradient?.to || theme.palette.gradient_1.to};
            position: relative;
            display: inline-block;
            --bg-size: 400%;
          }
          .gradient span {
            background: linear-gradient(var(--degrees), var(--start-color), var(--end-color), var(--start-color)) 0 0 / var(--bg-size) 100%;
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            position: relative;
            z-index: 1;
            animation: foreground ${animationTime}ms linear infinite;
          }

          @keyframes foreground {
            to {
              background-position: var(--bg-size) 0;
            }
          }
        `}
      </style>
    </div>
  );
};
export default GradientWord;
