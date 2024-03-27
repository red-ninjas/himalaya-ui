'use client';
import { usePathname } from 'next/navigation';
import React, { createRef, useEffect } from 'react';
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
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();
  const ref = createRef<HTMLDivElement>();
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
        top: 0,
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
        className,
        {
          vertical: type == 'both' || type == 'vertical',
          horizontal: type == 'both' || type == 'horizontal',
        },
        SCALE_CLASSES,
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        .inner-scroll::-webkit-scrollbar-track {
          border-radius: var(--scroll-border-radius);
          cursor: pointer;
        }

        .inner-scroll::-webkit-scrollbar-thumb {
          border-radius: var(--scroll-border-radius);
          cursor: pointer;
        }

        .inner-scroll::-webkit-scrollbar-corner,
        .inner-scroll::-webkit-resizer {
          background: transparent;
          border: 0px solid transparent;
          width: 0;
          height: 0;
        }

        .inner-scroll:hover::-webkit-scrollbar-track {
          z-index: 9999;
        }

        .inner-scroll:hover::-webkit-scrollbar-thumb {
          background: var(--color-background-700);
        }

        .inner-scroll:hover::-webkit-scrollbar-corner,
        .inner-scroll:hover::-webkit-resizer {
          background: var(--color-background-700);
        }

        .inner-scroll:hover::-webkit-scrollbar-corner {
          background: transparent;
        }

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

        .inner-scroll::-webkit-scrollbar {
          width: var(--page-scrollbar-width, 6px);
          height: var(--page-scrollbar-width, 6px);
          background: ${transparentBg ? 'transparent' : `var(--color-background-800)`};
        }

        ${RESPONSIVE.w(1, value => `width: ${value};`, '100%', 'inner-scroll')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, '100%', 'inner-scroll')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'inner-scroll')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'inner-scroll')}
        ${RESPONSIVE.r(1, value => `--scroll-border-radius: ${value};`, 'var(--layout-radius)', 'inner-scroll')}

        ${SCALER('inner-scroll')}
      `}</style>
    </div>
  );
};

const InnerScroll = withScale(InnerScrollComponent);
export default InnerScroll;
