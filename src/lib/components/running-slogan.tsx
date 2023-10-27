import { FadeInEffect, RunningText, Text } from 'components';

export default function RunningSlogan() {
  return (
    <FadeInEffect blur={10} transition={1000}>
      <RunningText>
        <Text margin={0} stroke={1.5} style={{ fontWeight: 800 }} font={'9vw'}>
          High
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          Class
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          UI
        </Text>
        <Text margin={0} stroke={1.5} style={{ fontWeight: 800 }} font={'9vw'}>
          Components
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          From
        </Text>
        <Text margin={0} stroke={1.5} style={{ fontWeight: 800 }} font={'9vw'}>
          Open
        </Text>
        <Text margin={0} stroke={1.5} style={{ fontWeight: 800 }} font={'9vw'}>
          Source
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          Community
        </Text>
      </RunningText>
    </FadeInEffect>
  );
}
