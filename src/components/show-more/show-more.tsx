'use client';
import React, { useState } from 'react';
import useTheme from '../use-theme';
import { ChevronDown } from '../icons';
import useScale, { withScale } from '../use-scale';

interface Props {
  expanded: boolean;
  onClick: () => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type ShowMoreProps = Props & NativeAttrs;

const ShowMore: React.FC<ShowMoreProps> = ({ expanded, onClick }) => {
  const theme = useTheme();
  const [iconRotated, setIconRotated] = useState(false);
  const { SCALES } = useScale();

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
      <div className="show-more-line" />
      <button className="show-more-button">
        {expanded ? 'Show Less' : 'Show More'}
        <span className={`show-more-arrow ${iconRotated ? 'rotate' : ''}`}>
          <ChevronDown />
        </span>
      </button>
      <div className="show-more-line" />

      <style jsx>{`
        .show-more {
          width: ${SCALES.width(1, 'auto')};
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .show-more-line {
          width: 100%;
          height: ${SCALES.height(0.195)};
          background-color: ${theme.palette.border};
        }
        .show-more-button {
          max-width: 100%;
          padding: ${SCALES.px(0.88)} ${SCALES.py(1.15)};
          display: flex;
          align-items: center;
          font-size: 14px;
          text-wrap: nowrap;
          cursor: pointer;
          border: 1px solid ${theme.palette.border};
          border-radius: 100px;
          background-color: ${theme.palette.background};
          color: ${theme.palette.accents_5};
        }
        .show-more-arrow {
          display: inline-flex;
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0.2)};
          transition: transform 0.2s ease-in-out;
        }
        .show-more-arrow.rotate {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

ShowMore.displayName = 'HimalayaShowMore';
export default withScale(ShowMore);
