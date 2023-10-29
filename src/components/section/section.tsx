'use client';
import React from 'react';
import useScale, { withScale } from '../use-scale';

const SectionComponent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const { SCALES } = useScale();

	return (
		<section className="inner-section">
			{children}
			<style jsx>{`
				.inner-section {
					width: ${SCALES.width(1, '100%')};
					padding: ${SCALES.pt(10)} ${SCALES.pr(0)} ${SCALES.pb(10)} ${SCALES.pl(0)};
					margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
				}
			`}</style>
		</section>
	);
};

SectionComponent.displayName = 'HimalayaSection';
const Section = withScale(SectionComponent);
export default Section;
