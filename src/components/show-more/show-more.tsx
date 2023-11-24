'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import Button from '../button';
import { ChevronDown } from '../icons';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

interface Props {
  expanded: boolean;
  onClick: () => void;
}

const useRefDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      const boundingRect = ref?.current?.getBoundingClientRect();

      if (boundingRect != undefined) {
        const { height } = boundingRect;
        setHeight(height);
      }
    });

    resizeObserver.observe(ref.current);

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return height;
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type ShowMoreProps = Props & NativeAttrs;

const ShowMore: React.FC<PropsWithChildren<ShowMoreProps>> = ({ children, expanded, onClick }) => {
  const theme = useTheme();
  const [iconRotated, setIconRotated] = useState(false);
  const { SCALES } = useScale();

  const ref = React.createRef<HTMLDivElement>();
  const dimensions = useRefDimensions(ref);

  const toggleIconRotation = () => {
    setIconRotated(!iconRotated);
  };

  return (
    <div
      className={`show-more ${expanded ? 'expanded' : 'collapsed'}`}
      onClick={() => {
        onClick();
        toggleIconRotation();
      }}
    >
      <div className="show-more-bar">
        <div className="show-more-line" />

        <Button
          type="secondary"
          scale={0.9}
          iconRight={
            <ChevronDown
              className={useClasses('chevon-icon', {
                rotate: expanded,
              })}
            />
          }
          auto
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>

        <div className="show-more-line" />
      </div>
      <div className="show-more-content">
        <div className="inner-height" ref={ref}>
          {children}
        </div>
      </div>
      <style jsx>{`
        .inner-height {
          display: block;
          width: 100%;
        }
        .show-more {
          width: 100%;
          display: block;

          .show-more-bar {
            display: flex;
            align-items: center;
            cursor: pointer;
            width: 100%;
            flex-wrap: no-wrap;
          }

          .show-more-line {
            width: 100%;
            height: ${SCALES.height(0.08)};
            background-color: ${theme.palette.border};
          }

          .show-more-content {
            height: 0;
            transition: height 0.3s ease;
            overflow: hidden;
            width: 100%;
            display: block;
          }
        }

        .show-more :global(.chevon-icon) {
          transition: transform 0.3s ease-in-out;
        }
        .show-more :global(.rotate) {
          transform: rotate(180deg);
        }

        .expanded {
          .show-more-content {
            height: ${dimensions}px;
          }
        }
      `}</style>
    </div>
  );
};

ShowMore.displayName = 'HimalayaShowMore';
export default withScale(ShowMore);
