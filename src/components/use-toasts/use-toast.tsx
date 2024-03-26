'use client';

import React, { CSSProperties, useEffect } from 'react';
import { useConfigs, defaultToastLayout } from '../use-config';
import { ToastPlacement } from '../use-toasts/helpers';
import { getId } from '../utils/collections';
import type { COLOR_TYPES } from '../utils/prop-types';

export interface ToastAction {
  name: string;
  handler: (event: React.MouseEvent<HTMLButtonElement>, cancel: () => void) => void;
  passive?: boolean;
}
export type ToastTypes = COLOR_TYPES;
export type ToastLayout = {
  padding?: CSSProperties['padding'];
  r?: CSSProperties['borderRadius'];
  margin?: CSSProperties['margin'];
  width?: CSSProperties['width'];
  maxWidth?: CSSProperties['maxWidth'];
  maxHeight?: CSSProperties['maxHeight'];
  placement?: ToastPlacement;
};
export interface ToastInput {
  text: string | React.ReactNode;
  type?: ToastTypes;
  id?: string;
  delay?: number;
  actions?: Array<ToastAction>;
}
export type ToastInstance = {
  visible: boolean;
  cancel: () => void;
  _timeout: null | number;
  _internalIdent: string;
};

export type Toast = Required<ToastInput> & ToastInstance;

const defaultToast = {
  delay: 2000,
  type: 'default' as ToastTypes,
};

export type ToastHooksResult = {
  toasts: Array<Toast>;
  setToast: (toast: ToastInput) => void;
  removeAll: () => void;
  findToastOneByID: (ident: string) => Toast | undefined;
  removeToastOneByID: (ident: string) => void;
};

const useToasts = (layout?: ToastLayout): ToastHooksResult => {
  const { updateToasts, toasts, updateToastLayout, updateLastToastId } = useConfigs();

  useEffect(() => {
    if (!layout) return;
    updateToastLayout(() => (layout ? { ...defaultToastLayout, ...layout } : defaultToastLayout));
  }, []);

  const cancel = (internalId: string) => {
    updateToasts((currentToasts: Array<Toast>) =>
      currentToasts.map(item => {
        if (item._internalIdent !== internalId) return item;
        return { ...item, visible: false };
      }),
    );
    updateLastToastId(() => internalId);
  };
  const removeAll = () => {
    updateToasts(last => last.map(toast => ({ ...toast, visible: false })));
  };
  const findToastOneByID = (id: string) => toasts.find(t => t.id === id);
  const removeToastOneByID = (id: string) => {
    updateToasts(last =>
      last.map(toast => {
        if (toast.id !== id) return toast;
        return {
          ...toast,
          visible: false,
        };
      }),
    );
  };

  const setToast = (toast: ToastInput): void => {
    const internalIdent = `toast-${getId()}`;
    const delay = toast.delay || defaultToast.delay;
    if (toast.id) {
      const hasIdent = toasts.find(t => t.id === toast.id);
      if (hasIdent) {
        throw new Error('Toast: Already have the same key: "ident"');
      }
    }

    updateToasts((last: Array<Toast>) => {
      const newToast: Toast = {
        delay,
        text: toast.text,
        visible: true,
        type: toast.type || defaultToast.type,
        id: toast.id || internalIdent,
        actions: toast.actions || [],
        _internalIdent: internalIdent,
        _timeout: window.setTimeout(() => {
          cancel(internalIdent);
          if (newToast._timeout) {
            window.clearTimeout(newToast._timeout);
            newToast._timeout = null;
          }
        }, delay),
        cancel: () => cancel(internalIdent),
      };
      return [...last, newToast];
    });
  };

  return {
    toasts,
    setToast,
    removeAll,
    findToastOneByID,
    removeToastOneByID,
  };
};

export default useToasts;
