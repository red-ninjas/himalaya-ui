'use client';

import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
import useVisible from '../utils/use-visibile';
import React, { createRef, useEffect, useState } from 'react';
interface Props {
  delay?: number;
  transition?: number;
  blur?: number;
  startOpacity?: number;

  rotate?: string;
  translateX?: string;
  translateY?: string;
  skewX?: string;
  skewY?: string;
  scaleX?: string;
  scaleY?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type TransitionEffectProps = Props & NativeAttrs;

const FadeInEffect: React.FC<React.PropsWithChildren<TransitionEffectProps>> = ({
  children,
  transition = 750,
  delay = 0,
  blur = 0,
  startOpacity = 0,
  rotate = '0',
  translateX = '0',
  translateY = '0',
  skewX = '0',
  skewY = '0',
  scaleX = '1',
  scaleY = '1',
  ...props
}: React.PropsWithChildren<TransitionEffectProps>) => {
  const ref = createRef<HTMLDivElement>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const isVisible = useVisible(ref);
  const { SCALES } = useScale();
  useEffect(() => {
    if (isVisible) {
      setIsActive(true);
    }
  }, [isVisible]);

  return (
    <div
      className={useClasses('fade-in-effect', {
        'fade-in-effect-active': isActive,
      })}
      {...props}
      ref={ref}
    >
      {children}

      <style jsx global>{`
        .fade-in-effect {
          display: block;
          max-width: 100%;
          opacity: ${startOpacity};
          will-change: transform;
          transition-property: all;
          transition-delay: ${delay}ms;
          transition-duration: ${transition}ms;
          filter: blur(${blur}px);
          transform: translate(var(--translate-x), var(--translate-y)) rotate(var(--rotate)) skewX(var(--skew-x)) skewY(var(--skew-y)) scaleX(var(--scale-x))
            scaleY(var(--scale-y));
        }
      `}</style>
      <style jsx>{`
        .fade-in-effect {
          --rotate: ${rotate};
          --translate-y: ${translateY};
          --translate-x: ${translateX};
          --skew-x: ${skewX};
          --skew-y: ${skewY};
          --scale-x: ${scaleX};
          --scale-y: ${scaleY};

          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .fade-in-effect-active {
          opacity: 1;
          filter: blur(0px);
          --rotate: 0;
          --translate-y: 0;
          --translate-x: 0;
          --skew-x: 0;
          --skew-y: 0;
          --scale-x: 1;
          --scale-y: 1;
        }
      `}</style>
    </div>
  );
};

FadeInEffect.displayName = 'HimalayaFadeInEffect';
export default withScale(FadeInEffect);
