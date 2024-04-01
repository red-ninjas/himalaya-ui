'use client';

import { PropsWithChildren } from 'react';
import { RunningTextProps } from '.';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

const RunningText: React.FC<PropsWithChildren<RunningTextProps>> = ({
  children,
  animationTime = 80000,
  gap = 3,
  ...props
}: PropsWithChildren<RunningTextProps>) => {
  const { UNIT, SCALE, CLASS_NAMES } = useScale();

  return (
    <div className={useClasses('running-outer', CLASS_NAMES)} {...props}>
      <div className="running-inner">
        <div className="running-text">{children}</div>
        <div className="running-text">{children}</div>
        <div className="running-text">{children}</div>
      </div>
      <style jsx>{`
        .running-outer {
          position: relative;
          z-index: 3;
          text-transform: uppercase !important;
          padding: 0;
          overflow: hidden;
          word-break: break-all;
        }
        .running-inner {
          display: flex;
          gap: ${gap}vw;
          flex-wrap: nowrap;
          white-space: nowrap;
        }
        .running-text {
          position: relative;
          display: flex;
          gap: ${gap}vw;
          flex-wrap: nowrap;
          white-space: nowrap;
          animation: slide-har ${animationTime}ms linear infinite;
        }

        :global(.running-text > *) {
          word-break: keep-all;
        }

        @keyframes slide-har {
          0% {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
          }
          100% {
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
          }
        }

        .item {
          padding: 0 30px;
        }

        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'running-outer')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'running-outer')}

        ${UNIT('running-outer')}
      `}</style>
    </div>
  );
};

export default withScale(RunningText);
