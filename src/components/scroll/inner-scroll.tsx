'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { InnerScrollEvent } from '.';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface InnerScrollNativeProps {
  type?: 'horizontal' | 'vertical' | 'both';
  scrollUpOnRouteChange?: boolean;
  transparentBg?: boolean;
  onScroll?: (event: InnerScrollEvent) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof InnerScrollNativeProps>;
export type InnerScrollProps = InnerScrollNativeProps & NativeAttrs;

const InnerScrollComponent: React.FC<React.PropsWithChildren<InnerScrollProps>> = ({
  children,
  type = 'both',
  className,
  transparentBg = false,
  scrollUpOnRouteChange = true,
  onScroll = () => {},
  ...props
}) => {
  const { UNIT, SCALE, CLASS_NAMES } = useScale();
  const ref = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  const onScrollHandler = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      onScroll({ scrollTop, scrollHeight, clientHeight });
    }
  };

  useEffect(() => {
    if (scrollUpOnRouteChange) {
      ref?.current?.scrollTo({
        top: ref.current.scrollTop,
        behavior: 'instant',
      });
    }
  }, [pathName]);

  return (
    <div
      ref={ref}
      onScroll={onScrollHandler}
      className={useClasses(
        'inner-scroll',
        'scroll',

        className,
        {
          vertical: type == 'both' || type == 'vertical',
          horizontal: type == 'both' || type == 'horizontal',
        },
        CLASS_NAMES,
        {
          'scroll-hover': transparentBg,
        },
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        .inner-scroll {
          overflow: hidden;
          width: 100%;
          scroll-behavior: smooth;
          position: relative;
        }

        .vertical {
          overflow-y: overlay;
        }

        .horizontal {
          overflow-x: overlay;
        }

        ${SCALE.w(1, value => `width: ${value};`, '100%', 'inner-scroll')}
        ${SCALE.h(1, value => `height: ${value};`, '100%', 'inner-scroll')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'inner-scroll')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'inner-scroll')}
        ${SCALE.r(1, value => `--scroll-border-radius: ${value};`, 'var(--layout-radius)', 'inner-scroll')}

        ${UNIT('inner-scroll')}
      `}</style>
    </div>
  );
};

const InnerScroll = withScale(InnerScrollComponent);
export default InnerScroll;
