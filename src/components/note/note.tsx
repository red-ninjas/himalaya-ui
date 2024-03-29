'use client';
import React from 'react';
import { AlertTriangle, CheckInCircle, Info, XCircle } from '../icons';
import { UIColorTypes } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  type?: UIColorTypes;
  icon?: React.ReactNode | boolean;
  filled?: boolean;
  className?: string;
  hasBorder?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type NoteProps = Props & NativeAttrs;

export const NoteComponent: React.FC<React.PropsWithChildren<NoteProps>> = ({
  children,
  type = 'default' as UIColorTypes,
  icon = true,
  filled = false,
  hasBorder = true,
  className = '',
  ...props
}: React.PropsWithChildren<NoteProps>) => {
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  const icons: { [key in UIColorTypes]?: React.ReactNode } = {
    success: <CheckInCircle></CheckInCircle>,
    warning: <AlertTriangle></AlertTriangle>,
    error: <XCircle></XCircle>,
  };
  const statusIcon = icons[type];

  const foundIcon = icon === true ? statusIcon ?? <Info></Info> : icon;

  return (
    <div className={useClasses('note', className, type ? 'color-' + type : null, { filled }, SCALE_CLASSES)} {...props}>
      {foundIcon && <span className="label">{foundIcon}</span>}
      <span>{children}</span>

      <style jsx>{`
        .note {
          line-height: 1.8;

          border-width: ${hasBorder ? '1px' : '0'};
          border-style: solid;
          display: flex;
          align-items: flex-start;
          align-items: center;

          --note-bg: var(--background-1000);
          --note-color: var(--color-base);
          --note-border: var(--color-tint);

          border-color: var(--note-border);
          color: var(--note-color);
          background-color: var(--note-bg);
        }

        .note.color-default {
          --note-bg: var(--color-background-1000);
          --note-color: var(--color-foreground-800);
          --note-border: var(--color-border-1000);
        }

        .note.color-default.filled {
          --note-bg: var(--color-background-900);
          --note-color: var(--color-foreground-800);
          --note-border: var(--color-background-900);
        }

        .note.filled {
          --note-bg: rgba(var(--color-base-rgb), 0.2);
          --note-color: var(--color-base);
          --note-border: rgba(var(--color-base-rgb), 0.2);
        }

        .note :global(svg) {
          width: var(--note-icon-size);
          height: var(--note-icon-size);
        }

        span {
          line-height: normal;
        }

        .note :global(p) {
          margin: 0;
        }

        .label {
          text-transform: uppercase;
          user-select: none;
          padding-right: 0.38em;
          display: inline-flex;
          align-items: center;
        }

        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'note')}
        ${RESPONSIVE.font(1.1, value => `--note-icon-size: ${value};`, undefined, 'note')}

        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'note')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'note')}
        ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'note')}

        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'note')}
        ${RESPONSIVE.padding(
          {
            top: 0.5,
            bottom: 0.5,
            left: 0.75,
            right: 0.75,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'note',
        )}
        ${SCALER('note')}
      `}</style>
    </div>
  );
};

NoteComponent.displayName = 'HimalayaNote';
const Note = withScale(NoteComponent);
export default Note;
