import Chart from './chart';
import ChartArea from './chart-area';
import ChartBar from './chart-bar';
import ChartCandle from './chart-candle';
import ChartLegends from './chart-legends';
import ChartLine from './chart-line';

export * from './shared';
export type * from './shared';

export type ThemedChartComponentType = typeof Chart & {
  Line: typeof ChartLine;
  Area: typeof ChartArea;
  Bar: typeof ChartBar;
  Candle: typeof ChartCandle;
  Legends: typeof ChartLegends;
};
(Chart as ThemedChartComponentType).Line = ChartLine;
(Chart as ThemedChartComponentType).Area = ChartArea;
(Chart as ThemedChartComponentType).Bar = ChartBar;
(Chart as ThemedChartComponentType).Candle = ChartCandle;
(Chart as ThemedChartComponentType).Legends = ChartLegends;

export default Chart as ThemedChartComponentType;
