'use client';
import React from 'react';

export interface TranslationKeyValuePair {
  [key: string]: string;
}

export interface TranslationConfig {
  addNamespaceResource: (language: string, namespace: string, translations: TranslationKeyValuePair) => void;
  removeNamepaceResource: (language: string, name: string) => void;
  currentLanguage: string;
  avaiableLanguages: readonly string[];
  changeLanguage: (language: string) => void;
}

export const defaultTranslationConfig: TranslationConfig = {
  addNamespaceResource: () => {},
  removeNamepaceResource: () => {},
  currentLanguage: 'en',
  avaiableLanguages: [],
  changeLanguage: () => {},
};

export const TranslationConfigContext = React.createContext<TranslationConfig>(defaultTranslationConfig);
export const useTranslationSetup = (): TranslationConfig => React.useContext(TranslationConfigContext);
