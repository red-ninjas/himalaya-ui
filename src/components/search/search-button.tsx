'use client';

import useKeyboard, { KeyCode, KeyMod } from '../use-keyboard';
import Keyboard, { KeyboardProps as keyboardiProps } from '../keyboard';
import useScale, { withScale } from '../use-scale';
import React from 'react';
import useSearch from '../use-search';
import { useClasses } from 'components';
export type SearchButtonProps = {
  title?: string;
  key?: KeyCode;
  mod?: KeyMod;
};
const SearchButtonComponent: React.FC<SearchButtonProps & keyboardiProps> = props => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  const { setIsEnabled } = useSearch();

  const keyCmd: KeyCode = props.key || KeyCode.KEY_K;
  const keyMod: KeyMod = props.mod || KeyMod.CtrlCmd;

  useKeyboard(() => {
    setIsEnabled(true);
  }, [keyMod, keyCmd]);
  return (
    <div className={useClasses('wrapper', CLASS_NAMES)}>
      <Keyboard {...props} h="32px" font="12px" command={true} className="shortcuts" title={props.title}>
        K
      </Keyboard>

      <style jsx>{`
        .wrapper {
          display: inline-flex;
        }

        .wrapper :global(kbd.shortcuts) {
          line-height: 32px !important;
          cursor: help;
          opacity: 0.75;
          border: none;
        }

        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'wrapper')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'wrapper')}

        ${UNIT('wrapper')}
      `}</style>
    </div>
  );
};
SearchButtonComponent.displayName = 'HimalayaSearchButton';
const SearchButton = React.memo(withScale(SearchButtonComponent));
export default SearchButton;
