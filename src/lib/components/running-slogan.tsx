'use client';
import { FadeInEffect, RunningText, Text } from 'components';

export default function RunningSlogan() {
  return (
    <FadeInEffect blur={10} transition={1000}>
      <RunningText>
        <Text m={0} stroke={1.5} style={{ fontWeight: 800 }} font={'9vw'}>
          High
        </Text>
        <Text m={0} style={{ fontWeight: 800 }} font={'9vw'}>
          Class
        </Text>
        <Text m={0} style={{ fontWeight: 800 }} font={'9vw'}>
          UI
        </Text>
        <Text m={0} stroke={1.5} style={{ fontWeight: 800 }} font={'9vw'}>
          Components
        </Text>
        <Text m={0} style={{ fontWeight: 800 }} font={'9vw'}>
          From
        </Text>
        <Text m={0} stroke={1.5} style={{ fontWeight: 800 }} font={'9vw'}>
          Open
        </Text>
        <Text m={0} stroke={1.5} style={{ fontWeight: 800 }} font={'9vw'}>
          Source
        </Text>
        <Text m={0} style={{ fontWeight: 800 }} font={'9vw'}>
          Community
        </Text>
      </RunningText>
    </FadeInEffect>
  );
}
