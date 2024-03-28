'use client';

import {
  Header,
  MobileMenu,
  MobileMenuButton,
  MobileMenuProvider,
  Navigation,
  QuickAction,
  QuickBar,
  QuickBarLayout,
  QuickBarProvider,
  RoutingIndicator,
  SearchProvider,
  ThemeSwitcher,
  useLayout,
} from 'components';
import Divider from 'components/divider';
import FixedHeader from 'components/header/fixed-header';
import Anchor from 'components/icons/anchor';
import Code from 'components/icons/code';
import Github from 'components/icons/github';
import Home from 'components/icons/home';
import Layout from 'components/icons/layout';
import ScrollableLayout from 'components/layout/scrollable-layout';
import Search, { SearchButton, SearchResult, SearchResults } from 'components/search';
import { capitalize } from 'components/utils/collections';
import { BrandLogo, BrandTitle } from 'lib/components/icons';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Seeds } from '../data';
import metaData from '../data/metadata.json';
export const CoreLayout = ({ children }: { children: React.ReactNode }) => {
  const layout = useLayout();
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState<boolean>(false);

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

  return (
    <RoutingIndicator>
      <SearchProvider>
        <Search searchFunction={doSearch} placeholder="Search in documentation." />
        <MobileMenuProvider>
          <QuickBarProvider>
            <QuickBarLayout disabled={{ xs: true, md: false }}>
              <ScrollableLayout onScroll={event => setIsHidden(event.scrollTop >= 200)}>
                <FixedHeader hidden={pathname == '/' && isHidden} hideOn={{ xs: pathname != '/' }}>
                  <Header>
                    <Header.Left>
                      <MobileMenuButton></MobileMenuButton>

                      <NextLink passHref legacyBehavior href={'/'}>
                        <a className="logo">
                          <BrandLogo size={40}></BrandLogo>{' '}
                        </a>
                      </NextLink>
                      <NextLink passHref legacyBehavior href={'/'}>
                        <a className="brand">
                          <BrandTitle size={18}></BrandTitle>
                        </a>
                      </NextLink>
                    </Header.Left>
                    <Header.Center>
                      <Navigation>
                        <Navigation.Item title={'Home'} url={'/'}></Navigation.Item>
                        {metaData.map((df, index) => (
                          <Navigation.Item key={index} exactMatch={!df.children || df.children.length <= 0} title={capitalize(df.name)} url={df.url}>
                            {df.children.map((child, childIndex) => (
                              <Navigation.Item.Child
                                key={childIndex}
                                title={capitalize(child.name)}
                                url={child.children[0].url || df.url}
                              ></Navigation.Item.Child>
                            ))}
                          </Navigation.Item>
                        ))}
                      </Navigation>
                    </Header.Center>
                    <Header.Right>
                      <SearchButton title="Command + K to Search" />
                      <ThemeSwitcher />
                    </Header.Right>
                  </Header>
                </FixedHeader>
                {children}
              </ScrollableLayout>
              <QuickBar>
                <NextLink href="/" passHref legacyBehavior>
                  <QuickAction active={pathname == '/'} tooltip="Home">
                    <Home size={20} />
                  </QuickAction>
                </NextLink>
                <Divider w={'100%'}></Divider>
                <NextLink href="/guide" passHref legacyBehavior>
                  <QuickAction active={pathname.startsWith('/guide')} tooltip="Guide">
                    <Code size={20} />
                  </QuickAction>
                </NextLink>
                <NextLink href="/components" passHref legacyBehavior>
                  <QuickAction active={pathname.startsWith('/components')} tooltip="Components">
                    <Layout size={20} />
                  </QuickAction>
                </NextLink>
                <NextLink href="/hooks" passHref legacyBehavior>
                  <QuickAction active={pathname.startsWith('/hooks')} tooltip="Hooks">
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
            </QuickBarLayout>
          </QuickBarProvider>
          <MobileMenu>
            <MobileMenu.Item url="/" title="Home" />
            {metaData.map((df, index) => (
              <MobileMenu.Group key={index} title={capitalize(df.name)} expanded={index < 1}>
                {df.children.map((child, childIndex) => (
                  <MobileMenu.SubGroup key={childIndex} title={capitalize(child.name)}>
                    {child.children.map((item, itemIndex) => (
                      <MobileMenu.Item key={itemIndex} url={item.url} title={item.name} />
                    ))}
                  </MobileMenu.SubGroup>
                ))}
              </MobileMenu.Group>
            ))}
          </MobileMenu>
        </MobileMenuProvider>
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
            color: var(--color-code-1000);
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

          @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
            .logo {
              display: none;
            }
          }
        `}</style>
      </SearchProvider>
    </RoutingIndicator>
  );
};
