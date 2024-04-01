'use client';

import {
  FixedHeader,
  Footer,
  Header,
  Link,
  MobileMenu,
  MobileMenuButton,
  MobileMenuProvider,
  PageWidth,
  Sidebar,
  SidebarLayout,
  SidebarProvider,
  Text,
} from 'components';
import { Title } from 'components/header';
import BackButton from 'components/header/back-button';
import _ from 'lodash';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Seeds } from '../data';

export default function DocumentationLayout({ children }) {
  const pathName = usePathname();
  const seperated = pathName && pathName.length > 0 ? pathName.split('/') : [];
  const firstElement = seperated.length > 1 ? seperated[1] : '/';
  const currentSeeds = Seeds.filter(df => df.url?.startsWith('/' + firstElement + '/'));
  const activeRecord = _.findLast(Seeds, df => df.url === pathName);
  const groups = _.chain(currentSeeds)
    .groupBy('group')
    .map((value, key) => ({ title: key, children: value }))
    .value();

  return (
    <PageWidth p={0} h={'100%'}>
      <MobileMenuProvider>
        <FixedHeader hideOn={{ xs: false, md: true, lg: true, sm: true, xl: true }}>
          <Header>
            <Header.Left>
              <BackButton url="/"></BackButton>
              <Title>{activeRecord?.name}</Title>
            </Header.Left>
            <Header.Right>
              <MobileMenuButton></MobileMenuButton>
            </Header.Right>
          </Header>
        </FixedHeader>
        <SidebarProvider>
          <SidebarLayout disabled={{ xs: true, sm: false }}>
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
            <PageWidth>
              <div className="markdown">{children}</div>
            </PageWidth>
            <Footer.Bottom>
              <Footer.Bottom.Block></Footer.Bottom.Block>
              <Footer.Bottom.Block justify="flex-end">
                <Text span font={'12px'}>
                  With support of{' '}
                  <Link color href="https://redninjas.dev" target="_blank">
                    RedNinjas LTD
                  </Link>
                </Text>
              </Footer.Bottom.Block>
            </Footer.Bottom>
          </SidebarLayout>
        </SidebarProvider>
        <MobileMenu direction="right">
          {groups.map((item, index) => (
            <MobileMenu.Group key={index} title={item.title}>
              {item.children.map((subChild, subIndex) => (
                <NextLink key={subIndex} href={subChild.url ?? ''} legacyBehavior passHref>
                  <MobileMenu.Item title={subChild.name}></MobileMenu.Item>
                </NextLink>
              ))}
            </MobileMenu.Group>
          ))}
        </MobileMenu>
      </MobileMenuProvider>

      <style jsx global>{`
        .markdown h2,
        .markdown h3,
        .markdown h4,
        .markdown h5,
        .markdown h6 {
          margin: 1em 0 0.6em;
        }

        .markdown h1 {
          margin-top: 0;
        }

        .markdown p,
        .markdown small {
          color: var(--color-foreground-800);
        }
      `}</style>
    </PageWidth>
  );
}
