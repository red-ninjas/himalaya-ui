'use client';
import React, { useCallback, useEffect, useMemo } from 'react';
import Collapse from './collapse';
import useCurrentState from '../utils/use-current-state';
import { setChildrenIndex } from '../utils/collections';
import { CollapseContext, CollapseConfig } from './collapse-context';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';
import { isArray } from 'lodash';

interface Props {
  multiple?: boolean;
  className?: string;
  value?: Array<number | string>;
  onChange?: (openIndices: Array<number | string>) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type CollapseGroupProps = Props & NativeAttrs;

const CollapseGroupComponent: React.FC<React.PropsWithChildren<CollapseGroupProps>> = ({
  children,
  multiple = false,
  className,
  value = [],
  onChange,
  ...props
}: React.PropsWithChildren<CollapseGroupProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  const [state, setState, stateRef] = useCurrentState<Array<number | string>>(value);
  const classes = useClasses('collapse-group', className, CLASS_NAMES);
  const hasIndexChildren = useMemo(() => setChildrenIndex(children, [Collapse]), [children]);

  useEffect(() => {
    setState(value);
  }, [value.join(',')]);

  useEffect(() => {
    if (onChange) {
      const openIndices = stateRef.current.filter(index => {
        if (!Array.isArray(hasIndexChildren)) return true;
        const child = hasIndexChildren.find((child: React.ReactElement) => child.props.index === index);
        return child && !child.props.disabled;
      });
      onChange(openIndices);
    }
  }, [state, hasIndexChildren]);

  const updateValues = useCallback(
    (currentIndex: number | string, nextState: boolean) => {
      if (!multiple) {
        if (nextState) {
          const isDisabled =
            isArray(hasIndexChildren) && hasIndexChildren.find((child: React.ReactElement) => child.props.index === currentIndex)?.props.disabled;
          if (!isDisabled) {
            setState([currentIndex]);
          } else {
            setState([]);
          }
        } else {
          setState([]);
        }
      } else {
        const currentIndexExists = stateRef.current.includes(currentIndex);
        const isDisabled =
          isArray(hasIndexChildren) && hasIndexChildren.find((child: React.ReactElement) => child.props.index === currentIndex)?.props.disabled;
        if (nextState && !currentIndexExists && !isDisabled) {
          setState([...stateRef.current, currentIndex]);
        } else if (!nextState && currentIndexExists) {
          setState(stateRef.current.filter(item => item !== currentIndex));
        }
      }
    },
    [hasIndexChildren, multiple],
  );

  const initialValue = useMemo<CollapseConfig>(
    () => ({
      values: state,
      updateValues,
    }),
    [state.join(',')],
  );

  return (
    <CollapseContext.Provider value={initialValue}>
      <div className={classes} {...props}>
        {hasIndexChildren}
        <style jsx>{`
          .collapse-group {
          }

          .collapse-group > :global(div + div) {
            border-top: none;
          }

          ${SCALE.w(1, value => `width: ${value};`, 'auto', 'collapse-group')}
          ${SCALE.h(1, value => `height: ${value};`, 'auto', 'collapse-group')}
          ${SCALE.padding(
            {
              top: 0,
              right: 0.6,
              left: 0.6,
              bottom: 0,
            },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'collapse-group',
          )}
          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'collapse-group')}
          ${UNIT('collapse-group')}
        `}</style>
      </div>
    </CollapseContext.Provider>
  );
};

CollapseGroupComponent.displayName = 'HimalayaCollapseGroup';
const CollapseGroup = withScale(CollapseGroupComponent);
export default CollapseGroup;
