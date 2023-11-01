'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Divider from '../divider';
import Input from '../input';
import Modal from '../modal';
import useCurrentState from '../use-current-state';
import useInput from '../use-input';
import useKeyboard, { KeyCode } from '../use-keyboard';
import useModal from '../use-modal';
import useTheme from '../use-theme';
import { SearchProps, SearchResults } from './utils';
import SearchItems, { SearchItemsRef } from './search-items';
import useSearch from '../use-search';

const focusNextElement = (containerElement: HTMLElement | null, done: () => void, isBack?: boolean) => {
  const focusTo = (child?: HTMLElement) => {
    if (child?.tagName !== 'BUTTON') return;
    done();
    (child as HTMLButtonElement)?.focus();
  };

  if (!containerElement) return;
  const children = Array.from(containerElement.querySelectorAll('button'));
  if (children.length === 0) return;

  const index = children.findIndex(child => child === document.activeElement);

  if (index === -1) {
    if (isBack) return;
    return focusTo(children[0]);
  }

  if (isBack) {
    if (index - 1 < 0) return focusTo(children[children.length - 1]);
    return focusTo(children[index - 1]);
  }

  if (index + 2 > children.length) return focusTo(children[0]);
  focusTo(children[index + 1]);
};

const Search: React.FC<SearchProps> = ({ searchFunction, visibile = false, placeholder, onClose }: SearchProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { isEnabled, setIsEnabled } = useSearch();
  const [preventHover, setPreventHover, preventHoverRef] = useCurrentState<boolean>(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const itemsRef = useRef<SearchItemsRef | null>(null);
  const [results, setResults] = useState<SearchResults>([]);
  const { bindings, setVisible, visible } = useModal(visibile);
  const { bindings: inputBindings, setState: setInput, state: input } = useInput('');

  const activateSearch = (enabled: boolean) => {
    setVisible(enabled);
    if (enabled) {
      const timer = setTimeout(() => {
        ref.current?.focus();
        window.clearTimeout(timer);
      }, 100);
    }
  };

  const cleanAfterModalClose = () => {
    activateSearch(false);
    setIsEnabled(false);

    if (onClose) {
      onClose();
    }
    const timer = window.setTimeout(() => {
      setResults([]);
      setInput('');
      itemsRef.current?.scrollTo(0, 0);
      setPreventHover(true);
      window.clearTimeout(timer);
    }, 400);
  };

  useEffect(() => {
    activateSearch(isEnabled);
  }, [isEnabled]);

  useEffect(() => {
    activateSearch(visibile);
    setIsEnabled(visibile);
  }, [visibile]);

  useEffect(() => {
    if (!input) return setResults([]);
    // declare the data fetching function
    const fetchData = async () => {
      if (searchFunction == undefined) {
        return [];
      }
      const data = await searchFunction(input);
      setResults(data);
      setPreventHover(true);

      itemsRef.current?.scrollTo(0, 0);
      return data;
    };

    fetchData().catch(console.error);
  }, [input]);

  useEffect(() => {
    if (visible) return;
    cleanAfterModalClose();
  }, [visible]);

  useEffect(() => {
    const eventHandler = () => {
      if (!preventHoverRef.current) return;
      setPreventHover(false);
    };
    document.addEventListener('mousemove', eventHandler);
    return () => {
      document.removeEventListener('mousemove', eventHandler);
    };
  }, []);

  const selectHandler = (url: string) => {
    activateSearch(false);
    setIsEnabled(false);

    if (onClose) {
      onClose();
    }
    if (url.startsWith('http')) {
      return window.open(url);
    }
    router.push(url);
  };

  const { bindings: KeyBindings } = useKeyboard(
    event => {
      const isBack = event.keyCode === KeyCode.UpArrow;
      focusNextElement(
        itemsRef.current,
        () => {
          setPreventHover(true);
        },
        isBack,
      );
    },
    [KeyCode.DownArrow, KeyCode.UpArrow],
    {
      disableGlobalEvent: true,
    },
  );

  return (
    <div className="container" {...KeyBindings}>
      <Modal {...bindings} py={0} px={0.75} wrapClassName="search-menu" backdropClassName="bg-drop" positionClassName="search-position">
        <Input ref={ref} w="100%" font="1.125rem" py={0.75} placeholder={placeholder || ''} className="search-input" clearable {...inputBindings} />
        {results.length > 0 && (
          <>
            <Divider mt={0} mb={1} />
            <SearchItems preventHoverHighlightSync={preventHover} ref={itemsRef} data={results} onSelect={selectHandler} />
          </>
        )}
      </Modal>
      <style jsx>{`
        .title {
          width: 100%;
          color: ${theme.palette.background};
          background-color: ${theme.palette.tertiary.value};
          display: flex;
          justify-content: flex-end;
          padding: 0 10px;
          user-select: none;
        }
        .container {
          visibility: hidden;
        }
        :global(.search-menu ul),
        :global(.search-menu li) {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        :global(.search-menu .input-container.search-input) {
          border: none;
          border-radius: 0;
        }
        :global(.search-menu .input-container div.input-wrapper) {
          border: none;
          border-radius: 0;
        }
        :global(.search-menu .input-container .input-wrapper.hover) {
          border: none;
        }
        :global(.search-menu .input-container .input-wrapper:active) {
          border: none;
        }
        :global(div.search-position.position) {
          position: absolute;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          transition: all 500ms ease;
          width: 500px;
          height: auto;
        }
        :global(.search-menu.wrapper) {
          box-shadow:
            0 5px 20px 0 rgba(0, 0, 0, 0.15),
            0 -5px 20px 0 rgba(0, 0, 0, 0.15) !important;
        }
        :global(.bg-drop .layer) {
          background-color: #252525 !important;
        }
      `}</style>
    </div>
  );
};

export default Search;
