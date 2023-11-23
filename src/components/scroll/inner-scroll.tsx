'use client';
import { usePathname } from 'next/navigation';
import React, { createRef, useEffect } from 'react';
import { InnerScrollEvent } from '.';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

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
  transparentBg = false,
  scrollUpOnRouteChange = true,
  onScroll = () => {},
  ...props
}) => {
  const theme = useTheme();
  const { SCALES } = useScale();
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
      className={useClasses({
        'inner-scroll': true,
        vertical: type == 'both' || type == 'vertical',
        horizontal: type == 'both' || type == 'horizontal',
      })}
      {...props}
    >
      {children}
      <style jsx>{`
        .inner-scroll {
          scrollbar-color: ${theme.palette.accents_1} ${theme.palette.accents_2};
          scrollbar-width: var(--page-scrollbar-width, 6px);
        }
        .inner-scroll::-webkit-scrollbar-track {
          border-radius: ${theme.style.radius};
          cursor: pointer;
        }

        .inner-scroll::-webkit-scrollbar-thumb {
          border-radius: ${theme.style.radius};
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
          background: ${theme.palette.accents_2};
        }

        .inner-scroll:hover::-webkit-scrollbar-corner,
        .inner-scroll:hover::-webkit-resizer {
          background: ${theme.palette.accents_2};
        }

        .inner-scroll:hover::-webkit-scrollbar-corner {
          background: transparent;
        }

        .inner-scroll {
          overflow: hidden;
          width: 100%;
          scroll-behavior: smooth;
          height: ${SCALES.height(1, '100%')};
          width: ${SCALES.width(1, '100%')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
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
          background: ${transparentBg ? 'transparent' : theme.palette.accents_1};
        }
      `}</style>
    </div>
  );
};

const InnerScroll = withScale(InnerScrollComponent);
export default InnerScroll;
