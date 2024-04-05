'use client';

import { Button, Footer, FooterNavigation, Hero, Link, Section, Text, useConfig } from 'components';
import { Code } from 'components/icons';
import { capitalize } from 'components/utils/collections';
import { motion } from 'framer-motion';
import { Facts, Partners, Portfolio, RunningSlogan, Services } from 'lib/components';
import { BrandLogo } from 'lib/components/icons';
import NextLink from 'next/link';
import metaData from '../lib/data/metadata.json';

export default function Index() {
  const { theme } = useConfig();
  return (
    <>
      <Hero scrollToId="services" style={{ background: theme.type == 'dark' ? '#090909' : '#ffffff' }}>
        <Hero.Tag>HIMALAYA UI</Hero.Tag>
        <Hero.Title>
          Scaling Heights of Design Excellence: Your UI Journey <span style={{ textDecoration: 'underline', fontWeight: 300 }}>Begins Here!</span>
        </Hero.Title>
        <Hero.Desc>
          Elevate your Next.js web development with our open-source UI library, offering a comprehensive suite of customizable components for building modern
          and user-friendly interfaces.
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

      <div id="services">
        <Section>
          <Services></Services>
        </Section>
      </div>

      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Partners></Partners>
      </motion.div>

      <Section>
        <Portfolio></Portfolio>
      </Section>

      <Section>
        <Facts></Facts>
      </Section>

      <RunningSlogan></RunningSlogan>

      <Footer>
        <Footer.Block justify="space-between">
          {metaData.slice(0, 3).map((df, index) => (
            <FooterNavigation title={capitalize(df.name)} key={index}>
              {df.children.slice(0, 5).map((child, childIndex) => (
                <NextLink key={childIndex} legacyBehavior passHref href={child.children[0].url || df.url}>
                  <FooterNavigation.Item>{capitalize(child.name)}</FooterNavigation.Item>
                </NextLink>
              ))}
            </FooterNavigation>
          ))}
        </Footer.Block>
        <Footer.Block justify="flex-end"></Footer.Block>
      </Footer>

      <Footer.Bottom>
        <Footer.Bottom.Block>
          <div className="logo-footer">
            <BrandLogo size={35}></BrandLogo>
          </div>
        </Footer.Bottom.Block>
        <Footer.Bottom.Block justify="flex-end">
          <Text span font={'12px'} style={{ color: 'var(--color-foreground-700)' }}>
            With support of{' '}
            <Link color href="https://redninjas.dev" target="_blank">
              RedNinjas LTD
            </Link>
          </Text>
        </Footer.Bottom.Block>
      </Footer.Bottom>

      <style jsx>{`
        .logo-footer {
          color: var(--color-foreground-1000);
        }

        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 180px 0px;
        }
      `}</style>
    </>
  );
}
