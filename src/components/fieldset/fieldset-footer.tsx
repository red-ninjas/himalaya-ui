'use client';
import React from 'react';
import useTheme from '../use-theme';
import useScale, { withScale } from '../use-scale';
import useLayout from '../use-layout';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type FieldsetFooterProps = Props & NativeAttrs;

const FieldsetFooterComponent: React.FC<React.PropsWithChildren<FieldsetFooterProps>> = ({
  className = '',
  children,
  ...props
}: React.PropsWithChildren<FieldsetFooterProps>) => {
  const theme = useTheme();
  const layout = useLayout();
  const { SCALES } = useScale();

  return (
    <footer className={className} {...props}>
      {children}
      <style jsx>{`
        footer {
          background-color: ${theme.palette.accents_1};
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.style.radius};
          border-bottom-right-radius: ${theme.style.radius};
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          color: ${theme.palette.accents_6};
          padding: ${layout.gapHalf} ${layout.gap};
          box-sizing: border-box;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(2.875)};
          padding: ${SCALES.pt(0.625)} ${SCALES.pr(1.31)} ${SCALES.pb(0.625)} ${SCALES.pl(1.31)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </footer>
  );
};

FieldsetFooterComponent.displayName = 'HimalayaFieldsetFooter';
const FieldsetFooter = withScale(FieldsetFooterComponent);
export default FieldsetFooter;
