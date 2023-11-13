'use client';
import { usePathname } from 'next/navigation';
import React, { createRef, useEffect } from 'react';
import { InnerScrollEvent } from '.';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

export interface InnerScrollProps {
  maxHeight?: number | string;
  maxWidth?: number | string;
  type?: 'horizontal' | 'vertical' | 'both';
  scrollUpOnRouteChange?: boolean;
  transparentBg?: boolean;
  onScroll?: (event: InnerScrollEvent) => void;
}
const InnerScrollComponent: React.FC<React.PropsWithChildren<InnerScrollProps>> = ({
  children,
  maxHeight,
  maxWidth,
  type = 'both',
  transparentBg = false,
  scrollUpOnRouteChange = true,
  onScroll = () => {},
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
      style={{ maxHeight: maxHeight, maxWidth: maxWidth }}
      className={useClasses({
        'inner-scroll': true,
        vertical: type == 'both' || type == 'vertical',
        horizontal: type == 'both' || type == 'horizontal',
      })}
    >
      {children}
      <style jsx>{`
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

        .inner-scroll::-webkit-scrollbar-track:vertical {
          border-radius: ${theme.style.radius};
          cursor: pointer;
        }

        .inner-scroll::-webkit-scrollbar-thumb:vertical {
          border-radius: ${theme.style.radius};
          cursor: pointer;
        }

        .inner-scroll::-webkit-scrollbar-track:horizontal {
          border-radius: ${theme.style.radius};
          cursor: pointer;
        }

        .inner-scroll::-webkit-scrollbar-thumb:horizontal {
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

        .inner-scroll:hover::-webkit-scrollbar-track:vertical {
          z-index: 9999;
        }

        .inner-scroll:hover::-webkit-scrollbar-thumb:vertical {
          background: ${theme.palette.accents_2};
        }

        .inner-scroll:hover::-webkit-scrollbar-track:horizontal {
          z-index: 9999;
        }

        .inner-scroll:hover::-webkit-scrollbar-thumb:horizontal {
          background: ${theme.palette.accents_2};
        }

        .inner-scroll:hover::-webkit-scrollbar-corner,
        .inner-scroll:hover::-webkit-resizer {
          background: ${theme.palette.accents_2};
        }

        .inner-scroll:hover::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

const InnerScroll = withScale(InnerScrollComponent);
export default InnerScroll;
