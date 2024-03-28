'use client';
import React, { useEffect } from 'react';
import CollapseIcon from './collapse-icon';
import useTheme from '../use-theme';
import Expand from '../shared/expand';
import { useCollapseContext } from './collapse-context';
import useCurrentState from '../utils/use-current-state';
import useWarning from '../utils/use-warning';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
interface Props {
  title: string;
  subtitle?: React.ReactNode | string;
  initialVisible?: boolean;
  shadow?: boolean;
  className?: string;
  index?: number;
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
  ...props
}: React.PropsWithChildren<CollapseProps>) => {
  const theme = useTheme();
  const { RESPONSIVE, SCALER, SCALE_CLASSES } = useScale();

  const { values, updateValues } = useCollapseContext();
  const [visible, setVisible, visibleRef] = useCurrentState<boolean>(initialVisible);
  const classes = useClasses(
    'collapse',
    {
      shadow,
    },
    className,
    SCALE_CLASSES,
  );

  if (!title) {
    useWarning('"title" is required.', 'Collapse');
  }

  useEffect(() => {
    if (!values.length) return;
    const isActive = !!values.find(item => item === index);
    setVisible(isActive);
  }, [values.join(',')]);

  const clickHandler = () => {
    const next = !visibleRef.current;
    setVisible(next);
    updateValues && updateValues(index, next);
  };

  return (
    <div className={classes} {...props}>
      <div className="view" role="button" onClick={clickHandler}>
        <div className="title">
          <span>{title}</span> <CollapseIcon active={visible} />
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

        .shadow {
          box-shadow: ${theme.expressiveness.shadowSmall};
          border: none;
          border-radius: var(--layout-radius);
          padding: var(--layout-gap);
        }

        .view {
          cursor: pointer;
          outline: none;
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
        ${RESPONSIVE.font(1, value => `width: ${value}; height: ${value};`, undefined, 'collapse')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'collapse')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'collapse')}
        ${RESPONSIVE.padding(
          {
            top: 1.2,
            right: 0,
            left: 0,
            bottom: 1.2,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'collapse',
        )}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'collapse')}
        ${RESPONSIVE.font(1.25, value => `font-size: ${value};`, undefined, 'title')}
        ${RESPONSIVE.padding(
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
        ${SCALER('collapse')}
      `}</style>
    </div>
  );
};

CollapseComponent.displayName = 'HimalayaCollapse';
const Collapse = withScale(CollapseComponent);
export default Collapse;
