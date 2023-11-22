'use client';

import React from 'react';
import { IChartApi } from '../use-charts/api/create-chart';
import { ILegendStatesDictonary, LegendDictonary } from './shared';

export interface ChartConfig {
  chart: IChartApi | undefined;
  legends: ILegendStatesDictonary;
  series: LegendDictonary;
}

const defaultContext = {
  chart: undefined,
  legends: [],
  series: [],
};

export const ChartContext = React.createContext<ChartConfig>(defaultContext);
export const useChart = (): ChartConfig => React.useContext<ChartConfig>(ChartContext);
