'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { COLOR_TYPES } from '../utils/prop-types';

interface Props {
  type?: COLOR_TYPES;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type DotProps = Props & NativeAttrs;

const DotComponent: React.FC<React.PropsWithChildren<DotProps>> = ({
  type = 'default' as COLOR_TYPES,
  children,
  className = '',
  ...props
}: React.PropsWithChildren<DotProps>) => {
  const { SCALES } = useScale();
  return (
    <span className={useClasses('dot', type ? 'color-' + type : null, className)} {...props}>
      <span className="icon" />
      <span className="label">{children}</span>
      <style jsx>{`
        .dot {
          display: inline-flex;
          align-items: center;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.w(1, 'auto')};
          height: ${SCALES.h(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
        .icon {
          width: 0.625em;
          height: 0.625em;
          min-width: calc(0.625 * 12px);
          min-height: calc(0.625 * 12px);
          line-height: 0.625em;
          border-radius: 50%;
          background-color: var(--color-base);
          user-select: none;
        }
        .label {
          margin-left: 0.5em;
          font-size: 1em;
          line-height: 1em;
          text-transform: capitalize;
        }
      `}</style>
    </span>
  );
};

DotComponent.displayName = 'HimalayaDot';
const Dot = withScale(DotComponent);
export default Dot;
