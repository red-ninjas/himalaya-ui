'use client';
import React, { useMemo } from 'react';
import Collapse from './collapse';
import useCurrentState from '../utils/use-current-state';
import { setChildrenIndex } from '../utils/collections';
import { CollapseContext, CollapseConfig } from './collapse-context';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  accordion?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type CollapseGroupProps = Props & NativeAttrs;

const CollapseGroupComponent: React.FC<React.PropsWithChildren<CollapseGroupProps>> = ({
  children,
  accordion = true,
  className = '',
  ...props
}: React.PropsWithChildren<CollapseGroupProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  const [state, setState, stateRef] = useCurrentState<Array<number>>([]);
  const classes = useClasses('collapse-group', className, CLASS_NAMES);

  const updateValues = (currentIndex: number, nextState: boolean) => {
    const hasChild = stateRef.current.find(val => val === currentIndex);
    if (accordion) {
      if (nextState) return setState([currentIndex]);
      return setState([]);
    }

    if (nextState) {
      // In a few cases, the user will set Collapse Component state manually.
      // If the user incorrectly set the state, Group component should ignore it.
      /* istanbul ignore if */
      if (hasChild) return;
      return setState([...stateRef.current, currentIndex]);
    }
    setState(stateRef.current.filter(item => item !== currentIndex));
  };

  const initialValue = useMemo<CollapseConfig>(
    () => ({
      values: state,
      updateValues,
    }),
    [state.join(',')],
  );
  const hasIndexChildren = useMemo(() => setChildrenIndex(children, [Collapse]), [children]);

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
