'use client';

import {
  Box,
  Header,
  MobileMenu,
  MobileMenuButton,
  MobileMenuProvider,
  Navigation,
  PageLayoutProvider,
  QuickAction,
  QuickBar,
  RoutingIndicator,
  SearchProvider,
  Sidebar,
  PageLayout,
  ThemeSwitcher,
} from 'components';
import Divider from 'components/divider';
import BackButton from 'components/header/back-button';
import Title from 'components/header/title';
import Anchor from 'components/icons/anchor';
import Code from 'components/icons/code';
import Github from 'components/icons/github';
import Home from 'components/icons/home';
import Layout from 'components/icons/layout';
import Search, { SearchButton, SearchResult, SearchResults } from 'components/search';
import { capitalize } from 'components/utils/collections';
import { BrandLogo, BrandTitle } from 'lib/components/icons';
import _ from 'lodash';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';
import { Seeds } from '../data';
import metaData from '../data/metadata.json';
export const CoreLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const seperated = pathName && pathName.length > 0 ? pathName.split('/') : [];
  const firstElement = seperated.length > 1 ? seperated[1] : '/';
  const currentSeeds = Seeds.filter(df => df.url?.startsWith('/' + firstElement + '/'));
  const activeRecord = _.findLast(Seeds, df => df.url === pathName);
  const groups = _.chain(currentSeeds)
    .groupBy('group')
    .map((value, key) => ({ title: key, children: value }))
    .value();

  async function doSearch(keyword: string): Promise<SearchResults> {
    const lowerCaseKeyword = keyword.toLowerCase();
    const data: SearchResults = Seeds.filter(seed => {
      if (seed.name.toLowerCase().includes(lowerCaseKeyword)) return true;
      return seed.group?.toLocaleLowerCase().includes(keyword);
    })
      .slice(0, 10)
      .sort(seed => {
        const startsWithName = seed.name.toLowerCase().startsWith(lowerCaseKeyword);
        const startsWithGroup = seed.group?.toLowerCase().startsWith(lowerCaseKeyword);
        if (startsWithName) return -1;
        if (startsWithGroup) return 0;
        return 1;
      })
      .map(df => {
        const result: SearchResult = {
          url: df.url || '',
          group: df.group || 'General',
          name: df.name,
        };
        return result;
      });

    return data;
  }

  const isHome = pathName === '' || pathName === '/';
  const header = (
    <Header>
      <Header.Left>
        <BackButton url="/" hideOn={{ xs: isHome, sm: isHome, md: true, xl: true, lg: true }}></BackButton>
        <Title hideOn={{ xs: isHome, sm: isHome, md: true, xl: true, lg: true }}>{activeRecord?.name}</Title>

        <Box hideOn={!isHome} showOn={{ md: isHome ? false : 'up' }}>
          <NextLink passHref legacyBehavior href={'/'}>
            <a className="logo">
              <BrandLogo size={40}></BrandLogo>
            </a>
          </NextLink>
          <NextLink passHref legacyBehavior href={'/'}>
            <a className="brand">
              <BrandTitle size={18}></BrandTitle>
            </a>
          </NextLink>
        </Box>
      </Header.Left>
      <Header.Center>
        <Navigation hideOn={{ xs: true, sm: true }}>
          <NextLink passHref legacyBehavior href={'/'}>
            <Navigation.Item title={'Home'} active={pathName == '/' || pathName == ''}></Navigation.Item>
          </NextLink>
          {metaData.map((df, index) => (
            <NextLink passHref key={index} legacyBehavior href={df.url}>
              <Navigation.Item active={!df.children || df.children.length <= 0 ? pathName == df.url : pathName.startsWith(df.url)} title={capitalize(df.name)}>
                {df.children.map((child, childIndex) => (
                  <NextLink passHref key={childIndex} legacyBehavior href={child.children[0].url || df.url}>
                    <Navigation.Item.Child title={capitalize(child.name)}></Navigation.Item.Child>
                  </NextLink>
                ))}
              </Navigation.Item>
            </NextLink>
          ))}
        </Navigation>
      </Header.Center>
      <Header.Right>
        <SearchButton hideOn={{ xs: true, sm: true }} title="Command + K to Search" />
        <ThemeSwitcher />
        <MobileMenuButton type="dark" hideOn={{ md: true, lg: true, xl: true }}></MobileMenuButton>
      </Header.Right>
    </Header>
  );

  const sidebar = (
    <Sidebar>
      {groups.map((item, index) => (
        <Sidebar.Group isActive={activeRecord ? activeRecord.group == item.title : false} key={index} title={item.title}>
          {item.children.map((subChild, subIndex) => (
            <NextLink href={subChild.url ?? ''} key={subIndex} passHref legacyBehavior>
              <Sidebar.Item isActive={subChild.url === pathName}>{subChild.name}</Sidebar.Item>
            </NextLink>
          ))}
        </Sidebar.Group>
      ))}
    </Sidebar>
  );

  const quickBar = (
    <QuickBar>
      <NextLink href="/" passHref legacyBehavior>
        <QuickAction active={pathName == '/'} tooltip="Home">
          <Home size={20} />
        </QuickAction>
      </NextLink>
      <Divider w={'100%'}></Divider>
      <NextLink href="/guide" passHref legacyBehavior>
        <QuickAction active={pathName.startsWith('/guide')} tooltip="Guide">
          <Code size={20} />
        </QuickAction>
      </NextLink>
      <NextLink href="/components" passHref legacyBehavior>
        <QuickAction active={pathName.startsWith('/components')} tooltip="Components">
          <Layout size={20} />
        </QuickAction>
      </NextLink>
      <NextLink href="/hooks" passHref legacyBehavior>
        <QuickAction active={pathName.startsWith('/hooks')} tooltip="Hooks">
          <Anchor size={20} />
        </QuickAction>
      </NextLink>
      <Divider w={'100%'}></Divider>
      <NextLink href="https://github.com/red-ninjas/himalaya-ui" passHref legacyBehavior>
        <QuickAction target="_blank" tooltip="On Github">
          <Github size={20} />
        </QuickAction>
      </NextLink>
    </QuickBar>
  );

  return (
    <Suspense>
      <RoutingIndicator>
        <MobileMenuProvider>
          <MobileMenu direction="right">
            {isHome &&
              metaData.map((df, index) => (
                <MobileMenu.Group key={index} title={capitalize(df.name)} expanded={index < 1}>
                  {df.children.map((child, childIndex) => (
                    <MobileMenu.SubGroup key={childIndex} title={capitalize(child.name)}>
                      {child.children.map((item, itemIndex) => (
                        <NextLink passHref legacyBehavior href={item.url} key={itemIndex}>
                          <MobileMenu.Item active={pathName == df.url} title={item.name} />
                        </NextLink>
                      ))}
                    </MobileMenu.SubGroup>
                  ))}
                </MobileMenu.Group>
              ))}

            {!isHome &&
              groups.map((item, index) => (
                <MobileMenu.Group key={index} title={item.title}>
                  {item.children.map((subChild, subIndex) => (
                    <NextLink key={subIndex} href={subChild.url ?? ''} legacyBehavior passHref>
                      <MobileMenu.Item title={subChild.name}></MobileMenu.Item>
                    </NextLink>
                  ))}
                </MobileMenu.Group>
              ))}
          </MobileMenu>
          <SearchProvider>
            <Search searchFunction={doSearch} placeholder="Search in documentation." />
            <PageLayoutProvider>
              <PageLayout
                sidebarContent={!isHome ? sidebar : undefined}
                headerContent={header}
                withPageMargin={!isHome}
                maximalContentWidth={isHome ? '100%' : undefined}
                quickbarContent={quickBar}
                quickbarVisible={{ xs: false, sm: false, md: true, lg: true, xl: true }}
                sidebarVisible={{ xs: false, sm: false, md: true, lg: true, xl: true }}
              >
                {children}
              </PageLayout>
            </PageLayoutProvider>

            <style global jsx>{`
              .attr-name {
                color: var(--color-background-300);
              }
              .attr-value {
                color: var(--color-background-500);
              }
              .language-javascript {
                color: var(--color-background-500);
              }
              .class-name {
                color: var(--color-warning-1000);
              }
              .maybe-class-name {
                color: var(--color-foreground-600);
              }
              .token.string {
                color: var(--color-success-1000);
              }
              .token.comment {
                color: var(--color-background-600);
              }
              .keyword {
                color: var(--color-code-1000);
              }
              .attr-name {
                color: var(--color-tertiary-1000);
              }
              .punctuation {
                color: var(--color-foreground-600);
              }
              .property-access {
                color: var(--color-primary-1100);
              }
              .imports {
                color: var(--color-tertiary-1000);
              }
              .plain-text {
                color: var(--color-background-300);
              }
              .tag {
                color: var(--color-primary-1000);
              }
              .logo {
                padding-bottom: 6px;
                color: var(--color-foreground-1000);
              }

              .logo,
              .brand {
                display: inline-flex;
                align-items: center;
                color: var(--color-foreground-1000);
              }

              .brand {
                margin-left: 6px;
              }
              [class*='language-'],
              pre[class*='language-'] {
                font-family: var(--theme-font-mono) !important;
              }
            `}</style>
          </SearchProvider>
        </MobileMenuProvider>
      </RoutingIndicator>
    </Suspense>
  );
};
