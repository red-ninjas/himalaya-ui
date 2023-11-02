'use client';

import { Seeds } from 'lib/data';
import _ from 'lodash';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
export interface Meta {
  title: string;
}

const toCapitalize = (name: string) => {
  const [first, ...rest] = name;
  return `${first.toUpperCase()}${rest.join('')}`;
};

const TilteInjector = () => {
  const pathName = usePathname();
  const activeRecord = _.findLast(Seeds, df => df.url === pathName);

  const capitalizeTitle = useMemo(() => {
    if (!activeRecord) return undefined;
    if (activeRecord.name.toLowerCase().startsWith('use')) return `${activeRecord.name}`;
    return `${toCapitalize(activeRecord.name)}`;
  }, [activeRecord]);

  const desc = useMemo(() => {
    return activeRecord && activeRecord.description && activeRecord.description.length > 0
      ? activeRecord.description
      : 'Discover Himalaya UI, an exceptional open-source UI library for Next.js, offering a wide range of powerful features and seamless integration possibilities.';
  }, [activeRecord]);

  const capitalizeTitleGenerated = capitalizeTitle ? `${capitalizeTitle} — Himalaya UI` : `Himalaya UI — An Open Source Next.js UI Library`;

  const domain = process.env.SITE_URL || 'https://himalaya-ui.com';
  const fullPath = `${domain}${pathName}`;
  return (
    <>
      <title>{capitalizeTitleGenerated}</title>
      <meta name="description" content={desc} />
      <meta name="title" content={capitalizeTitleGenerated} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullPath} />
      <meta property="og:title" content={capitalizeTitleGenerated} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content="/images/himalaya-banner-dark.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullPath} />
      <meta property="twitter:title" content={capitalizeTitleGenerated} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:image" content="/images/himalaya-banner-dark.png" />
    </>
  );
};

export default TilteInjector;
