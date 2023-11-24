'use client';

import { PropsWithChildren } from 'react';
import { RunningTextProps } from '.';
import useScale, { withScale } from '../use-scale';

const RunningText: React.FC<PropsWithChildren<RunningTextProps>> = ({
  children,
  animationTime = 80000,
  gap = 3,
  ...props
}: PropsWithChildren<RunningTextProps>) => {
  const { SCALES } = useScale();
  return (
    <div className="running-outer" {...props}>
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
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
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
      `}</style>
    </div>
  );
};

export default withScale(RunningText);
