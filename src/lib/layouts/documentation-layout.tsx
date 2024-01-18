'use client';

import {
  ContentLayout,
  FixedHeader,
  FooterBottom,
  Header,
  Link,
  MobileMenu,
  MobileMenuButton,
  MobileMenuProvider,
  MobilePage,
  Sidebar,
  SidebarLayout,
  SidebarProvider,
  Text,
  useTheme,
} from 'components';
import { Title } from 'components/header';
import BackButton from 'components/header/back-button';
import _ from 'lodash';
import { usePathname } from 'next/navigation';
import { Seeds } from '../data';

export default function DocumentationLayout({ children }) {
  const theme = useTheme();
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
    <ContentLayout padding={0}>
      <MobilePage>
        <MobileMenuProvider direction="right">
          <FixedHeader onDesktop={false} onMobile={true}>
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
            <SidebarLayout>
              <Sidebar>
                {groups.map((item, index) => (
                  <Sidebar.Group isActive={activeRecord ? activeRecord.group == item.title : false} key={index} title={item.title}>
                    {item.children.map((subChild, subIndex) => (
                      <Sidebar.Item key={subIndex} href={subChild.url}>
                        {subChild.name}
                      </Sidebar.Item>
                    ))}
                  </Sidebar.Group>
                ))}
              </Sidebar>
              <ContentLayout>
                <div className="markdown">{children}</div>
              </ContentLayout>
              <FooterBottom>
                <FooterBottom.Block></FooterBottom.Block>
                <FooterBottom.Block justify="flex-end">
                  <Text span font={'12px'}>
                    With support of{' '}
                    <Link color href="https://redninjas.dev" target="_blank">
                      RedNinjas LTD
                    </Link>
                  </Text>
                </FooterBottom.Block>
              </FooterBottom>
            </SidebarLayout>
          </SidebarProvider>
          <MobileMenu direction="right">
            {groups.map((item, index) => (
              <MobileMenu.Group key={index} title={item.title}>
                {item.children.map((subChild, subIndex) => (
                  <MobileMenu.Item title={subChild.name} key={subIndex} url={subChild.url}></MobileMenu.Item>
                ))}
              </MobileMenu.Group>
            ))}
          </MobileMenu>
        </MobileMenuProvider>
      </MobilePage>

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
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </ContentLayout>
  );
}
