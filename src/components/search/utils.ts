export type SearchResult = {
  name?: string;
  symbol?: React.ReactNode;
  url: string;
  group: string;
};

export type SearchResultGroup = {
  title: string;
  items: SearchResults;
};

export type SearchResults = Array<SearchResult>;
export type SearchFunction = (keyword: string) => Promise<SearchResults>;

export type SearchProps = {
  searchFunction?: SearchFunction;
  visibile?: boolean;
  placeholder?: string;
  onClose?: () => void;
};
