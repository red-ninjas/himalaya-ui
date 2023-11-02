import { ThemedChartData } from '../chart';
import { TimeFormatterFn } from '../use-charts/model/localization-options';
import GraphDataView from './chart-data-view';

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
  timeFormatter?: TimeFormatterFn;
  height?: number;
}
export { default as DataView } from './data-view';
export { default as DataViewSkeleton } from './skeleton';
export default GraphDataView;
