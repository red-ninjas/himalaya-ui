'use client';
import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  block?: boolean;
  name?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLPreElement>, keyof Props>;
export type CodeProps = Props & NativeAttrs;

const CodeComponent: React.FC<React.PropsWithChildren<CodeProps>> = ({
  children,
  block = false,
  className,
  name = '',
  ...props
}: React.PropsWithChildren<CodeProps>) => {
  const { UNIT, SCALE, CLASS_NAMES } = useScale();

  if (!block) return <code {...props}>{children}</code>;

  return (
    <div className={useClasses('pre', CLASS_NAMES)}>
      {name && (
        <header>
          <div className="name">{name}</div>
        </header>
      )}
      <pre className={useClasses('pre-container', className)} {...props}>
        {children}
      </pre>
      <style jsx>{`
        .pre {
          max-width: 100%;
          border: 1px solid var(--color-border-1000);
          background-color: var(--color-background-1000);
          position: relative;
          border-radius: var(--code-border-radius);
        }
        .pre-container {
          max-width: 100%;
          font-size: inherit;
          border: none;
          margin: 0;
          line-height: 1.5em;
          position: relative;
        }
        .hex_1200 {
          color: white;
          background: black;
        }
        .hex_1200 code {
          color: white;
        }
        header {
          height: auto;
          width: 100%;
          display: flex;
          justify-content: space-between;
          border-radius: var(--code-border-radius);
          background-color: transparent;

          z-index: 2;
        }
        .name {
          background-color: var(--color-background-800);
          color: var(--color-background-400);
          height: auto;
          line-height: 1.35em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: inline-block;
          align-items: center;
          text-align: center;
          width: 100%;

          border-top-left-radius: var(--code-border-radius);
          border-top-right-radius: var(--code-border-radius);
        }

        ${SCALE.padding(
          {
            top: 0.32,
            right: 0.5,
            left: 0.5,
            bottom: 0.32,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'name',
        )}

        ${SCALE.padding(
          {
            top: 1.1,
            right: 1,
            left: 1.1,
            bottom: 1,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'pre-container',
        )}


        ${SCALE.r(1, value => `--code-border-radius: ${value};`, 'var(--layout-radius)', 'pre')},
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'pre')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'pre')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'pre')}
        ${SCALE.font(0.925, value => `font-size: ${value};`, undefined, 'pre')}
        ${SCALE.font(0.8125, value => `font-size: ${value};`, undefined, 'name')}

        ${UNIT('pre')};
      `}</style>
    </div>
  );
};

CodeComponent.displayName = 'HimalayaCode';
const Code = withScale(CodeComponent);
export default Code;
