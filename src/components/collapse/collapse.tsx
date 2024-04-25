'use client';
import React, { useEffect } from 'react';
import Expand from '../shared/expand';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useCurrentState from '../utils/use-current-state';
import useWarning from '../utils/use-warning';
import { useCollapseContext } from './collapse-context';
import CollapseIcon from './collapse-icon';
interface Props {
  title: string;
  subtitle?: React.ReactNode | string;
  initialVisible?: boolean;
  shadow?: boolean;
  className?: string;
  index?: number;
  disabled?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type CollapseProps = Props & NativeAttrs;

const CollapseComponent: React.FC<React.PropsWithChildren<CollapseProps>> = ({
  children,
  title,
  subtitle,
  initialVisible = false,
  shadow = false,
  className = '',
  index,
  disabled = false,
  ...props
}: React.PropsWithChildren<CollapseProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  const { values, updateValues } = useCollapseContext();
  const [visible, setVisible, visibleRef] = useCurrentState<boolean>(initialVisible);
  const classes = useClasses(
    'collapse',
    {
      shadow,
    },
    className,
    disabled && 'disabled',
    CLASS_NAMES,
  );

  if (!title) {
    useWarning('"title" is required.', 'Collapse');
  }

  useEffect(() => {
    if (!values.length || disabled) return;
    const isActive = !!values.find(item => item === index);
    setVisible(isActive);
  }, [values.join(',')]);

  const clickHandler = () => {
    if (disabled) return;
    const next = !visibleRef.current;
    setVisible(next);
    updateValues && updateValues(index, next);
  };

  return (
    <div className={classes} {...props}>
      <div className="view" role="button" onClick={clickHandler}>
        <div className="title">
          <span>{title}</span>
          {!disabled && <CollapseIcon active={visible} />}
        </div>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>
      <Expand isExpanded={visible}>
        <div className="content">{children}</div>
      </Expand>
      <style jsx>{`
        .collapse {
          border-top: 1px solid var(--color-border-1000);
          border-bottom: 1px solid var(--color-border-1000);
        }

        .collapse.disabled .title {
          color: var(--color-foreground-700);
          cursor: not-allowed;
        }

        .shadow {
          box-shadow: var(--theme-expressiveness-shadow-small);
          border: none;
          border-radius: var(--layout-radius);
          padding: var(--layout-gap);
        }

        .view {
          cursor: pointer;
          outline: none;
        }
        &.disabled {
          pointer-events: none;
        }

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-foreground-1000);
          font-weight: bold;
          margin: 0;
        }

        .subtitle {
          color: var(--color-background-400);
          margin: 0;
        }

        .subtitle > :global(*) {
          margin: 0;
        }

        .content {
          font-size: inherit;
          line-height: 1.6em;
        }

        .content > :global(*:first-child) {
          margin-top: 0;
        }

        .content > :global(*:last-child) {
          margin-bottom: 0;
        }
        ${SCALE.font(1, value => `width: ${value}; height: ${value};`, undefined, 'collapse')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'collapse')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'collapse')}
        ${SCALE.padding(
          {
            top: 1.2,
            right: 0.5,
            left: 0.5,
            bottom: 1.2,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'collapse',
        )}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'collapse')}
        ${SCALE.font(1.25, value => `font-size: ${value};`, undefined, 'title')}
        ${SCALE.padding(
          {
            top: 1.2,
            right: 0,
            left: 0,
            bottom: 1.2,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'content',
        )}
        ${UNIT('collapse')}
      `}</style>
    </div>
  );
};

CollapseComponent.displayName = 'HimalayaCollapse';
const Collapse = withScale(CollapseComponent);
export default Collapse;
