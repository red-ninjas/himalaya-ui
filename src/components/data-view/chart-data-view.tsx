'use client';

import Text from '../text';

import React, { useState } from 'react';
import { ChartProps } from '../chart';
import useTheme from '../use-theme';
import Toggle from '../toggle';
import ThemedChart from '../chart';
// import ChartSkeleton from '../chart'
import DataView from './data-view';
// import DataViewSkeleton from './skeleton'

const GraphDataView: React.FC<ChartProps> = props => {
	const theme = useTheme();

	const [isDataView, setIsDataView] = useState<boolean>(false);
	const dataViewHandler = (event: any) => {
		setIsDataView(event.target.checked);
	};

	return (
		<div>
			<div className="dataViewSwitcher">
				<Text style={{ color: theme.palette.accents_5 }} mb={0} font={'14px'} mt={0} mr={0}>
					Data view
				</Text>
				<Toggle onChange={dataViewHandler} />
			</div>

			{isDataView ? <DataView {...props}></DataView> : <ThemedChart {...props}></ThemedChart>}

			<style jsx>{`
				.dataViewSwitcher {
					display: flex;
					align-items: center;
					gap: 8px;
					justify-content: flex-end;
					margin-bottom: 12px;
				}
			`}</style>
		</div>
	);
};

export default GraphDataView;
