'use client';

import { MDXProvider } from '@mdx-js/react/lib';
import {
  AnimatedCursor,
  Divider,
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
  useTheme,
} from 'components';
import FixedHeader from 'components/header/fixed-header';
import { Anchor, Code, Github, Home, Layout } from 'components/icons';
import ScrollableLayout from 'components/layout/scrollable-layout';
import Search, { SearchButton, SearchResult, SearchResults } from 'components/search';
import { capitalize } from 'components/utils/collections';
import { BrandLogo, BrandTitle } from 'lib/components/icons';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Seeds } from '../data';
import metaData from '../data/metadata.json';
import { MdxComponents } from '../mdx-components';
export const CoreLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
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
        <AnimatedCursor></AnimatedCursor>
        <Search searchFunction={doSearch} placeholder="Search in documentation." />
        <MobileMenuProvider>
          <QuickBarProvider>
            <QuickBarLayout>
              <ScrollableLayout onScroll={event => setIsHidden(event.scrollTop >= 200)}>
                <FixedHeader hide={pathname == '/' && isHidden} onDesktop={true} onMobile={pathname == '/'}>
                  <Header>
                    <Header.Left>
                      <MobileMenuButton></MobileMenuButton>

                      <NextLink passHref legacyBehavior href={'/'}>
                        <a className="logo">
                          <BrandLogo size={35}></BrandLogo>{' '}
                        </a>
                      </NextLink>
                      <NextLink passHref legacyBehavior href={'/'}>
                        <a className="brand">
                          <BrandTitle size={65}></BrandTitle>
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
                      <SearchButton></SearchButton>
                      <ThemeSwitcher></ThemeSwitcher>
                    </Header.Right>
                  </Header>
                </FixedHeader>
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
                <MDXProvider components={MdxComponents}>{children}</MDXProvider>
              </ScrollableLayout>
              <QuickBar height={'100%'} width={'100%'}>
                <QuickAction type="lite" href="/" radius={50} tooltip="Home">
                  <Home size={20} />
                </QuickAction>
                <Divider width={'100%'}></Divider>
                <QuickAction type="lite" radius={50} href="/guide" exactMatch={false} tooltip="Guide">
                  <Code size={20} />
                </QuickAction>
                <QuickAction type="lite" radius={50} href="/components" exactMatch={false} tooltip="Components">
                  <Layout size={20} />
                </QuickAction>
                <QuickAction type="lite" radius={50} href="/hooks" exactMatch={false} tooltip="Hooks">
                  <Anchor size={20} />
                </QuickAction>
                <Divider width={'100%'}></Divider>

                <QuickAction href="https://github.com/red-ninjas/himalaya-ui" target="_blank" type="lite" radius={50} tooltip="On Github">
                  <Github size={20} />
                </QuickAction>
              </QuickBar>
            </QuickBarLayout>
          </QuickBarProvider>
        </MobileMenuProvider>
        <style global jsx>{`
          .tag {
            color: ${theme.palette.accents_5};
          }
          .punctuation {
            color: ${theme.palette.accents_5};
          }
          .attr-name {
            color: ${theme.palette.accents_6};
          }
          .attr-value {
            color: ${theme.palette.accents_4};
          }
          .language-javascript {
            color: ${theme.palette.accents_4};
          }
          span.class-name {
            color: ${theme.palette.warning.value};
          }
          span.maybe-class-name {
            color: ${theme.palette.tertiary.value};
          }
          span.token.string {
            color: ${theme.palette.accents_5};
          }
          span.token.comment {
            color: ${theme.palette.accents_3};
          }
          span.keyword {
            color: ${theme.palette.primary.value};
          }
          span.plain-text {
            color: ${theme.palette.accents_3};
          }

          .logo {
            padding-bottom: 6px;
            color: ${theme.palette.foreground};
          }

          .logo,
          .brand {
            display: inline-flex;
            align-items: center;
            color: ${theme.palette.foreground};
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
