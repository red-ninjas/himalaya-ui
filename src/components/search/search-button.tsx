'use client';

import useKeyboard, { KeyCode, KeyMod } from '../use-keyboard';
import Keyboard, { KeyboardProps as keyboardiProps } from '../keyboard';
import useScale, { withScale } from '../use-scale';
import React from 'react';
import useSearch from '../use-search';
export type SearchButtonProps = {
  title?: string;
  key?: KeyCode;
  mod?: KeyMod;
};
const SearchButtonComponent: React.FC<SearchButtonProps & keyboardiProps> = React.memo(props => {
  const { SCALES } = useScale();
  const { setIsEnabled } = useSearch();

  const keyCmd: KeyCode = props.key || KeyCode.KEY_K;
  const keyMod: KeyMod = props.mod || KeyMod.CtrlCmd;

  useKeyboard(() => {
    setIsEnabled(true);
  }, [keyMod, keyCmd]);
  return (
    <div className="wrapper">
      <Keyboard {...props} h="30px" font="12px" command={true} className="shortcuts" title={props.title}>
        K
      </Keyboard>

      <style jsx>{`
        .wrapper {
          display: inline-flex;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .wrapper :global(kbd.shortcuts) {
          line-height: 30px !important;
          cursor: help;
          opacity: 0.75;
          border: none;
        }
      `}</style>
    </div>
  );
});
SearchButtonComponent.displayName = 'HimalayaSearchButton';
const SearchButton = withScale(SearchButtonComponent);
export default SearchButton;
