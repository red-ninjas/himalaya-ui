'use client';

import useTheme from '../use-theme';
import Text from '../text';
import { PropsWithChildren } from 'react';
import { useScale, withScale } from '../use-scale';

const HeroDesc: React.FC<PropsWithChildren> = ({ ...props }) => {
  const theme = useTheme();
  const { SCALES } = useScale();

  return (
    <Text
      h2
      mt={'24px'}
      mb={0}
      font={SCALES.font(5, 'clamp(16px, 3vw, 20px)')}
      style={{
        fontWeight: '400',
        color: theme.palette.accents_5,
        wordBreak: 'break-word',
      }}
    >
      {props.children}
    </Text>
  );
};

HeroDesc.displayName = 'HimalayaHeroDesc';
export default withScale(HeroDesc);
