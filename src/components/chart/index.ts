import Chart from './chart';
import ChartArea from './chart-area';
import ChartBar from './chart-bar';
import ChartCandle from './chart-candle';
import ChartDataview from './chart-dataview';
import ChartLegends from './chart-legends';
import ChartLine from './chart-line';
export * from './shared';
export type * from './shared';
export type { ChartProps } from './chart';
export type ThemedChartComponentType = typeof Chart & {
  Line: typeof ChartLine;
  Area: typeof ChartArea;
  Bar: typeof ChartBar;
  Candle: typeof ChartCandle;
  Legends: typeof ChartLegends;
  DataView: typeof ChartDataview;
};
(Chart as ThemedChartComponentType).Line = ChartLine;
(Chart as ThemedChartComponentType).Area = ChartArea;
(Chart as ThemedChartComponentType).Bar = ChartBar;
(Chart as ThemedChartComponentType).Candle = ChartCandle;
(Chart as ThemedChartComponentType).Legends = ChartLegends;
(Chart as ThemedChartComponentType).DataView = ChartDataview;

export default Chart as ThemedChartComponentType;
