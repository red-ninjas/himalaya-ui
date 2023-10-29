'use client';

import useScale, { withScale } from '../use-scale';
import { PropsWithChildren } from 'react';
import Text from '../text';

const HeroTitle: React.FC<PropsWithChildren> = ({ ...props }) => {
	const { SCALES } = useScale();
	return (
		<Text h1 mt={'24px'} mb={0} font={SCALES.font(5, 'clamp(36px, 8vw, 72px)')} style={{ fontWeight: '800', lineHeight: '1.2', willChange: 'transform' }}>
			{props.children}
		</Text>
	);
};

HeroTitle.displayName = 'HimalayaHeroTitle';
export default withScale(HeroTitle);
