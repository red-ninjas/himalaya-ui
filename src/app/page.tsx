'use client';

import { Button, FadeInEffect, Footer, FooterBottom, FooterNavigation, Hero, Link, PageLayout, Section, Text, useTheme } from 'components';
import { Code } from 'components/icons';
import { capitalize } from 'components/utils/collections';
import { Background, Facts, Partners, Portfolio, RunningSlogan, Services } from 'lib/components';
import { BrandLogo } from 'lib/components/icons';
import metaData from '../lib/data/metadata.json';

export default function Index() {
  const theme = useTheme();
  return (
    <>
      <div className="hero">
        <div className="hero-inner">
          <Hero style={{ maxWidth: 1020 }} scrollToId="services">
            <Hero.Tag>HIMALAYA UI</Hero.Tag>
            <Hero.Title>
              Scaling Heights of Design Excellence: Your UI Journey <span style={{ textDecoration: 'underline', fontWeight: 300 }}>Begins Here!</span>
            </Hero.Title>
            <Hero.Desc>
              Elevate your Next.js web development with our open-source UI library, offering a comprehensive suite of customizable components for building
              modern and user-friendly interfaces.
            </Hero.Desc>
            <Hero.Actions>
              <Link href={'/guide/introduction'}>
                <Button type="primary" auto icon={<Code></Code>} scale={1.3}>
                  Documentation
                </Button>
              </Link>
              <Link href={'/guide/installation'}>
                <Button type="secondary" scale={1.3}>
                  Installation
                </Button>
              </Link>
            </Hero.Actions>
          </Hero>
        </div>
        <div className="hero-bg">
          <Background></Background>
        </div>
      </div>

      <div id="services">
        <Section>
          <Services></Services>
        </Section>
      </div>

      <PageLayout>
        <FadeInEffect blur={10} transition={1000}>
          <Partners></Partners>
        </FadeInEffect>
      </PageLayout>

      <PageLayout>
        <Section>
          <Portfolio></Portfolio>
        </Section>
      </PageLayout>

      <Section>
        <Facts></Facts>
      </Section>
      <PageLayout>
        <RunningSlogan></RunningSlogan>
      </PageLayout>

      <Footer>
        <Footer.Block justify="space-between">
          {metaData.slice(0, 3).map((df, index) => (
            <FooterNavigation title={capitalize(df.name)} key={index}>
              {df.children.slice(0, 5).map((child, childIndex) => (
                <FooterNavigation.Item key={childIndex} href={child.children[0].url || df.url}>
                  {capitalize(child.name)}
                </FooterNavigation.Item>
              ))}
            </FooterNavigation>
          ))}
        </Footer.Block>
        <Footer.Block justify="flex-end"></Footer.Block>
      </Footer>

      <FooterBottom>
        <FooterBottom.Block>
          <div className="logo-footer">
            <BrandLogo size={35}></BrandLogo>
          </div>
        </FooterBottom.Block>
        <FooterBottom.Block justify="flex-end">
          <Text span font={'12px'} style={{ color: theme.palette.accents_5 }}>
            With support of{' '}
            <Link color href="https://redninjas.dev" target="_blank">
              RedNinjas LTD
            </Link>
          </Text>
        </FooterBottom.Block>
      </FooterBottom>

      <style jsx>{`
        .logo-footer {
          color: ${theme.palette.foreground};
        }

        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 180px 0px;
        }

        .hero {
          position: relative;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
        }
        .hero-bg {
          position: absolute;
          width: 100%;
          top: 0;
          height: 100%;
        }
      `}</style>
    </>
  );
}
