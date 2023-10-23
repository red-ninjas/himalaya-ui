'use client'

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
  Text,
} from 'components'
import { Title } from 'components/header'
import BackButton from 'components/header/back-button'
import SidebarGroup from 'components/sidebar/sidebar-group'
import SidebarLayout from 'components/sidebar/sidebar-layout'
import SidebarLink from 'components/sidebar/sidebar-link'
import { SidebarProvider } from 'components/use-sidebar'
import _ from 'lodash'
import { usePathname } from 'next/navigation'
import seeds from '../data/seeds'

export default function DocumentationLayout({ children }) {
  const pathName = usePathname()
  const seperated = pathName && pathName.length > 0 ? pathName.split('/') : []
  const firstElement = seperated.length > 1 ? seperated[1] : '/'
  const currentSeeds = seeds.filter(df => df.url.startsWith('/' + firstElement + '/'))
  const activeRecord = _.findLast(seeds, df => df.url === pathName)
  const groups = _.chain(currentSeeds)
    .groupBy('group')
    .map((value, key) => ({ title: key, children: value }))
    .value()

  return (
    <ContentLayout padding={0}>
      <MobilePage>
        <MobileMenuProvider direction="right">
          <FixedHeader onDesktop={false} onMobile={true}>
            <Header>
              <Header.Left>
                <BackButton url="/"></BackButton>
                <Title>Test</Title>
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
                  <SidebarGroup
                    isActive={activeRecord ? activeRecord.group == item.title : false}
                    key={index}
                    title={item.title}>
                    {item.children.map((subChild, subIndex) => (
                      <SidebarLink
                        key={subIndex}
                        url={subChild.url}
                        title={subChild.name}></SidebarLink>
                    ))}
                  </SidebarGroup>
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
          <MobileMenu direction="right">Test</MobileMenu>
        </MobileMenuProvider>
      </MobilePage>

      <style jsx global>{`
        .markdown h2,
        .markdown h3,
        .markdown h4,
        .markdown h5,
        .markdown h6 {
          margin: 1.6em 0 0.6em;
        }

        .markdown h1 {
          margin-top: 0;
        }
      `}</style>
    </ContentLayout>
  )
}
