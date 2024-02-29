'use client';
import useWarning from '../utils/use-warning';
import { useCallback } from 'react';

export type UseClipboardOptions = {
  onError?: () => unknown;
  onSuccess?: () => unknown;
};

export type UseClipboardResult = {
  copy: (text: string) => void;
};

const useClipboard = (userOptions?: UseClipboardOptions): UseClipboardResult => {
  const options = {
    onError: () => useWarning('Failed to copy.', 'use-clipboard'),
    onSuccess: () => console.log('Text successfully copied'),
    ...userOptions,
  };
  const copyText = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      console.log('Text successfully copied');
      options.onSuccess && options.onSuccess();
    } catch (e) {
      console.error('Failed to copy text:', e);
      options.onError && options.onError();
    }
  };

  const copy = useCallback(
    (text: string) => {
      copyText(text);
    },
    [options.onError, options.onSuccess],
  );

  return { copy };
};

export default useClipboard;
