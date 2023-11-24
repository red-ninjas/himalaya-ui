'use client';
import React, { FocusEvent, MouseEvent, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { SearchResultGroup, SearchResults } from '.';
import Highlight from '../shared/highlight';
import useTheme from '../use-theme';
import { useRect } from '../utils/layouts';
import SearchItem from './search-item';
import InnerScroll from '../scroll/inner-scroll';

export const isSearchItem = (el?: HTMLElement): boolean => {
  if (!el) return false;
  return !!el.attributes.getNamedItem('data-search-item');
};

export type SearchItemsProps = {
  data: SearchResults;
  onSelect: (url: string) => void;
  preventHoverHighlightSync?: boolean;
  displayHoverHighlight?: boolean;
};

export type SearchItemsRef = HTMLUListElement & {
  closeHighlight: () => void;
};

export const groupResults = (data: SearchResults) => {
  return data.reduce<SearchResultGroup[]>((acc, item) => {
    const title = item.group || 'General';
    const group = acc.find(group => group.title === title);
    if (!group) {
      acc.push({ title, items: [item] });
    } else {
      group.items.push(item);
    }
    return acc;
  }, []);
};

const SearchItems = React.forwardRef<SearchItemsRef, React.PropsWithChildren<SearchItemsProps>>(
  ({ data, onSelect, preventHoverHighlightSync }, outRef: React.Ref<SearchItemsRef | null>) => {
    const theme = useTheme();
    const { rect, setRect } = useRect();
    const ref = useRef<HTMLUListElement | null>(null);
    const [displayHighlight, setDisplayHighlight] = useState<boolean>(false);
    useImperativeHandle(outRef, () =>
      Object.assign(ref.current || { closeHighlight: undefined }, {
        closeHighlight: () => setDisplayHighlight(false),
      }),
    );

    const hoverHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (preventHoverHighlightSync) return;
      if (!isSearchItem(event.target as HTMLButtonElement)) return;
      (event.target as HTMLButtonElement).focus();
    };
    const focusHandler = (event: FocusEvent<HTMLButtonElement>) => {
      if (!isSearchItem(event.target as HTMLButtonElement)) return;
      setRect(event, () => ref.current);
      setDisplayHighlight(true);
    };
    const blurHandler = () => {
      setDisplayHighlight(false);
    };

    const grouppedResults = useMemo(() => groupResults(data), [data]);
    return (
      <InnerScroll type="vertical" style={{ maxHeight: 350 }}>
        <ul className="results" role="listbox" ref={ref}>
          <Highlight className="results-hover" rect={rect} visible={displayHighlight} activeOpacity={0.5} />
          {grouppedResults.map(group => (
            <li role="presentation" key={group.title}>
              <div className="group-title">{group.title}</div>
              <ul role="group">
                {group.items.map(item => (
                  <SearchItem onSelect={onSelect} onMouseOver={hoverHandler} onFocus={focusHandler} onBlur={blurHandler} data={item} key={item.url} />
                ))}
              </ul>
            </li>
          ))}

          <style jsx>{`
            .results {
              width: 100%;
              margin-bottom: 0.5rem;
              overflow-y: auto;
              position: relative;
              width: 100%;
            }
            .results :global(li:before) {
              content: none;
            }
            .group-title {
              color: ${theme.palette.accents_5};
              font-size: 0.75rem;
              text-align: start;
              margin: 0.25rem 0;
            }
            .results:global(div.highlight.results-hover) {
              border-radius: 8px;
            }
          `}</style>
        </ul>
      </InnerScroll>
    );
  },
);
SearchItems.displayName = 'HimalayaSearchItems';
export default SearchItems;
