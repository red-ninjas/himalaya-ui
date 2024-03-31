'use client';
import React, { ReactNode } from 'react';
import useTheme from '../use-theme';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  caption?: ReactNode | string;
  shadow?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type DisplayProps = Props & NativeAttrs;

const DisplayComponent: React.FC<React.PropsWithChildren<DisplayProps>> = ({
  children,
  caption = '' as ReactNode | string,
  shadow = false,
  className = '',
  ...props
}: React.PropsWithChildren<DisplayProps>) => {
  const theme = useTheme();
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const classes = useClasses('display', className, CLASS_NAMES);

  return (
    <div className={classes} {...props}>
      <div className="content">{children}</div>

      {caption && <div className="caption">{caption}</div>}

      <style jsx>{`
        .display {
          display: block;
          max-width: 100%;
        }

        .content {
          display: block;
          margin: 0 auto;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: ${theme.expressiveness.shadowLarge};
          max-width: 100%;
          width: 100%;
        }

        .content :global(pre) {
          margin: 0;
          transition: min-width ease 0.2s;
        }

        .content :global(img) {
          display: block;
        }

        .caption {
          font-size: inherit;
          line-height: 1.5em;
          color: var(--color-background-400);
          margin: ${shadow ? '2.5em' : '1.3em'} auto 0;
          text-align: center;
          max-width: 85%;
        }

        ${SCALE.font(0.875, value => `width: ${value}; height: ${value};`, undefined, 'display')}
        ${SCALE.w(1, value => `width: ${value};`, '100%', 'display')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'display')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'display')}
        ${SCALE.mx(1, value => `margin-left: ${value};margin-right: ${value}`, 'auto', 'display')}
        ${SCALE.my(2.25, value => `margin-top: ${value};margin-bottom: ${value}`, undefined, 'display')}
        ${SCALE.w(1, value => `width: ${value};`, 'max-content', 'content')}
        ${UNIT('display')}
      `}</style>
    </div>
  );
};

DisplayComponent.displayName = 'HimalayaDisplay';
const Display = withScale(DisplayComponent);
export default Display;
