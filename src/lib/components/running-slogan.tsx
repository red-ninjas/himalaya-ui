import { FadeInEffect, RunningText, StrokeWord, Text } from 'components'

export default function RunningSlogan() {
  return (
    <FadeInEffect blur={10} transition={1000}>
      <RunningText>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          <StrokeWord stroke={1.5}>High</StrokeWord>
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          Class
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          UI
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          <StrokeWord stroke={1.5}>Components</StrokeWord>
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          From
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          <StrokeWord stroke={1.5}>Open</StrokeWord>
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          <StrokeWord stroke={1.5}>Source</StrokeWord>
        </Text>
        <Text margin={0} style={{ fontWeight: 800 }} font={'9vw'}>
          Community
        </Text>
      </RunningText>
    </FadeInEffect>
  )
}
