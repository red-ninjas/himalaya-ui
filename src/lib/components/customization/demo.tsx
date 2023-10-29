import React from 'react';
import Colors from './colors';
import { useTheme, Button, Text, Code, Spacer, Link, Select, Grid, useLayout } from 'components';

const Demo: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const layout = useLayout();

  return (
    <div className="demo">
      <div className="content">
        <Text h2 mb={0} font="13px">
          PREVIEWS
        </Text>
        <Text>Here&#39;s a preview of your changes to the Theme. When you set the changes, the entire document site will change with the theme.</Text>

        <Spacer h={1.7} />
        <Text h3 font="13px" type="secondary">
          {'COLORS'}
        </Text>
        <Colors />

        <Spacer h={1.7} />
        <Text h3 font="13px" type="secondary">
          {'Typography'}
        </Text>
        <Text>
          <Link rel="nofollow" href="https://en.wikipedia.org/wiki/HTTP/2" color>
            HTTP/2
          </Link>{' '}
          allows the server to <Code>push</Code> content, that is, to respond with data for more queries than the client requested. This allows the server to
          supply data it knows a web browser will need to render a web page, without waiting for the browser to examine the first response, and without the
          overhead of an additional request cycle.
        </Text>
        <Text h6>Heading</Text>
        <Text h5>Heading</Text>
        <Text h4>Heading</Text>
        <Text h3>Heading</Text>

        <Spacer h={1.7} />
        <Text h3 font="13px" type="secondary">
          {'Basic Components'}
        </Text>
        <Select width="90%" placeholder="Choose one" initialValue="1">
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
        <Spacer h={1} />
        <Grid.Container width="100%">
          <Grid xs={8}>
            <Button disabled auto>
              Action
            </Button>
          </Grid>
          <Grid xs={8}>
            <Button auto>Action</Button>
          </Grid>
          <Grid xs={8}>
            <Button auto type="secondary">
              Action
            </Button>
          </Grid>
        </Grid.Container>
      </div>
      <style jsx>{`
        .demo {
          width: 34%;
          margin-top: calc(${layout.gap} * 2);
          margin-right: ${layout.gap};
          padding-right: ${layout.gapQuarter};
          position: relative;
          border-right: 1px solid ${theme.palette.border};
          height: auto;
          transition: width 200ms ease;
        }

        .content {
          width: 100%;
        }

        @media only screen and (max-width: ${layout.breakpointMobile}) {
          .demo {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Demo;
