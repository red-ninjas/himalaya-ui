'use client';
import { useTranslationSetup } from '../use-language/language-config';
import React from 'react';
import Select from '../select';
import useScale, { withScale } from '../use-scale';

const LanguageSwitcherComponent: React.FC<unknown> = () => {
  const { currentLanguage, avaiableLanguages, changeLanguage } = useTranslationSetup();
  const { SCALES } = useScale();

  return (
    <div className="theme-switcher">
      <Select
        h="28px"
        pure
        width={'auto'}
        onChange={(lang: string) => {
          changeLanguage(lang);
        }}
        value={currentLanguage}
        title={'Switch Languages'}
      >
        {avaiableLanguages.map(language => (
          <Select.Option key={language} value={language}>
            {language}
          </Select.Option>
        ))}
      </Select>
      <style jsx>{`
        .theme-switcher :global(.select) {
          min-width: 38px;
        }

        .theme-switcher :global(.value) {
          margin-right: 0;
        }
        .theme-switcher {
          display: inline-flex;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </div>
  );
};
const LanguageSwitcher = withScale(LanguageSwitcherComponent);
export default LanguageSwitcher;
