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
import useLayout from '../use-layout';

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
  const layout = useLayout();
  const { SCALES } = useScale();
  const { values, updateValues } = useCollapseContext();
  const [visible, setVisible, visibleRef] = useCurrentState<boolean>(initialVisible);
  const classes = useClasses(
    'collapse',
    {
      shadow,
    },
    className,
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
          border-top: 1px solid var(--theme-color-border-1000);
          border-bottom: 1px solid var(--theme-color-border-1000);
          font-size: ${SCALES.font(1)};
          width: ${SCALES.w(1, 'auto')};
          height: ${SCALES.h(1, 'auto')};
          padding: ${SCALES.pt(1.2)} ${SCALES.pr(0)} ${SCALES.pb(1.2)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .shadow {
          box-shadow: ${theme.expressiveness.shadowSmall};
          border: none;
          border-radius: ${SCALES.r(1, theme.style.radius)};
          padding: ${layout.gap};
        }

        .view {
          cursor: pointer;
          outline: none;
        }

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--theme-color-foreground-1000);
          font-weight: bold;
          margin: 0;
          font-size: ${SCALES.font(1.25)};
        }

        .subtitle {
          color: var(--theme-color-background-400);
          margin: 0;
        }

        .subtitle > :global(*) {
          margin: 0;
        }

        .content {
          font-size: inherit;
          line-height: 1.6em;
          padding: ${SCALES.pt(1.2)} ${SCALES.pr(0)} ${SCALES.pb(1.2)} ${SCALES.pl(0)};
        }

        .content > :global(*:first-child) {
          margin-top: 0;
        }

        .content > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

CollapseComponent.displayName = 'HimalayaCollapse';
const Collapse = withScale(CollapseComponent);
export default Collapse;
