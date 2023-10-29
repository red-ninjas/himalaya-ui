'use client';
import useTheme from '../use-theme';
import React, { useMemo } from 'react';
import { Placement } from '../utils/prop-types';
import { getIconPosition } from './placement';

interface Props {
  placement: Placement;
}

const TooltipIcon: React.FC<Props> = ({ placement }) => {
  const theme = useTheme();
  const { transform, top, left, right, bottom } = useMemo(
    () => getIconPosition(placement, 'var(--tooltip-icon-offset-x)', 'var(--tooltip-icon-offset-y)'),
    [placement],
  );

  return (
    <span>
      <style jsx>{`
        span {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 6px 6px 0;
          border-color: transparent ${theme.palette.border} transparent transparent;
          position: absolute;
          left: ${left};
          top: ${top};
          right: ${right};
          bottom: ${bottom};
          transform: ${transform};
        }
      `}</style>
    </span>
  );
};

export default TooltipIcon;
