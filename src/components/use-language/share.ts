import { Resource } from 'i18next';

export const UITranslationNameSpace = 'himalya';
export const UITranslations: Resource = {
  en: {
    ui: {
      test: 'test',
    },
  },
  de: {
    ui: {
      test: 'test',
    },
  },
};
export interface TranslationProviderProps {
  translation?: Resource;
  defaultLanguage?: string;
}
