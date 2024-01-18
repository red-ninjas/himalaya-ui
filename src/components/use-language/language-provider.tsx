'use client';

import i18n, { ResourceKey } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { merge } from 'lodash';
import React, { useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { UITranslations, TranslationProviderProps } from './share';
import { TranslationConfigContext } from './language-config';

const TranslationProvider: React.FC<React.PropsWithChildren<TranslationProviderProps>> = ({
  children,
  translation = {},
  defaultLanguage = 'en',
}: React.PropsWithChildren<TranslationProviderProps>) => {
  const merged = merge(UITranslations, translation);
  const [avaiableLanguages, setAvaiableLanguages] = useState<string[]>(Object.keys(merged));

  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: merged,
      fallbackLng: defaultLanguage,
      supportedLngs: ['en', 'de'],
      interpolation: {
        escapeValue: false,
      },
    });

  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  const addNamespaceResource = (language: string, namespace: string, translations: ResourceKey) => {
    if (i18n.hasResourceBundle(language, namespace)) {
      i18n.removeResourceBundle(language, namespace);
    }

    i18n.addResourceBundle(language, namespace, translations);
    setAvaiableLanguages(merge(avaiableLanguages, [language]));
  };

  const removeNamepaceResource = (language: string, namespace: string) => {
    i18n.removeResourceBundle(language, namespace);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      setCurrentLanguage(i18n.language);
    });
  };

  return (
    <I18nextProvider i18n={i18n}>
      <TranslationConfigContext.Provider
        value={{
          addNamespaceResource,
          removeNamepaceResource,
          currentLanguage,
          changeLanguage,
          avaiableLanguages,
        }}
      >
        {children}
      </TranslationConfigContext.Provider>
    </I18nextProvider>
  );
};
TranslationProvider.displayName = 'HimalayaTranslationProvider';
export default TranslationProvider;
