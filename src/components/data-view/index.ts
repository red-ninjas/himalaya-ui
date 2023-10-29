import { TimeFormatterFn } from '../use-charts/model/localization-options';
import GraphDataView from './chart-data-view';
import { UIThemes } from '../themes';
import { ThemedChartData } from '../chart';

export interface DataViewPoint {
	label: string;
	property: string;
}

export interface DataViewState {
	data: any[];
	fields: DataViewPoint[];
	isEmpty?: boolean;
}

export interface DataViewProps {
	series: { [name: string]: ThemedChartData };
	theme?: UIThemes;
	timeFormatter?: TimeFormatterFn;
}
export { default as DataView } from './data-view';
export { default as DataViewSkeleton } from './skeleton';
export default GraphDataView;
