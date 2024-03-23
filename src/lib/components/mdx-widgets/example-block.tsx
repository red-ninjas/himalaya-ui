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
    theme.palette.background.hex_800,
    theme.palette.background.hex_700,
    theme.palette.background.hex_600,
    theme.palette.background.hex_500,
    theme.palette.background.hex_400,
    theme.palette.background.hex_300,
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
            color: ${theme.palette.background.value};
            font-size: 0.75rem;
          }
        `}</style>
      </div>
    );
  },
);

ExampleBlock.displayName = 'HimalayaExampleBlock';
export default ExampleBlock;
