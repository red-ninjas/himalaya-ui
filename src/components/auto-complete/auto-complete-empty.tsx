'use client';
import React from 'react';
import AutoCompleteSearch from './auto-complete-searching';

interface Props {
  hidden?: boolean;
  className?: string;
}

export type AutoCompleteEmptyProps = Props & React.HTMLAttributes<any>;

const AutoCompleteEmpty: React.FC<React.PropsWithChildren<AutoCompleteEmptyProps>> = ({
  children,
  hidden = false,
  className = '',
}: React.PropsWithChildren<AutoCompleteEmptyProps>) => {
  if (hidden) return null;
  return <AutoCompleteSearch className={className}>{children}</AutoCompleteSearch>;
};

AutoCompleteEmpty.displayName = 'HimalayaAutoCompleteEmpty';

export default AutoCompleteEmpty;
