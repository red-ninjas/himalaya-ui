'use client';
import React, { PropsWithChildren, createRef, useEffect, useMemo, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import useWarning from '../utils/use-warning';
import { ToggleListEvent } from './shared';
import ToggleListIcon from './toggle-list-icon';
import { useToggleListContext } from './toggle-list-provider';

interface Props {
  checked?: boolean;
  value: string | number;
  disabled?: boolean;
  onChange?: (e: ToggleListEvent) => void;
  icon?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLLabelElement>, keyof Props>;
export type ToggleProps = Props & NativeAttrs;

const ToggleListItemComponent: React.FC<PropsWithChildren<ToggleProps>> = ({
  disabled = false,
  value: toggleValue,
  onChange,
  icon,
  children,
  ...props
}: ToggleProps) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const { value: groupValue, disabledAll, updateState } = useToggleListContext();
  const isDisabled = useMemo(() => disabled || disabledAll, [disabled, disabledAll]);
  const [selfChecked, setSelfChecked] = useState<boolean>(false);

  const optionRef = createRef<HTMLInputElement>();

  const changeHandler = (event: React.ChangeEvent) => {
    if (isDisabled) return;
    const selfEvent: ToggleListEvent = {
      target: {
        checked: !selfChecked,
      },
      stopPropagation: event.stopPropagation,
      preventDefault: event.preventDefault,
      nativeEvent: event,
    };
    setSelfChecked(!selfChecked);
    updateState && updateState(toggleValue as string | number);
    onChange && onChange(selfEvent);
  };

  if (toggleValue === undefined) {
    useWarning('Props "value" must be deinfed if in the Radio.Group.', 'Radio');
  }
  useEffect(() => {
    setSelfChecked(groupValue === toggleValue);
  }, [groupValue, toggleValue]);

  return (
    <label className={useClasses('toggle-list-item', { active: selfChecked, 'has-icon': icon !== undefined })} {...props}>
      <input ref={optionRef} type="radio" value={toggleValue} checked={selfChecked} onChange={changeHandler} />
      {children && <span className="name">{children}</span>}
      <ToggleListIcon>{icon}</ToggleListIcon>

      <style jsx>{`
        .name {
          display: inline-flex;
          user-select: none;
          display: inline-flex;
          align-items: center;
          padding: 0;
          margin: 0;
        }
        input {
          display: none;
        }
        .toggle-list-item-container {
          display: inline-flex;
          align-items: center;
        }
        label.toggle-list-item {
          position: relative;
          overflow: hidden;
          font-size: ${SCALES.font(0.9)};
          min-height: ${SCALES.height(1.5)};
          border-radius: ${theme.style.radius};
          gap: ${SCALES.font(0.25)};
          padding: ${SCALES.pt(0.25)} ${SCALES.pr(1)} ${SCALES.pb(0.25)} ${SCALES.pl(1)};
          --ui-button-height: ${SCALES.height(2.5)};
          --ui-button-icon-padding: ${SCALES.pl(0.45)};
          min-width: min-content;
        }
        .toggle-list-item.active {
          background: ${theme.palette.background};
        }

        .has-icon .name {
          padding-left: ${SCALES.pl(0.85)};
        }
      `}</style>
    </label>
  );
};

ToggleListItemComponent.displayName = 'HimalayaToggleListItem';
const ToggleListItem = withScale(ToggleListItemComponent);
export default ToggleListItem;
