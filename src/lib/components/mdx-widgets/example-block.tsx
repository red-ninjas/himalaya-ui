'use client';

import React, { useMemo } from 'react';
import useTheme from 'components/use-theme';
import { UIThemes } from 'components/themes/presets';
import { useLayout } from 'components';

export type ExampleBlockProps = {
  plain?: number | boolean;
};

const getBackground = (theme: UIThemes, plain: number | boolean) => {
  if (typeof plain !== 'number') return theme.palette.primary.value;

  const colors = [
    theme.palette.accents_1,
    theme.palette.accents_2,
    theme.palette.accents_3,
    theme.palette.accents_4,
    theme.palette.accents_5,
    theme.palette.accents_6,
  ];
  return colors[plain - 1] || theme.palette.primary.value;
};

const ExampleBlock: React.FC<React.PropsWithChildren<ExampleBlockProps>> = React.memo(
  ({ plain = false, children, ...props }: React.PropsWithChildren<ExampleBlockProps>) => {
    const theme = useTheme();
    const layout = useLayout();
    const bg = useMemo(() => getBackground(theme, plain), [theme, plain]);

    return (
      <div className="block" {...props}>
        {children}
        <style jsx>{`
          .block {
            width: 100%;
            background: ${bg};
            padding: ${layout.gapHalf};
            border-radius: ${theme.style.radius};
            color: ${theme.palette.background};
            font-size: 0.75rem;
          }
        `}</style>
      </div>
    );
  },
);

ExampleBlock.displayName = 'HimalayaExampleBlock';
export default ExampleBlock;
