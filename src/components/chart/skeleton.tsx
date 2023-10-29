'use client';

import useTheme from '../use-theme';
import React from 'react';

const ChartSkeleton: React.FC<unknown> = () => {
	const theme = useTheme();
	return (
		<div className="skeleton">
			<style jsx>{`
				.skeleton {
					height: 350px;
					width: 100%;
					margin: 0 auto;
					background-color: ${theme.palette.accents_1};
					border-radius: 10px;
				}
			`}</style>
		</div>
	);
};

export default ChartSkeleton;
