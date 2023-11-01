import { Activity } from 'components/icons';
import FeatherIcon from 'components/icons/feather';
import GitHubIcon from 'components/icons/github';
import PackageIcon from 'components/icons/package';
import { Button, ContentLayout, FadeInEffect, Grid, Hero, Text, useTheme } from 'components';
import { HomeCell } from '.';
export default function Services() {
  const theme = useTheme();
  return (
    <ContentLayout>
      <FadeInEffect translateY="4rem">
        <div className="header">
          <FadeInEffect translateY="4rem">
            <Hero.Tag background={theme.palette.primary.value} textColor={theme.palette.primary.contrast}>
              UI library
            </Hero.Tag>
          </FadeInEffect>
          <FadeInEffect translateY="4rem">
            <Text margin={0} marginTop={'12px'} h4 font={'clamp(24px, 3.1vw, 48px)'} style={{ fontWeight: '700', lineHeight: '1.2' }}>
              Scaling Excellence: UI Components Beyond Limits
            </Text>
          </FadeInEffect>
          <FadeInEffect translateY="4rem">
            <Text margin={0} marginTop={'24px'} p font={'clamp(14px, 1.2vw, 16px)'} style={{ color: theme.palette.accents_6, fontWeight: 400 }}>
              Unlock unparalleled scalability and performance with our high-scalable UI components, designed to meet the demands of your most ambitious
              projects.
            </Text>
          </FadeInEffect>
        </div>
        <Grid.Container gap={2} justify="center">
          <Grid xs={24} md={6}>
            <FadeInEffect width={'100%'} height={'100%'} translateY="4rem" startOpacity={1} blur={10}>
              <HomeCell icon={<PackageIcon />} url="/components" title="100+ React components" desc="Over 100 React components, endless possibilities." />
            </FadeInEffect>
          </Grid>
          <Grid xs={24} md={6}>
            <FadeInEffect width={'100%'} height={'100%'} translateY="4rem" startOpacity={1} blur={10}>
              <HomeCell
                icon={<FeatherIcon />}
                url="/guide/themes"
                title="Fully and easy customizable"
                desc="Your design, your way – our UI library is fully customizable."
              />
            </FadeInEffect>
          </Grid>
          <Grid xs={24} md={6}>
            <FadeInEffect width={'100%'} height={'100%'} translateY="4rem" startOpacity={1} blur={10}>
              <HomeCell
                icon={<GitHubIcon />}
                url="https://github.com/red-ninjas/himalaya-ui/"
                title="Maintained & open sourced"
                desc="Embrace innovation with our fully open-source UI library."
              />
            </FadeInEffect>
          </Grid>
          <Grid xs={24} md={6}>
            <FadeInEffect width={'100%'} height={'100%'} translateY="4rem" startOpacity={1} blur={10}>
              <HomeCell
                icon={<Activity />}
                url="/"
                title="Performance optimized"
                desc="Powerful UI, peak performance – experience excellence with our library"
              />
            </FadeInEffect>
          </Grid>
        </Grid.Container>

        <div className="action-button">
          <FadeInEffect translateY="4rem" width={'auto'} blur={10}>
            <Button type="secondary" auto scale={1.3}>
              Read documentation
            </Button>
          </FadeInEffect>
        </div>

        <style jsx>{`
          .action-button {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            padding: 36px 0px;
          }
          .header {
            max-width: 700px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
            text-align: center;
            margin-bottom: 64px;
          }
        `}</style>
      </FadeInEffect>
    </ContentLayout>
  );
}
