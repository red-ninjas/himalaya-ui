'use client';
import React, { useCallback, useMemo, useRef } from 'react';
import { SnippetTypes, CopyTypes, COLOR_TYPES } from '../utils/prop-types';
import SnippetIcon from './snippet-icon';
import useClipboard from '../utils/use-clipboard';
import useToasts from '../use-toasts';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export type ToastTypes = COLOR_TYPES;
interface Props {
  text?: string | string[];
  symbol?: string;
  toastText?: string;
  toastType?: ToastTypes;
  filled?: boolean;
  copy?: CopyTypes;
  type?: SnippetTypes;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type SnippetProps = Props & NativeAttrs;

const textArrayToString = (text: string[]): string => {
  return text.reduce((pre, current) => {
    if (!current) return pre;
    return pre ? `${pre}\n${current}` : current;
  }, '');
};

const SnippetComponent: React.FC<React.PropsWithChildren<SnippetProps>> = ({
  type = 'default' as SnippetTypes,
  filled = false,
  children,
  symbol = '$',
  toastText = 'Copied to clipboard!',
  toastType = 'success' as ToastTypes,
  text,
  copy: copyType = 'default' as CopyTypes,
  className = '',
  ...props
}: React.PropsWithChildren<SnippetProps>) => {
  const { RESPONSIVE, SCALER, HIDER } = useScale();

  const { copy } = useClipboard();
  const { setToast } = useToasts();
  const ref = useRef<HTMLPreElement>(null);
  const isMultiLine = text && Array.isArray(text);
  const classes = useClasses('snippet', className, type ? 'color-' + type : null, filled ? 'filled' : '', HIDER);

  const showCopyIcon = useMemo(() => copyType !== 'prevent', [copyType]);
  const childText = useMemo<string | undefined | null>(() => {
    if (isMultiLine) return textArrayToString(text as string[]);
    if (!children) return text as string;
    if (!ref.current) return '';
    return ref.current.textContent;
  }, [ref.current, children, text, isMultiLine]);

  const symbolBefore = useMemo(() => (symbol.trim() ? `${symbol.trim()} ` : ''), [symbol]);

  const clickHandler = useCallback(() => {
    if (!childText || !showCopyIcon) return;
    copy(childText);
    if (copyType === 'silent') return;
    setToast({ text: toastText, type: toastType });
  }, [childText, showCopyIcon, copyType, copy, setToast, toastText, toastType]);

  return (
    <div className={useClasses(classes)} {...props}>
      {isMultiLine ? (text as string[]).map((t, index) => <pre key={`snippet-${index}-${t}`}>{t}</pre>) : <pre ref={ref}>{children || text}</pre>}
      {showCopyIcon && (
        <div className="copy" onClick={clickHandler}>
          <SnippetIcon />
        </div>
      )}
      <style jsx>{`
        .snippet {
          --snippet-bg: var(--color-background-1000);
          --snippet-color: var(--color-base);
          --snippet-border-color: var(--color-base);
          position: relative;
          max-width: 100%;
          color: var(--snippet-color);
          background-color: var(--snippet-bg);
          border: 1px solid var(--snippet-border-color);
          font-size: var(--snippet-font-size);
        }
        .snippet.color-dark {
          --snippet-bg: var(--color-foreground-1000);
          --snippet-color: var(--color-background-1000);
          --snippet-border-color: var(--color-foreground-100);
        }
        .snippet.color-default {
          --snippet-border-color: var(--color-foreground-100);
          --snippet-color: var(--color-foreground-1000);
        }
        .snippet.filled {
          --snippet-bg: var(--color-base);
          --snippet-color: var(--color-contrast);
        }
        pre {
          margin: 0;
          padding: 0;
          border: none;
          background-color: transparent;
          color: var(--color-contrast-1000);
          font-size: inherit;
        }

        pre::before {
          content: '${symbolBefore}';
          user-select: none;
        }

        pre :global(*) {
          margin: 0;
          padding: 0;
          font-size: inherit;
          color: inherit;
        }

        .copy {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          height: calc(100% - 2px);
          background-color: inherit;
          display: inline-flex;
          justify-content: center;
          align-items: ${isMultiLine ? 'flex-start' : 'center'};
          width: calc(3.281 * var(--snippet-font-size));
          color: inherit;
          transition: opacity 150ms ease 0s;
          border-radius: var(--layout-radius);
          cursor: pointer;
          user-select: none;
          padding-top: ${isMultiLine ? 'var(--snippet-padding-top)' : 0};
          opacity: 0.65;
        }

        .copy:hover {
          opacity: 1;
        }

        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'snippet')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'snippet')}
        ${RESPONSIVE.font(0.8125, value => `--snippet-font-size: ${value};`, undefined, 'snippet')}
        ${RESPONSIVE.padding(
          {
            top: 0.667,
            right: 2.667,
            left: 0.667,
            bottom: 0.667,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'snippet',
        )}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'snippet')}
        ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'snippet')}
        ${RESPONSIVE.pt(0.667, value => `--snippet-padding-top: ${value};`, undefined, 'snippet')}

        ${SCALER('snippet')}
      `}</style>
    </div>
  );
};

SnippetComponent.displayName = 'HimalayaSnippet';
const Snippet = React.memo(withScale(SnippetComponent));
export default Snippet;
