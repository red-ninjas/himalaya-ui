'use client';
import React from 'react';
import { GradientContentProps } from '.';
import PageWidth from '../page-width';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof GradientContentProps>;
export type CardContentProps = GradientContentProps & NativeAttrs;

const GradientContentComponent: React.FC<React.PropsWithChildren<CardContentProps>> = ({ children, maxHeight = '50vh', className, gradient, ...props }) => {
  const { SCALER, RESPONSIVE, HIDER } = useScale();
  const defaultGradient = `linear-gradient(to bottom, rgba(var(--color-background-800-rgb), 0.5), var(--color-background-1000))`;
  return (
    <div className={useClasses('gradient-layout', className, HIDER)} {...props}>
      <div className="gradient-content">
        <div className="bg-gradient">{props.img}</div>
        <div className="gradient-space">
          <PageWidth>{children}</PageWidth>
        </div>
      </div>
      <style jsx>{`
        .gradient-content {
          position: relative;
        }
        .gradient-layout {
          background: var(--color-background-1000);
          height: 100%;
        }
        .gradient-space {
          position: relative;
        }

        .bg-gradient {
          position: absolute;
          background: ${gradient ?? defaultGradient};
          width: 100%;
          z-index: 0;
          max-height: ${maxHeight};
          left: 0;
          top: 0;
          height: 100%;
        }

        ${RESPONSIVE.h(1, value => `height: ${value};`, '100%', 'gradient-content')}
        ${RESPONSIVE.w(1, value => `width: ${value}};`, `100%`, 'gradient-content')}

        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'gradient-layout')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'gradient-content')}

        ${SCALER('gradient-layout')}
      `}</style>
    </div>
  );
};

GradientContentComponent.displayName = 'GradientContent';
const GradientContent = withScale(GradientContentComponent);
export default GradientContent;
