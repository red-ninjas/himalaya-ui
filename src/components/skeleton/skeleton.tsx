'use client';

import React from 'react';
import useClasses from '../use-classes';
import { useScale, withScale } from '../use-scale';
import useTheme from '../use-theme';

interface Props {
  squared?: boolean;
  rounded?: boolean;
  component?: keyof React.JSX.IntrinsicElements;
  className?: string;
  show?: boolean;
  minHeight?: number;
  animated?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type SkeletonProps = Props & NativeAttrs;

const SkeletonComponent: React.FC<React.PropsWithChildren<SkeletonProps>> = ({
  component = 'span' as keyof React.JSX.IntrinsicElements,
  children,
  squared = false,
  rounded = false,
  show = false,
  minHeight = 24,
  className = '',
  animated = true,
  ...props
}: React.PropsWithChildren<SkeletonProps>) => {
  const Component = component;
  const theme = useTheme();
  const { SCALES } = useScale();
  const classes = useClasses('skeleton', { rounded, squared, show, stop: !animated, hasChildren: !!children }, className);

  return (
    <Component className={classes} {...props}>
      {children}
      <style jsx>{`
        .skeleton {
          width: ${SCALES.w(1, 'initial')};
          height: ${SCALES.h(1, 'initial')};
          display: block;
          min-height: ${minHeight}px;
          position: relative;
          overflow: hidden;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
        .skeleton,
        .skeleton:before {
          background-image: linear-gradient(
            270deg,
            ${theme.palette.background.accents_1},
            ${theme.palette.background.accents_2},
            ${theme.palette.background.accents_2},
            ${theme.palette.background.accents_1}
          );
          background-size: 400% 100%;
          -webkit-animation: loading 8s ease-in-out infinite;
          animation: loading 8s ease-in-out infinite;
          border-radius: 5px;
        }
        .skeleton.hasChildren:before {
          position: absolute;
          display: block;
          height: 100%;
          content: '';
          width: 100%;
          z-index: 2;
        }

        .skeleton.stop,
        .skeleton.stop:before {
          -webkit-animation: none;
          animation: none;
          background: ${theme.palette.background.accents_2};
        }
        .skeleton.rounded,
        .skeleton.rounded:before {
          border-radius: 100%;
        }
        .skeleton.squared,
        .skeleton.squared:before {
          border-radius: 0;
        }
        .skeleton.show,
        .skeleton.show:before {
          background: transparent;
          width: initial;
          height: initial;
        }
        @-webkit-keyframes loading {
          0% {
            background-position: 200% 0;
          }
          to {
            background-position: -200% 0;
          }
        }
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          to {
            background-position: -200% 0;
          }
        }
      `}</style>
    </Component>
  );
};

SkeletonComponent.displayName = 'HimalayaSkeleton';
const Skeleton = withScale(SkeletonComponent);
export default Skeleton;
