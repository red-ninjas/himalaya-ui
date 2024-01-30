'use client';
import React, { useMemo } from 'react';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

interface Props {
  block?: boolean;
  className?: string;
  name?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type CodeProps = Props & NativeAttrs;

const CodeComponent: React.FC<React.PropsWithChildren<CodeProps>> = ({
  children,
  block = false,
  className = '',
  name = '',
  ...props
}: React.PropsWithChildren<CodeProps>) => {
  const { SCALES } = useScale();
  const theme = useTheme();
  const { background, border } = useMemo(() => {
    return {
      border: theme.palette.border,
      background: theme.palette.codeBg,
    };
  }, [theme.palette]);

  if (!block) return <code {...props}>{children}</code>;

  return (
    <div className="pre">
      {name && (
        <header>
          <div className="name">{name}</div>
        </header>
      )}
      <pre className={className} {...props}>
        {children}
      </pre>
      <style jsx>{`
        .pre {
          max-width: 100%;
          border: 1px solid ${border};
          font-size: ${SCALES.font(0.925)};
          width: ${SCALES.width(1, 'initial')};
          height: ${SCALES.height(1, 'auto')};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          border-radius: ${theme.style.radius};
          background-color: ${background};
          position: relative;
        }
        pre {
          max-width: 100%;
          font-size: inherit;
          border: none;
          margin: 0;
          line-height: 1.5em;
          padding: ${SCALES.pt(1.1)} ${SCALES.pr(1)} ${SCALES.pb(1.1)} ${SCALES.pl(1)};
          position: relative;
        }
        .dark {
          color: white;
          background: black;
        }
        .dark code {
          color: white;
        }
        header {
          height: auto;
          width: 100%;
          display: flex;
          justify-content: space-between;
          border-radius: ${theme.style.radius};
          background-color: transparent;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
        .name {
          background-color: ${theme.palette.codeBg};
          color: ${theme.palette.accents_5};
          height: auto;
          line-height: 1.35em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: inline-block;
          align-items: center;
          text-align: center;
          font-size: ${SCALES.font(0.8125)};
          padding: ${SCALES.font(0.32)} ${SCALES.font(0.5)} ${SCALES.font(0.32)} ${SCALES.font(0.5)};
          width: 100%;

          border-top-left-radius: ${theme.style.radius};
          border-top-right-radius: ${theme.style.radius};
        }
      `}</style>
    </div>
  );
};

CodeComponent.displayName = 'HimalayaCode';
const Code = withScale(CodeComponent);
export default Code;
