'use client';
import axios from 'axios';
import { CountUp, Grid, Hero, PageWidth, Text } from 'components';
import useVisible from 'components/utils/use-visibile';
import { motion } from 'framer-motion';
import { GITHUB_CONTRIBUTORS_URL } from 'lib/constants';
import { useEffect, useRef, useState } from 'react';

export function FactItem({ amount = 0, title = '' }: { amount?: number; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useVisible(ref);

  useEffect(() => {
    if (isVisible) {
      setIsPlaying(true);
    }
  }, [isVisible]);
  return (
    <motion.div
      initial={{ opacity: 0, translateY: '4rem', filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, translateY: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="fact" ref={ref}>
        <CountUp start={0} end={amount} easing="linear" isCounting={isPlaying}>
          {({ value }) => (
            <Text m={0} font={'72px'} style={{ fontWeight: '500' }}>
              {value}+
            </Text>
          )}
        </CountUp>

        <Text m={0} font={'21px'} style={{ color: `var(--color-background-500)` }}>
          {title}
        </Text>
        <style jsx>{`
          .fact {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}</style>
      </div>
    </motion.div>
  );
}

export default function Facts() {
  const ref = useRef<HTMLDivElement>(null);

  const [repoStatistics, setRepoStatistics] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const repoResponse = await axios.get(GITHUB_CONTRIBUTORS_URL);
        const forksCount = repoResponse.data.forks_count;

        const contributorsResponse = await axios.get(`${GITHUB_CONTRIBUTORS_URL}/contributors`);
        const contributorsCount = contributorsResponse.data.length;

        setRepoStatistics({ forksCount, contributorsCount });
      } catch (error) {
        console.error('Error fetching GitHub data:', error.message);
      }
    };

    fetchGithubData();
  }, []);

  return (
    <PageWidth>
      <motion.div
        initial={{ opacity: 0, translateY: '4rem', filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, translateY: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="header" ref={ref}>
          <Hero.Tag background={`var(--color-primary-1000)`} textColor={`var(--color-primary-contrast)`}>
            Our facts
          </Hero.Tag>
          <Text m={0} mt={'12px'} h4 font={'clamp(24px, 3.1vw, 48px)'} style={{ fontWeight: '700', lineHeight: '1.2' }}>
            We take pride in elegantly solving complex problems and releasing outstanding products for free to the market.
          </Text>
        </div>
        <Grid.Container gap={5} justify="center">
          <Grid xs={24} md={8} justify="center">
            <FactItem title="Components" amount={72} />
          </Grid>
          <Grid xs={24} md={8} justify="center">
            <FactItem title="Contributors" amount={repoStatistics?.contributorsCount} />
          </Grid>
          <Grid xs={24} md={8} justify="center">
            <FactItem title="Forks" amount={repoStatistics?.forksCount} />
          </Grid>
        </Grid.Container>

        <style jsx>{`
          .header {
            max-width: 860px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
            text-align: center;
            margin-bottom: 64px;
          }

          .portfolio-list {
            display: flex;
            flex-direction: column;
            gap: 60px;
            width: 100%;
          }
        `}</style>
      </motion.div>
    </PageWidth>
  );
}
