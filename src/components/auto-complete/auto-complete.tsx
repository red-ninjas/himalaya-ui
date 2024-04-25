'use client';

import { UIColorTypes } from '../themes/presets';
import React, { CSSProperties, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Input from '../input';
import LoadingSpinner from '../loading-spinner';
import useClasses from '../use-classes';
import useScale, { ScaleResponsiveParameter, withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import useCurrentState from '../utils/use-current-state';
import { AutoCompleteConfig, AutoCompleteContext } from './auto-complete-context';
import AutoCompleteDropdown from './auto-complete-dropdown';
import AutoCompleteEmpty from './auto-complete-empty';
import AutoCompleteItem, { AutoCompleteItemProps } from './auto-complete-item';
import AutoCompleteSearching from './auto-complete-searching';

export type AutoCompleteOption = {
  label: string;
  value: string;
};

export type AutoCompleteOptions = Array<typeof AutoCompleteItem | AutoCompleteOption | React.ReactElement<AutoCompleteItemProps>>;

interface Props {
  options?: AutoCompleteOptions;
  type?: UIColorTypes;
  initialValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: string) => void;
  searching?: boolean | undefined;
  clearable?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  disableMatchWidth?: boolean;
  disableFreeSolo?: boolean;
  className?: string;
  getPopupContainer?: () => HTMLElement | null;
  hasBorder?: boolean;
}

type NativeAttrs = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Props>;
export type AutoCompleteProps = Props & NativeAttrs;

const childrenToOptionsNode = (options: Array<AutoCompleteOption>) =>
  options.map((item, index) => {
    const key = `auto-complete-item-${index}`;
    if (React.isValidElement(item)) return React.cloneElement(item, { key });
    const validItem = item as AutoCompleteOption;
    return (
      <AutoCompleteItem key={key} value={validItem.value} isLabelOnly>
        {validItem.label}
      </AutoCompleteItem>
    );
  });

const getSearchIcon = (searching?: boolean, scale: ScaleResponsiveParameter<number> = 1) => {
  return searching ? <LoadingSpinner scale={scale} w={0.7} h={0.7} font={0.7} /> : <span />;
};

const AutoCompleteComponent = React.forwardRef<HTMLInputElement, React.PropsWithChildren<AutoCompleteProps>>(
  (
    {
      options = [] as AutoCompleteOptions,
      initialValue: customInitialValue = '',
      onSelect,
      onSearch,
      onChange,
      searching,
      children,
      type = 'default' as UIColorTypes,
      value,
      clearable = false,
      disabled = false,
      dropdownClassName,
      dropdownStyle,
      disableMatchWidth = false,
      disableFreeSolo = false,
      getPopupContainer,
      className = '',
      hasBorder = true,
      ...props
    }: React.PropsWithChildren<AutoCompleteProps>,
    userRef: React.Ref<HTMLInputElement | null>,
  ) => {
    const resetTimer = useRef<number>();
    const { SCALE, UNIT, getScaleProps, getAllScaleProps, CLASS_NAMES } = useScale();
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, setState, stateRef] = useCurrentState<string>(customInitialValue);
    const [selectVal, setSelectVal] = useState<string>(customInitialValue);
    const [visible, setVisible] = useState<boolean>(false);
    useImperativeHandle(userRef, () => inputRef.current);

    const [, searchChild] = pickChild(children, AutoCompleteSearching);
    const [, emptyChild] = pickChild(children, AutoCompleteEmpty);
    const autoCompleteItems = useMemo(() => {
      const hasSearchChild = searchChild && React.Children.count(searchChild) > 0;
      const hasEmptyChild = emptyChild && React.Children.count(emptyChild) > 0;
      if (searching) {
        return hasSearchChild ? searchChild : <AutoCompleteSearching>Searching...</AutoCompleteSearching>;
      }
      if (options.length === 0) {
        if (state === '') return null;
        return hasEmptyChild ? emptyChild : <AutoCompleteEmpty>No Options</AutoCompleteEmpty>;
      }
      return childrenToOptionsNode(options as Array<AutoCompleteOption>);
    }, [searching, options]);
    const showClearIcon = useMemo(() => clearable && searching === undefined, [clearable, searching]);

    const updateValue = (val: string) => {
      if (disabled) return;
      setSelectVal(val);
      onSelect && onSelect(val);
      setState(val);
      inputRef.current && inputRef.current.focus();
    };
    const updateVisible = (next: boolean) => setVisible(next);
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setVisible(true);
      onSearch && onSearch(event.target.value);
      setState(event.target.value);
    };
    const resetInputValue = () => {
      if (!disableFreeSolo) return;
      if (!state || state === '') return;
      if (state !== selectVal) {
        setState(selectVal);
      }
    };

    useEffect(() => {
      onChange && onChange(state);
    }, [state]);
    useEffect(() => {
      if (value === undefined) return;
      setState(value);
    }, [value]);

    const initialValue = useMemo<AutoCompleteConfig>(
      () => ({
        ref,
        value: state,
        updateValue,
        visible,
        updateVisible,
      }),
      [state, visible],
    );

    const toggleFocusHandler = (next: boolean) => {
      clearTimeout(resetTimer.current);
      setVisible(next);
      if (next) {
        onSearch && onSearch(stateRef.current);
      } else {
        resetTimer.current = window.setTimeout(() => {
          resetInputValue();
          clearTimeout(resetTimer.current);
        }, 100);
      }
    };

    const inputProps = {
      ...props,
      disabled,
      className,
      value: state,
      hasBorder,
    };

    return (
      <AutoCompleteContext.Provider value={initialValue}>
        <div ref={ref} className={useClasses('auto-complete', CLASS_NAMES)}>
          <Input
            ref={inputRef}
            type={type}
            {...getAllScaleProps()}
            onChange={onInputChange}
            onFocus={() => toggleFocusHandler(true)}
            onBlur={() => toggleFocusHandler(false)}
            clearable={showClearIcon}
            iconRight={getSearchIcon(searching, getScaleProps('scale') as ScaleResponsiveParameter<number>)}
            {...inputProps}
          />
          <AutoCompleteDropdown
            visible={visible}
            disableMatchWidth={disableMatchWidth}
            className={dropdownClassName}
            dropdownStyle={dropdownStyle}
            getPopupContainer={getPopupContainer}
          >
            {autoCompleteItems}
          </AutoCompleteDropdown>

          <style jsx>{`
            .auto-complete :global(.loading) {
              width: max-content;
            }

            ${SCALE.h(2.25, value => `height: ${value};`, undefined, 'auto-complete')}
            ${SCALE.w(1, value => `width: ${value};`, 'max-content', 'auto-complete')}

            ${UNIT('auto-complete')}
          `}</style>
        </div>
      </AutoCompleteContext.Provider>
    );
  },
);

AutoCompleteComponent.displayName = 'HimalayaAutoComplete';
const AutoComplete = withScale(AutoCompleteComponent);

export default AutoComplete;
