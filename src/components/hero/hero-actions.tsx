'use client';

import { PropsWithChildren } from 'react';

const HeroActions: React.FC<PropsWithChildren> = ({ ...props }) => {
	return (
		<div className="actions">
			{props.children}
			<style jsx>{`
				.actions {
					display: inline-flex;
					flex-wrap: wrap;
					gap: 12px;
					align-items: center;
					margin-top: 64px;
					justify-content: center;
				}
			`}</style>
		</div>
	);
};

HeroActions.displayName = 'HimalayaHeroActions';
export default HeroActions;
